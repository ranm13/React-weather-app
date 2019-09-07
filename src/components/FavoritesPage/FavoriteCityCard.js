import React, {Component} from 'react'
import { Card, Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

@inject("cityStore")

@observer
class FavoriteCityCard extends Component {
    getImageSrc = (iconNum) => {
        if(iconNum < 10){
            iconNum = '0' + iconNum
        }
        return `https://developer.accuweather.com/sites/default/files/${iconNum}-s.png`
    }

    searchThisCity = () => {
        this.props.cityStore.loadSave(this.props.cityData.name)
    }

    render() {
        let cityData = this.props.cityData
        let tempData = cityData.currentConditions.temperature.Metric
        return (
            <Grid item to='/' component={Link} onClick={this.searchThisCity} style={{textDecoration: 'none'}}>
                <Card>
                    <Grid container direction="column" justify="center" alignItems="center" style={{ width: '20vh' }}>
                        <Grid item>
                            <Typography variant="h6" >
                                {cityData.name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">
                                {tempData.Value}°{tempData.Unit}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <img src={this.getImageSrc(cityData.currentConditions.icon)} alt="weather icon" style={{margin: '1vw'}}/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">
                                {cityData.currentConditions.weatherText}
                            </Typography>
                        </Grid>
                    </Grid>
                </Card> 
            </Grid>)
    }
}
export default FavoriteCityCard