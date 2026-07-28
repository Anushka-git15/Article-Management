import React, { Component } from "react";
import "./AboutPage.css";

class AboutPage extends Component {
  render() {
    return (
      <div className="about-page">

        <section className="about-hero">

          <h1>About BlogSphere</h1>

          <p>
            BlogSphere is a modern MERN Stack blog platform created for students,
            beginners, and developers who want to learn web development through
            simple, practical, and easy-to-understand articles.
          </p>

        </section>

        <section className="about-card">

          <h2>🎯 Our Mission</h2>

          <p>
            Our mission is to make learning programming easier by providing
            high-quality articles on React, Node.js, JavaScript, MongoDB, and
            career guidance. We believe that learning should be simple,
            interactive, and accessible for everyone.
          </p>

        </section>

        <section className="feature-grid">

          <div className="feature-card">
            <span>⚛️</span>
            <h3>Frontend</h3>
            <p>Learn React, JavaScript, HTML, CSS and modern UI development.</p>
          </div>

          <div className="feature-card">
            <span>🟢</span>
            <h3>Backend</h3>
            <p>Understand Node.js, Express.js, APIs and MongoDB.</p>
          </div>

          <div className="feature-card">
            <span>🚀</span>
            <h3>Career Growth</h3>
            <p>Get useful tips, resources and guidance for your developer journey.</p>
          </div>

        </section>

      </div>
    );
  }
}



export default AboutPage;