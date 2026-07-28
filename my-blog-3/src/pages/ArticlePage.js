// importing React
import React, { Component } from 'react';
import articleContent from '../pages/article-content';
import ArticleList from '../components/ArticleList';
import { useParams } from 'react-router-dom';
import CommentsList from '../components/CommentsList';
import ReactionSection from '../components/ReactionSection';
import AddCommentForm from '../components/AddCommentForm';
import "./ArticlePage.css";


class ArticlePage extends Component {
state = {
    articleInfo:{
        upvotes: 0, 
        downvotes: 0, 
        comments: [],

    },

};

componentDidMount(){
    this.fetchData();
}

componentDidUpdate(prevProps) {
    if (prevProps.params.name !== this.props.params.name) {
        this.fetchData();
    }
}
    fetchData = async () => {
const {name} = this.props.params;

        const result = await fetch(`/api/articles/${name}`);
        const body = await result.json();
        this.setState({
            articleInfo:body,
        });
    };

    setArticleInfo = (body)=>{
        this.setState({
            articleInfo:body,
        });
    };

    render() {
        const { name } = this.props.params;
        const { articleInfo } = this.state;

        const article = articleContent.find(
            (article) => article.name === name
        );
        if (!article) {
            return <h1>Article does not exist</h1>;
        }

        const otherArticles = articleContent.filter(
            (article) => article.name !== name
        );

        return (
            <>
                <div className='article-page'>

                    <article className='article-container'>
                        <h1> {article.title} </h1>
                        <span className='article-category'>
                            🚀{article.category}
                        </span>
                        <ReactionSection
                            articleName={name}
                            upvotes={articleInfo.upvotes}
                            downvotes={articleInfo.downvotes}
                            setArticleInfo={this.setArticleInfo}
                        />
                        <div className='article-content'>
                            {article.content.map((paragraph, key) => (
                                <p key={key}>{paragraph}</p>
                            ))}
                        </div>
                    </article>
                    <section className='comments-section'>
                        <CommentsList
                            comments={articleInfo.comments}
                            articleName={name}
                            setArticleInfo={this.setArticleInfo}
                        />
                        <AddCommentForm
                            articleName={name}
                            setArticleInfo={this.setArticleInfo}
                        />
                    </section>
                    <ArticleList articless={otherArticles} />

                </div>

            </>

        )


    }
}

function ArticlePageWrapper(){

    const params = useParams();

    return <ArticlePage params = {params}/>
}
export default ArticlePageWrapper;
