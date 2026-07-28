import React,{Component} from "react";
import "./CommentsList.css";
import Comment from "./Comment";

class CommentsList extends Component {
    render() {

        const { comments, articleName, setArticleInfo } = this.props;
        return (
            <div className="comments-section">

                <h3>Comments : ({comments.length})</h3>
                {comments.map((comment, key) => {
                   
                    return (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            articleName={articleName}
                            setArticleInfo={setArticleInfo}
                        />

                    )

                })}

            </div>
        );
    }
}


export default CommentsList;