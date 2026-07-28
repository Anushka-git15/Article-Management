
import './App.css';
import HomePage from './pages/HomePage';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import React, { Component } from 'react';
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import NavBar from './components/NavBar';
import Article from './pages/Article';
import Footer from './components/Footer';
import ArticlePageWrapper from './pages/ArticlePage';




class App extends Component{
  render(){
    return (
      <Router>
      
       <div id="page-body">
       <div className='App'>
        <NavBar/>
        
          <Routes>
            <Route path="/" Component={HomePage}exact/>
            <Route path="/about" Component={AboutPage}/>
            <Route path="/article-list" Component={Article}/>
            <Route path="/articles/:name" Component={ArticlePageWrapper}/>
          </Routes>
          <Footer/>
        </div>
        </div>
     </Router>

    )

  }

}
export default App;


// here we have to call HomePage component
