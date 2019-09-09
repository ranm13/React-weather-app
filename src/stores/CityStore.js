import { observable, action } from  'mobx'
import axios from 'axios'

export class CityStore {
    @observable city = {}
    @observable cityNameInput
    @observable isSearching = false
    @observable isFirstEntrance = true
    
    @action handleInput = value => this.cityNameInput = value

    @action handleSavings = () => this.city.isSaved = !this.city.isSaved

    @action searchCity = async () => {
        this.isSearching = true
        try{
            const response = await axios.get(this.cityKeyUrl(this.cityNameInput))
            this.city.key = response.data[0].Key
            this.city.name = response.data[0].AdministrativeArea.LocalizedName
            this.city.isSaved = (this.city.isSaved? true : false)
            this.getCityForecasts(this.city.key)  
        }
        catch(error){
            setTimeout(() => this.isSearching = false , 2000) 
            return error
        }
    }

    @action loadSave = (cityKey, cityName ) => {
        this.city = {
            isSaved: true,
            name: cityName,
            key: cityKey
        }
        this.getCityForecasts(cityKey)
    }

    @action getCityByGeoLocation = () => {
        this.isFirstEntrance = false
        if (navigator.geolocation) { 
            navigator.geolocation.getCurrentPosition(this.searchCityBylocation)
        } 
        else { 
            this.getCityForecasts("215854") //if it could not get geolocation it gets tel aviv
        }
      }
      
    constructor(){
        this.API_KEY = 'uuUVSmGWQ9hWzLPzNCbaaSnNtLr4ykjO'
        this.API_HOST = 'http://dataservice.accuweather.com/'
        this.currentLocation = ""
    }

    searchCityBylocation = async (position) => {
        let currentLocation = `${position.coords.latitude},${position.coords.longitude}`
        try{
            let response = await  axios.get(this.geoLocationCityUrl(currentLocation))
            this.city.key = response.data.Key
            this.city.name = response.data.AdministrativeArea.LocalizedName
            this.city.isSaved = (this.city.isSaved? true : false)
            this.getCityForecasts(this.city.key) 
        }
        catch(error){
            return error
        }
    }

    cityKeyUrl = cityName => `${this.API_HOST}locations/v1/cities/autocomplete?apikey=${this.API_KEY}&q=${cityName}`
     
    forecastsUrl = cityKey => `${this.API_HOST}forecasts/v1/daily/5day/${cityKey}?apikey=${this.API_KEY}&metric=true`

    geoLocationCityUrl = (location) => `${this.API_HOST}locations/v1/cities/geoposition/search?apikey=${this.API_KEY}&q=${location}`

    getCityForecasts = async (cityKey) => {
        setTimeout(() => this.isSearching = false , 2000) 
        try{
            let response = await axios.get(this.forecastsUrl(cityKey))
            this.city.forecasts = response.data.DailyForecasts.map(f => {
                return  {date: f.Date,
                         day: f.Day,
                         temperature:  f.Temperature
                         }
                     })
        }
        catch(error){
            return error
        }  
     }
}   


