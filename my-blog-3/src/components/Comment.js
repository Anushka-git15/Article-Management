import React, { Component } from "react";
import CommentVote from "./CommentVote";



class Comment extends Component {

    state = {
        IsEditing: false,
        editedText: this.props.comment.text,
        showDeleteConfirm: false,
    }

    saveComment = async () => {

        const { articleName, comment, setArticleInfo } = this.props;
        const { editedText } = this.state;

        if (editedText.trim() === "") {
            alert("Comment cannot be empty");
            return;
        }
        const result = await fetch(`/api/articles/${articleName}/comments/edit`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                id: comment.id,
                newText: editedText,
            }),
        }
        );

        const body = await result.json();
        setArticleInfo(body);

        this.setState({ IsEditing: false, });
    };

    deleteComment = async () => {

        const { articleName, comment, setArticleInfo } = this.props;

        const result = await fetch(`/api/articles/${articleName}/comments/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: comment.id
            }),
        });
        const body = await result.json();

        setArticleInfo(body)
    };


    render() {
        const { comment, articleName, setArticleInfo } = this.props;
        const { IsEditing, editedText, showDeleteConfirm } = this.state;

        return (


            <div className="comment">

                <div className="comment-header">
                    <div className="avatar">
                        {comment.username.charAt(0).toUpperCase()}
                    </div>

                    <h4>{comment.username}</h4>
                </div>

                {IsEditing ? (
                    <>
                        <p className="edit-label">✏️ Editing Comment</p>

                        <textarea
                            value={editedText}
                            onChange={(e) => this.setState({ editedText: e.target.value })}
                            className="edit-textarea"
                        />

                        <div className="edit-actions">

                            <button
                                className="save-btn"
                                onClick={this.saveComment}
                            >
                                💾 Save
                            </button>

                            <button
                                className="cancel-btn"
                                onClick={() =>
                                    this.setState({
                                        editedText: comment.text,
                                        IsEditing: false,

                                    })

                                }
                            >
                                ❌ Cancel
                            </button>

                        </div>
                    </>
                ) : (
                    <>
                        <p>{comment.text}</p>

                        <div className="comment-footer">

                            <div className="comment-actions">

                                <button
                                    className="edit-btn"
                                    onClick={() =>
                                        this.setState({
                                            showDeleteConfirm: (false),
                                            IsEditing: (true),

                                        })

                                    }
                                >
                                    ✏️ Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => this.setState({ showDeleteConfirm: true })}
                                >
                                    🗑️ Delete
                                </button>

                            </div>

                            <CommentVote
                                comment={comment}
                                articleName={articleName}
                                setArticleInfo={setArticleInfo}
                            />

                        </div>

                        {showDeleteConfirm && (
                            <div className="delete-confirm">

                                <p>⚠️ Delete this comment?</p>

                                <div className="delete-confirm-actions">

                                    <button
                                        className="cancel-btn"
                                        onClick={() => this.setState({ showDeleteConfirm: false })}
                                    >
                                        ❌ Cancel
                                    </button>

                                    <button
                                        className="confirm-delete-btn"
                                        onClick={this.deleteComment}
                                    >
                                        🗑️ Delete
                                    </button>

                                </div>

                            </div>
                        )}

                    </>
                )}

            </div>
        );
    }
}

export default Comment;