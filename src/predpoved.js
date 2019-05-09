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
                this.displayForecast(data);       
        })
    }

    dnes(){
       // let today = new Date(); // vytvoří proměnnou obsahující aktuální datum
        let denVMesici = new Date().getDate();
        today = denVMesici;
        console.log(today);
        return today;
    }

    displayForecast(data){
        console.log(data);
        let predpoved = document.querySelector("#predpoved");
        let html = "";

        this.dnes();
        
        data.list.forEach(den => {
            
            let novaIkona = getWeatherIcon(den.weather[0].id, den.weather[0].icon);
            let datum = new Date(den.dt * 1000).getDate();
            let mesic = new Date(den.dt * 1000).getMonth()+1;
            let jmenoDne = new Date(den.dt * 1000).getDay();

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

            html += `
            <div class="forecast">
                <div class="forecast__day">
                    ${jmenoDne} ${datum}. ${mesic}.
                <!-- den v týdnu a datum, např.: Pondělí 22.4. -->
                </div>
                
                <div class="forecast__icon">
                    <i class="wi wi-sunny-day">${novaIkona}</i>
                </div>
                
                <div class="forecast__temp">
                    ${den.main.temp} °C
                </div>
          </div>`
        });

        predpoved.innerHTML = html;
    }
}