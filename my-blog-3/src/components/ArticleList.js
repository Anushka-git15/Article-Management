import React, { Component } from "react";
import { Link } from "react-router-dom";
import articles from "../pages/article-content";
import "./ArticleList.css"


class ArticleList extends Component {
    render() {
        const { articless } = this.props;
        return (
            <div className="article-list">
                <h2>More Articles</h2>
                <div className="article-grid">
                    {articless.map((article, key) => (
                        <Link
                            to={`/articles/${article.name}`}
                            key={key}
                            className="article-card"
                        >
                            <span className={`badge ${article.category.toLowerCase()}`}>
                                {article.category}
                            </span>
                            <div className="card-content">
                                <h3>{article.title}</h3>
                                <p>
                                    {article.content[0].substring(0, 100)}....
                                </p>
                                <span className="read-more">
                                    Read Article →

                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
}

export default ArticleList;
