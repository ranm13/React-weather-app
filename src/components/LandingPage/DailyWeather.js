import React, {Component} from 'react'
import { observer, inject } from 'mobx-react'
import moment from 'moment'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

@inject( "navStore")

@observer

class DailyWeather extends Component {
    getDay = (date) => {
        const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        return dayNames[moment(date).day()]
    }

    celsiusToFahrenheitConventer = (temp) => Math.round(temp * 1.8 + 32) 

    render() {
        let navStore = this.props.navStore
        let temp = this.props.temp
        let date = this.props.date
        return (
            <Grid item>
                <Card >
                    <Grid container direction="column" justify="center" alignItems="center" style={{height: '14vw', width: '15vh'}}>
                        <Grid item>
                            <Typography variant="h6">
                                {this.getDay(date)}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">
                                {navStore.isCelsius? `${temp.Maximum.Value}°${temp.Maximum.Unit}`: this.celsiusToFahrenheitConventer(temp.Maximum.Value) + '°F' }
                            </Typography>
                        </Grid>
                    </Grid>
                </Card> 
            </Grid>
        )
    }
}
export default DailyWeather