import React, { Component } from "react";
import { Link } from "react-router-dom";
import articles from "./article-content";
import './Article.css';

class Article extends Component {
    render() {
        return (
            <div className="article-container">
                <h1 className="page-title">All Articles</h1>

                <div className="article-list">
                    {articles.map((article, key) => (
                        <Link
                            className="article-list-item"
                            key={key}
                            to={`/articles/${article.name}`}
                        >
                            <h2>{article.title}</h2>
                            <p>{article.content[0].substring(0, 100)}...</p>
                            <span className="read-more">
                                Read More →
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
}

export default Article;
