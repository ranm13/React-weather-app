import React, {Component} from 'react'
import { Card, Grid, Typography } from '@material-ui/core'
import moment from 'moment'

class DailyWeather extends Component {
    
    getDay = (date) => {
        const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        return dayNames[moment(date).day()]
    }
    
    render() {
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
                                {temp.Maximum.Value}°{temp.Maximum.Unit}
                            </Typography>
                        </Grid>
                    </Grid>
                </Card> 
            </Grid>
        )
    }
}
export default DailyWeather