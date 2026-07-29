import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

class HomePage extends Component {
    render() {
        return (
            <div className='home-page'>
                <h1>👋 Welcome to BlogSphere</h1>
                <p>
                    Welcome to BlogSphere, your go-to destination for learning modern web development. Whether you're just starting your coding journey or looking to sharpen your skills, you'll find easy-to-understand articles on React, Node.js, JavaScript, MongoDB, and full-stack development. Our goal is to simplify complex concepts and help you become a confident developer through practical knowledge and real-world examples.
                </p>

                <Link to="/articles">
                    <button className='hero-btn'>
                        🚀 Explore Articles
                    </button>
                </Link>

                <div className='home-highlight'>
                    <h2>Why BlogSphere?</h2>

                    <div className='feature-grid'>
                        <div className='feature-card'>
                            <span>⚛️</span>
                            <h3>React</h3>
                            <p>Learn modern frontend development with practical examples.</p>
                        </div>
                        <div className='feature-card'>
                            <span>🟢</span>
                            <h3>Node.js</h3>
                            <p>Build fast and scalable backend applications.</p>
                        </div>
                        <div className='feature-card'>
                            <span>💼</span>
                            <h3>Career</h3>
                            <p>Get career guidance and become a better developer.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;
