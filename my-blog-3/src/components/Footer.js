import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";


class Footer extends Component {
    render() {
        return (
            <footer className="footer">

                <div className="footer-content">

                    <h2>📝 BlogSphere</h2>

                    <p>
                        Sharing knowledge, one article at a time.
                    </p>

                    <div className="footer-links">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/article-list">Articles</Link>
                    </div>

                    <hr />

                    <p className="copyright">
                        © 2026 BlogSphere • Built with ❤️ using React, Node.js MongoDB
                    </p>

                </div>

            </footer>
        );
    }
}


export default Footer;