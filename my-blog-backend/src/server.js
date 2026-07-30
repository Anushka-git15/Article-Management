
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const app = express();
app.use(cors());
app.use(express.json());

const withDB = async (operation, res) => {
    try {
        const client = await MongoClient.connect('mongodb+srv://Anuska:1234@cluster0.otvd34c.mongodb.net/?appName=Cluster0');

        const db = client.db('my-blog');

        await operation(db);

        client.close();

    } catch (error) {
        res.status(500).json({ message: `Error: Connecting to DB`, error });

    }

}

// localhost:8000/api/articles/mastering-react
app.get('/api/articles/:name', async (req, res) => {
    const articleName = req.params.name;
    withDB(async (db) => {

        const articlesInfo = await db.collection('articles').findOne({ name: articleName });
        res.status(200).json(articlesInfo);

    }, res);
});

// Upvote Endpoint
app.post('/api/articles/:name/upvote', async (req, res) => {
    const articleName = req.params.name;

    withDB(async (db) => {
        // $inc dynamic upvote badhayega, fetch karne ki zaroorat nahi
        await db.collection('articles').updateOne(
            { name: articleName },
            { $inc: { upvotes: 1 } }
        );

        // Updated document fetch karke response bhej do
        const updatedArticlesInfo = await db.collection('articles').findOne({ name: articleName });

        if (!updatedArticlesInfo) {
            return res.status(404).json({ message: "Article not found" });
        }

        res.status(200).json(updatedArticlesInfo);
    }, res);
});

// Downvote Endpoint
app.post("/api/articles/:name/downvote", async (req, res) => {
    const articleName = req.params.name;

    withDB(async (db) => {
        await db.collection('articles').updateOne(
            { name: articleName },
            { $inc: { downvotes: 1 } }
        );

        const updatedArticlesInfo = await db.collection('articles').findOne({ name: articleName });

        if (!updatedArticlesInfo) {
            return res.status(404).json({ message: "Article not found" });
        }

        res.status(200).json(updatedArticlesInfo);
    }, res);
});




// add-comment end-point
app.post('/api/articles/:name/add-comment', (req, res) => {
    const { username, text } = req.body;
    const articleName = req.params.name;

    withDB(async (db) => {

        const articlesInfo = await db.collection('articles').findOne({ name: articleName });

        await db.collection('articles').updateOne(
            { name: articleName },
            {
                '$set': {
                    comments: articlesInfo.comments.concat({ id: Date.now().toString(), username, text, "upvote": 0, "downvote": 0 }),
                },
            });

        const updatedArticlesInfo = await db.collection('articles').findOne({ name: articleName });

        res.status(200).json(updatedArticlesInfo);
    }, res);
});


// comment upvote end point
app.post("/api/articles/:name/comments/upvote", async (req, res) => {

    withDB(async (db) => {
        const articleName = req.params.name;
        const name = req.body.username;
        const msg = req.body.text;
        const id = req.body.id;

        const articlesInfo = await db.collection('articles').findOne({ name: articleName });



        const result = await db.collection('articles').updateOne(
            { name: articleName },
            { $inc: { "comments.$[elem].upvote": 1 } },
            { arrayFilters: [{ "elem.id": id }] }
        );

        console.log("Update result:", result);

        const updatedArticlesInfo = await db.collection('articles').findOne({ name: articleName });

        res.status(200).json(updatedArticlesInfo);
    }, res);
});

// comment downvote end point
app.post("/api/articles/:name/comments/downvote", async (req, res) => {
    withDB(async (db) => {
        const articleName = req.params.name;
        const id = req.body.id;
        const name = req.body.username;
        const msg = req.body.text;


        const articlesInfo = await db.collection('articles').findOne({ name: articleName });


        const result = await db.collection('articles').updateOne(
            { name: articleName },
            { $inc: { "comments.$[elem].downvote": 1 } },
            {
                arrayFilters:
                    [{ "elem.id": id }]
            }
        );

        console.log("Update result:", result);

        const updatedArticlesInfo = await db.collection('articles').findOne({ name: articleName });

        res.status(200).json(updatedArticlesInfo);
    }, res);
});

// comment edit end point 
app.post('/api/articles/:name/comments/edit', async (req, res) => {
    withDB(async (db) => {
        const articleName = req.params.name;
        const id = req.body.id;
        const username = req.body.username
        const oldText = req.body.oldText;
        const newText = req.body.newText;

        await db.collection('articles').updateOne(
            { name: articleName },
            {
                '$set': {
                    "comments.$[elem].text": newText
                }
            },
            {
                arrayFilters: [
                    {
                        'elem.id': id
                    }
                ]
            }
        );

        const updatedArticlesInfo = await db.collection('articles').findOne({ name: articleName });

        res.status(200).json(updatedArticlesInfo)

    }, res)
});


// comment delete end point

app.post('/api/articles/:name/comments/delete', async (req, res) => {
    withDB(async (db) => {
        const articleName = req.params.name;
        const id = req.body.id;
        const username = req.body.username;
        const text = req.body.text;

        await db.collection('articles').updateOne(
            {
                name: articleName
            },
            {
                '$pull': {
                    comments: {
                        id: id
                    },
                },
            }
        );

        const updatedArticlesInfo = await db.collection('articles').findOne({ name: articleName });

        res.status(200).json(updatedArticlesInfo);
    }, res);

});

app.listen(8000, () => console.log('Server is listening on port 8000'));
