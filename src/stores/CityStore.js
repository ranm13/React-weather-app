import { observable, action } from  'mobx'
import axios from 'axios'
import KeyDaya from '../stores/key.json'
import ForeCastsData from '../stores/forecasts.json'


export class CityStore {
    @observable city = {}
    @observable cityNameInput
    @observable isSearching = false
    
    @action handleInput = value => this.cityNameInput = value

    @action handleSavings = () => this.city.isSaved = !this.city.isSaved

    @action searchCity =  () => {
        this.isSearching = true
        axios.get(this.cityKeyUrl(this.cityNameInput))
        .then((response) =>{
            this.city.key = response.data[0].Key
            this.city.name = response.data[0].AdministrativeArea.LocalizedName
            this.city.isSaved = (this.city.isSaved? true : false)
            this.getCityForecasts(this.city.key)  
        })
        .catch((err) =>{
             return err
        } )
        // let data = KeyDaya
        // this.city.key = data[0].Key
        // this.city.name = data[0].LocalizedName
        // this.city.isSaved = (this.city.isSaved? this.city.isSaved: false)
        // this.getCityForecasts(this.cityKey)
    }

    @action loadSave = (cityName) => {
        this.city.isSaved = true
        this.cityNameInput = cityName
        this.searchCity()
    }

    @action getCityByGeoLocation = () => {
        if (navigator.geolocation) { 
            navigator.geolocation.getCurrentPosition(this.searchCityBylocation)
        } 
        else { 
            console.log("Geolocation is not supported by this browser.")
        }
      }
      
    constructor(){
        this.API_KEY = 'uuUVSmGWQ9hWzLPzNCbaaSnNtLr4ykjO'
        this.API_HOST = 'http://dataservice.accuweather.com/'
        this.currentLocation = ""
    }

    searchCityBylocation = position => {
        let currentLocation = `${position.coords.latitude},${position.coords.longitude}`
        axios.get(this.geoLocationCityUrl(currentLocation))
        .then((response) => {
            this.city.key = response.data.Key
            this.city.name = response.data.AdministrativeArea.LocalizedName
            this.city.isSaved = (this.city.isSaved? true : false)
            this.getCityForecasts(this.city.key)  
        })
        .catch((err) =>{
            return err
        } )
    }

    cityKeyUrl = cityName => `${this.API_HOST}locations/v1/cities/autocomplete?apikey=${this.API_KEY}&q=${cityName}`
     
    forecastsUrl = cityKey => `${this.API_HOST}forecasts/v1/daily/5day/${cityKey}?apikey=${this.API_KEY}&metric=true`

    geoLocationCityUrl = (location) => `${this.API_HOST}locations/v1/cities/geoposition/search?apikey=${this.API_KEY}&q=${location}`

    getCityForecasts = (cityKey) => {
        setTimeout(() => this.isSearching = false , 2000) 
        axios.get(this.forecastsUrl(cityKey))
        .then((response) => {
            this.city.forecasts = response.data.DailyForecasts.map(f => {
               return  {date: f.Date,
                        day: f.Day,
                        temperature:  f.Temperature
                        }
                    })})
        .catch((err) =>{
             return err
        })
        }
    //     let data = ForeCastsData
    //     this.city.forecasts = data.DailyForecasts.map(f => {
    //            return  {date: f.Date,
    //                     day: f.Day,
    //                     temperature:  f.Temperature
    //                     }})
    // }
}   


