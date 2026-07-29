import React, { Component } from "react";
import "./CommentsList.css";
import Comment from "./Comment";

class CommentsList extends Component {
    render() {
        const { comments = [], articleName, setArticleInfo } = this.props;

        return (
            <div className="comments-section">
                <h3>Comments : ({comments ? comments.length : 0})</h3>
                {comments && comments.map((comment) => (
                    <Comment
                        key={comment.id || Math.random()}
                        comment={comment}
                        articleName={articleName}
                        setArticleInfo={setArticleInfo}
                    />
                ))}
            </div>
        );
    }
}

export default CommentsList;
