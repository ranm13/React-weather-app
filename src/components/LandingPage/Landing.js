import React, {Component} from 'react'
import Grid  from '@material-ui/core/Grid'
import SearchBar from './SearchBar'
import CityWeather from './CityWeather'

class Landing extends Component {
    render() {
        return (
        <div className="landing-page" >
            <Grid container justify="center" >
                <Grid item xs={8} md={4} >
                    <SearchBar />
                </Grid>
            </Grid>
            <Grid container justify="center" >
                <Grid item xs={8} md={8} >
                    <CityWeather />
                </Grid>
            </Grid>   
        </div>
        )
    }
}
export default Landing