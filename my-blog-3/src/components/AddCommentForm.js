import React, { Component } from "react";
import { useState } from "react";
import "./AddCommentForm.css";
import $ from "jquery";

class AddCommentForm extends Component {
    state = {
        username: (""),
        comment: (""),

    }

    addcomment = async (event) => {

        const { articleName, setArticleInfo } = this.props;
        const { comment, username } = this.state;

        event.preventDefault();

        $("#userNameError").text("");
        $("#commentError").text("");


        if (username.trim() === "") {
            $("#userNameError").text("Please Enter Your Name");
            return;
        }

        if (comment.trim() === "") {
            $("#commentError").text("Please Enter Your Comment");
            return;
        }

        const result = await fetch(`/api/articles/${articleName}/add-comment`, {
            method: 'post',
            body: JSON.stringify({ username, text: comment }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const body = await result.json();
        setArticleInfo(body);

        this.setState({
            username: "",
            comment: ""
        });

        $("#successMessage").text("");

        $("#successMessage").text("🎉 Comment added successfully");
        setTimeout(() => {
            $("#successMessage").text("");
        }, 3000);
    };

    render() {
        const { articleName, setArticleInfo } = this.props;
        const { username, comment } = this.state;

        return (
            <form id="commentForm" onSubmit={this.addcomment}>
                <div id='add-comment-form'>
                    <h3>Post Your Comment..!</h3>
                    <label htmlFor="userName">
                        Name :
                        <input id="userName" type="text" name="username" value={username} onChange={(event) => this.setState({ username: event.target.value })} />
                        <span id="userNameError" className="error"></span>
                    </label>
                    <label htmlFor="comment">
                        Comment :
                        <textarea id="comment" name="comment" rows="4" cols="30" value={comment} onChange={(event) => this.setState({ comment: event.target.value })}></textarea>
                        <span id="commentError" className="error"></span>
                    </label>
                    <button type="submit">💬 Post Comment</button>
                    <span id="successMessage" className="success"></span>
                </div>
            </form>
        );
    }
}

export default AddCommentForm;