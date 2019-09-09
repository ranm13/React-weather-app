import React, {Component} from 'react'
import { observer, inject } from 'mobx-react'
import  Paper from '@material-ui/core/Paper'
import  Grid from '@material-ui/core/Grid'
import DailyWeather from './DailyWeather';
import TodayWeather from './TodayWeather';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

@inject("cityStore", "navStore")

@observer
class CityWeather extends Component {

    componentDidMount(){
        // this.props.cityStore.getCityByGeoLocation()
        // this.props.cityStore.handleInput('tel aviv')
        // this.props.cityStore.searchCity()
    }

    render() {
        let cityStore = this.props.cityStore
        let forecasts = cityStore.city.forecasts
        let backgroundColor = this.props.navStore.theme.palette.type === "light" ? 'rgba(255, 255, 255, 0.7)': 'rgba(0, 0, 0, 0.7)'
        console.log(backgroundColor)
        return (
            <Paper className="container" style={{marginTop :"4vh",  height: "70vh", backgroundColor:{backgroundColor}}}>
                {/* <div>hey</div> */}
                {cityStore.isSearching? 
                    <Loader type="CradleLoader" height="100" width="100" style={{position:"absolute", top:"50vh", left:' calc(50vw - 56px)'}}/>
                :forecasts?
                        <div>
                            <TodayWeather />
                            <Grid container justify="center" spacing={6}>
                            {forecasts.map(value => (<DailyWeather key={value.date} date={value.date} temp={value.temperature} /> ))}
                            </Grid>
                        </div>
                    :null}
            </Paper>
        )
    }
}

export default CityWeather
