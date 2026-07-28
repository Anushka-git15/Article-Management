import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './NavBar.css';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar">
                <div className="logo">
                    <Link to="/">📝 BlogSphere </Link>
                </div>
                <ul className="nav-menu">
                    <li>
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="nav-link">About</Link>
                    </li>
                    <li>
                        <Link to="/article-list" className="nav-link">Articles</Link>
                    </li>


                </ul>

            </nav>
        )

    }
}


export default NavBar;