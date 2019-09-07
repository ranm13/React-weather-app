import React, {Component} from 'react'
import { Grid, Typography, IconButton  } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

@inject("cityStore", "favoritesStore")

@observer
class TodayWeather extends Component {
    getImageSrc = (iconNum) => {
        if(iconNum < 10){
            iconNum = '0' + iconNum
        }
        return `https://developer.accuweather.com/sites/default/files/${iconNum}-s.png`
    }

    handleSavings = () => {
        let cityStore = this.props.cityStore
        let favoritesStore = this.props.favoritesStore
        cityStore.handleSavings()
        if(cityStore.city.isSaved){
            favoritesStore.pushToFavorites(cityStore.city.key, cityStore.city.name)
        }
        else{
            favoritesStore.removeFromFavorites(cityStore.city.key)
        }
    }

    render() {
        let cityStore = this.props.cityStore
        let forecasts = cityStore.city.forecasts
        let temp = forecasts[0].temperature
        return (
            <Grid container alignItems='center'>
                <Grid item md={1}>
                    {forecasts[0].day.Icon?<img src={this.getImageSrc(forecasts[0].day.Icon)} alt="weather icon"/>: null}
                </Grid>  
                <Grid item md={10} xs={6}>
                    <Typography variant="h6">
                        {cityStore.city.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {`${temp.Maximum.Value}°${temp.Maximum.Unit}`}
                    </Typography>
                </Grid>  
                <Grid item >
                    <IconButton color="secondary" onClick={this.handleSavings}>
                        {cityStore.city.isSaved? 
                        <FavoriteIcon fontSize='large' />
                        : <FavoriteBorderIcon fontSize='large' />}
                    </IconButton>
                </Grid>
                <Grid container justify="center" alignItems="center" >
                    <Typography variant="h2" gutterBottom>
                        {forecasts[0].day.IconPhrase}
                    </Typography>
                </Grid>
            </Grid>)
    }
}
export default TodayWeather