import React, {Component} from 'react'
import { Paper, Grid  } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import DailyWeather from './DailyWeather';
import TodayWeather from './TodayWeather';

@inject("cityStore")

@observer
class CityWeather extends Component {

    componentDidMount(){
        // this.props.cityStore.getCityByGeoLocation()
        this.props.cityStore.handleInput('tel aviv')
        this.props.cityStore.searchCity()
    }

    render() {
        let cityStore = this.props.cityStore
        let forecasts = cityStore.city.forecasts
        return (
            <Paper className="container" style={{marginTop :"4vh",  height: "70vh"}}>
                {forecasts? <TodayWeather />: null}
                {forecasts? <Grid container justify="center" spacing={6}>
                    {forecasts.map(value => (<DailyWeather key={value.date} date={value.date} temp={value.temperature} /> ))}
                </Grid>: null}
            </Paper>
        )
    }
}

export default CityWeather