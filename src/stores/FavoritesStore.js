import { observable, action } from  'mobx'
import axios from 'axios'

export class FavoritesStore {
    @observable favoriteCities = JSON.parse(localStorage.savedCities || "[]")

    @action pushToFavorites =  async (cityKey, cityName) => {
        let cityToSave = {key: cityKey,
                          name: cityName,
                            isSaved: true}
        try{
            let response = await axios.get(this.currentConditionsUrl(cityKey))
            cityToSave.currentConditions = { date: response.data[0].LocalObservationDateTime,
                                            weatherText: response.data[0].WeatherText,
                                            icon:  response.data[0].WeatherIcon,
                                            temperature: response.data[0].Temperature} 
            this.favoriteCities.push(cityToSave)
            localStorage.savedCities = JSON.stringify(this.favoriteCities)   
        }
        catch(error){
            return error
        }
    } 

    @action removeFromFavorites = (cityKey) => {
        let city = this.favoriteCities.find(c => c.key === cityKey)
        let cityIndex = this.favoriteCities.indexOf(city)
        this.favoriteCities.splice(cityIndex, 1)
        localStorage.savedCities = JSON.stringify(this.favoriteCities)
    } 

    constructor(){
        this.API_KEY = 'uuUVSmGWQ9hWzLPzNCbaaSnNtLr4ykjO'
        this.API_HOST = 'http://dataservice.accuweather.com/'
    }

    currentConditionsUrl = cityKey => `${this.API_HOST}currentconditions/v1/${cityKey}?apikey=${this.API_KEY}`
}