import {apiKey } from './api';
import {forecastUrl } from './api';

export default class Predpoved {
    constructor(){

    }  

    getForecast(location){
        //získáme data o počasí
        fetch(`${forecastUrl}?APPID=${apiKey}&q=${location}&units=metric&lang=cz`)
            .then(response => response.json())
            .then(data => {
                this.displayForecast(data);       
        })
    }

    filterDate(data){
        let teploty = {};

            data.list.forEach (den => {
                let d = new Date(den.dt * 1000).getDate();
                let m = new Date(den.dt * 1000).getMonth();
                let datum = ('00' + m).slice(-2) + '/' + ('00' + d).slice(-2);

                teploty[datum] = Math.max(teploty[datum] || -Infinity, den.main.temp);
            });
    
            console.log(teploty);

        return teploty;         
    }
    
    displayForecast(data){
         
        let predpoved = document.querySelector("#predpoved");
        let html = "";
        
        this.filterDate(data).forEach(den => {
            
            let datum = new Date(den.dt * 1000).getDate();
            let jmenoDne = new Date(den.dt * 1000).getDay();
            let dnes = new Date().getDate();

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