import React, { Component } from "react";
import "./CommentVote.css";

class CommentVote extends Component {

    upvoteComment = async () => {
        const { articleName, comment, setArticleInfo } = this.props;

        const result = await fetch(`/api/articles/${articleName}/comments/upvote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: comment.id,
            }),
        });

        const body = await result.json();
        setArticleInfo(body);
    };

    downvoteComment = async () => {
        const { articleName, comment, setArticleInfo } = this.props;

        const result = await fetch(`/api/articles/${articleName}/comments/downvote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: comment.id,
            }),
        });

        const body = await result.json();
        setArticleInfo(body);
    };

    render() {
        const { comment } = this.props;

        return (
            <div className="comment-vote">
                <button
                    className="vote-btn like-btn"
                    onClick={this.upvoteComment}
                >
                    👍 <span>{comment.upvote}</span>
                </button>

                <button
                    className="vote-btn dislike-btn"
                    onClick={this.downvoteComment}
                >
                    👎 <span>{comment.downvote}</span>
                </button>
            </div>
        );
    }
}


export default CommentVote;