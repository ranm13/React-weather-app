import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import  Grid  from '@material-ui/core/Grid';
import  Switch  from '@material-ui/core/Switch';
import  Typography  from '@material-ui/core/Typography';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import WbSunnyTwoToneIcon from '@material-ui/icons/WbSunnyTwoTone';

@inject("navStore")

@observer
class NavBar extends Component {
  render(){
    let navStore = this.props.navStore
    return (
      <AppBar position="static" color="default" style={{marginBottom: "15px"}}>
        <Toolbar variant="dense" >
          <Grid container justify="space-between">
            <Grid item >
              <Grid container spacing={1}>
                <Grid item>
                  <WbSunnyTwoToneIcon />
                  <Switch value={navStore.isLightTheme} onChange={navStore.toggleTheme} color="default" />
                  <Brightness2Icon />
                </Grid>
                <Grid item >
                  <Grid container direction="row" > 
                    <Typography variant="h6"> °C  </Typography>
                    <Switch value={navStore.isCelsius} onChange={navStore.toggleTempSign} color="default"/>
                    <Typography variant="h6"> °F  </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button  to='/' component={Link}>Home</Button>
              <Button to='/favorites' component={Link}>Favorites</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}

export default NavBar