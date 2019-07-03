import getWeatherIcon from './weather-icons';
import {apiKey } from './api';
import {aktualniUrl} from './api';

let city = "Brno";

export default class Pocasi {
        constructor(lokace){
            this.location = lokace;
        }  

    getWeather(location){
        
        //získáme data o počasí
        fetch(`${aktualniUrl}?APPID=${apiKey}&q=${location}&units=metric&lang=cz`)
            .then(response => response.json())
            .then(data => {
                this.displayWeather(data);    
        })
    }

    displayWeather(data){
        document.querySelector("#mesto").textContent = city;

        let novaIkona = getWeatherIcon(data.weather[0].id, data.weather[0].icon);
        let ikonaElement = document.querySelector('#ikona');
        ikonaElement.innerHTML = novaIkona;

        document.querySelector("#teplota").textContent = data.main.temp;
        document.querySelector("#popis").textContent = data.weather[0].description;
        document.querySelector("#vlhkost").textContent = data.main.humidity;
        document.querySelector("#vitr").textContent = data.wind.speed;
        document.querySelector("#vychod").textContent =  new Date(data.sys.sunrise * 1000).getHours() + "h " + new Date(data.sys.sunrise * 1000).getMinutes() + "min";
        document.querySelector("#zapad").textContent = new Date(data.sys.sunset * 1000).getHours() + "h " + new Date(data.sys.sunset * 1000).getMinutes() + "min";
    }     
    
}