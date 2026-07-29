import React, { Component } from 'react';
import articleContent from '../pages/article-content';
import ArticleList from '../components/ArticleList';
import { useParams } from 'react-router-dom';
import CommentsList from '../components/CommentsList';
import ReactionSection from '../components/ReactionSection';
import AddCommentForm from '../components/AddCommentForm';
import { API_BASE_URL } from '../config';
import "./ArticlePage.css";

class ArticlePage extends Component {
    state = {
        articleInfo: {
            upvotes: 0, 
            downvotes: 0, 
            comments: [],
        },
        loading: true,
        error: false
    };

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.params.name !== this.props.params.name) {
            this.fetchData();
        }
    }

    fetchData = async () => {
        const { name } = this.props.params;
        try {
            const result = await fetch(`${API_BASE_URL}/api/articles/${name}`);
            if (!result.ok) {
                throw new Error(`Server status: ${result.status}`);
            }
            const body = await result.json();
            
            this.setState({
                articleInfo: {
                    upvotes: body.upvotes || 0,
                    downvotes: body.downvotes || 0,
                    comments: body.comments || []
                },
                loading: false,
                error: false
            });
        } catch (err) {
            console.error("Fetch error:", err);
            this.setState({ 
                loading: false, 
                error: true,
                articleInfo: { upvotes: 0, downvotes: 0, comments: [] }
            });
        }
    };

    setArticleInfo = (body) => {
        if (body) {
            this.setState({
                articleInfo: {
                    upvotes: body.upvotes || 0,
                    downvotes: body.downvotes || 0,
                    comments: body.comments || []
                }
            });
        }
    };

    render() {
        const { name } = this.props.params;
        const { articleInfo } = this.state;

        const article = articleContent.find(
            (article) => article.name === name
        );
        
        if (!article) {
            return <div className="article-page"><h1>Article does not exist</h1></div>;
        }

        const otherArticles = articleContent.filter(
            (article) => article.name !== name
        );

        return (
            <div className='article-page'>
                <article className='article-container'>
                    <h1>{article.title}</h1>
                    <span className='article-category'>
                        🚀 {article.category}
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
        );
    }
}

function ArticlePageWrapper() {
    const params = useParams();
    return <ArticlePage params={params} />;
}

export default ArticlePageWrapper;
