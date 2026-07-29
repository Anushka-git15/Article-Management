import React, { Component } from "react";
import "./CommentVote.css";
import { API_BASE_URL } from "../config"; // Backend API URL

class CommentVote extends Component {
    upvoteComment = async () => {
        const { articleName, comment, setArticleInfo } = this.props;

        try {
            const result = await fetch(`${API_BASE_URL}/api/articles/${articleName}/comments/upvote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: comment.id }),
            });

            const body = await result.json();
            setArticleInfo(body);
        } catch (err) {
            console.error("Upvote error:", err);
        }
    };

    downvoteComment = async () => {
        const { articleName, comment, setArticleInfo } = this.props;

        try {
            const result = await fetch(`${API_BASE_URL}/api/articles/${articleName}/comments/downvote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: comment.id }),
            });

            const body = await result.json();
            setArticleInfo(body);
        } catch (err) {
            console.error("Downvote error:", err);
        }
    };

    render() {
        const { comment } = this.props;

        return (
            <div className="comment-vote">
                <button
                    className="vote-btn like-btn"
                    onClick={this.upvoteComment}
                >
                    👍 <span>{comment.upvote || 0}</span>
                </button>

                <button
                    className="vote-btn dislike-btn"
                    onClick={this.downvoteComment}
                >
                    👎 <span>{comment.downvote || 0}</span>
                </button>
            </div>
        );
    }
}

export default CommentVote;
