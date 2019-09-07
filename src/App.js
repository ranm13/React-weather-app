import React, { Component } from 'react'
import './App.css'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './components/LandingPage/Landing';
import Favorites from './components/FavoritesPage/Favorites';
import NavBar from './components/NavBar';

@observer
class App extends Component{
  render(){
    return (
      <Router>
        <div className="App" >
          <NavBar />
          <Route exact path="/" component={Landing}/>
          <Route exact path="/favorites" component={Favorites} />
        </div>
      </Router>
    );
  }

}

export default App;