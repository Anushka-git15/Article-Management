import React ,{Component}from "react";
import {FaThumbsUp,FaThumbsDown} from "react-icons/fa";
import './ReactionSection.css';

class ReactionSection extends Component {

    UpvoteArticle = async () => {
        const { articleName, setArticleInfo } = this.props;
        const result = await fetch(`/api/articles/${articleName}/upvote`, {
            method: 'post',
        });

        const body = await result.json();

        setArticleInfo(body);

    }

    DownvoteArticle = async () => {
        const { articleName, setArticleInfo } = this.props;
        const result = await fetch(`/api/articles/${articleName}/downvote`, {
            method: 'post',
        });

        const body = await result.json();

        setArticleInfo(body);
    }

    render() {

        const { upvotes, downvotes } = this.props;



        return (
            <div className="vote-section">
                <div className="reaction-heading">
                    <h4>✨ Did You Enjoy this article ?</h4>
                </div>
                <button
                    className="vote-btn like-btn"
                    onClick={this.UpvoteArticle}
                >
                    <FaThumbsUp />
                    <span>{upvotes}</span>
                </button>

                <button
                    className="vote-btn dislike-btn"
                    onClick={this.DownvoteArticle}
                >
                    <FaThumbsDown />
                    <span>{downvotes}</span>
                </button>

            </div>
        );


    }


};

export default ReactionSection;
