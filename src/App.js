import React, { Component } from 'react'
import './App.css'
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './components/LandingPage/Landing';
import Favorites from './components/FavoritesPage/Favorites';
import NavBar from './components/NavBar';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

@inject("navStore")

@observer
class App extends Component{
  render(){
    let muiTheme = createMuiTheme(this.props.navStore.theme)
    return (
      <Router>
        <MuiThemeProvider theme={muiTheme} >
          <div className="App" >
            <NavBar />
            <Route exact path="/" component={Landing}/>
            <Route exact path="/favorites" component={Favorites} />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }

}

export default App;