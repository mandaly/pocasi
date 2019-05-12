import {apiKey } from './api';
import {forecastUrl } from './api';
import getWeatherIcon from './weather-icons';

let location = "Brno";

export default class Predpoved {
    constructor(){

    }  

    getForecast(){
        //získáme data o počasí
        fetch(`${forecastUrl}?APPID=${apiKey}&q=${location}&units=metric&lang=cz`)
            .then(response => response.json())
            .then(data => {
                this.getForecastDate(data);       
        })
    }

    getForecastDate(data){
        console.log(data.filter(filterDate));
    }
    
    

    filterDate(data){
        let dnes = new Date().getDate();
        let datum = new Date(data.dt * 1000).getDate();
        let novePole = [];

        if(datum == dnes + 1){
            novePole.push(data);
        };
        console.log(novePole);
        return novePole;
    }

    filterTemperature(data){
        //console.log(Math.max(data.list[0].main.temp));
        return Math.max(data.list[0].main.temp);
    }

    


    displayForecast(data){
        
        let predpoved = document.querySelector("#predpoved");
        let html = "";

        data.filter(filterDate);
        
        data.list.forEach(den => {
            
            let datum = new Date(den.dt * 1000).getDate();
            let jmenoDne = new Date(den.dt * 1000).getDay();
            let dnes = new Date().getDate();

            console.log(datum == dnes + 1)

            if(jmenoDne == 0){
                jmenoDne = "neděle";
            } else if(jmenoDne == 1) {
                jmenoDne = "pondělí"
            } else if(jmenoDne == 2) {
                jmenoDne = "úterý"
            } else if(jmenoDne == 3) {
                jmenoDne = "středa"
            } else if(jmenoDne == 4) {
                jmenoDne = "čtvrtek"
            } else if(jmenoDne == 5) {
                jmenoDne = "pátek"
            } else if(jmenoDne == 6) {
                jmenoDne = "sobota"
            }

            if(datum !== dnes){
                html += `
                <div class="forecast">
                    <div class="forecast__day">
                        ${jmenoDne} ${datum}. ${new Date(den.dt * 1000).getMonth()+1}.
                    </div>
                    
                    <div class="forecast__icon">
                        <i class="wi wi-sunny-day">${getWeatherIcon(den.weather[0].id, den.weather[0].icon)}</i>
                    </div>
                    
                    <div class="forecast__temp">
                        ${den.main.temp} °C
                    </div>
                 </div>`
            }
            
        });

        predpoved.innerHTML = html;
    }
}