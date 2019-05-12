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

    filterDate(data){
        let dnes = new Date().getDate();
        let novePole = [];
        let novePoleTemp1 = [];
        let novePoleTemp2 = [];
        let novePoleTemp3 = [];
        let novePoleTemp4 = [];

            data.list.forEach (den => {
                let datum = new Date(den.dt * 1000).getDate();
                    if(datum == dnes+1){
                        novePoleTemp1.push(den.main.temp); 
                    }

                    else if(datum == dnes+2){
                        //novePole.push(den.main.temp);
                        novePoleTemp2.push(den.main.temp); 
                    }

                    else if(datum == dnes+3){
                        //novePole.push(den.main.temp);
                        novePoleTemp3.push(den.main.temp); 
                    }

                    else if(datum == dnes+4){
                        //novePole.push(den.main.temp);
                        novePoleTemp4.push(den.main.temp); 
                    };
            })
    
            let maxTemp1 = Math.max(...novePoleTemp1);
            let maxTemp2 = Math.max(...novePoleTemp2);
            let maxTemp3 = Math.max(...novePoleTemp3);
            let maxTemp4 = Math.max(...novePoleTemp4);
    
            data.list.forEach (den => {
                if(den.main.temp == maxTemp1){
                    novePole.push(den);
                } else if(den.main.temp == maxTemp2){
                    novePole.push(den);
                } else if(den.main.temp == maxTemp3){
                    novePole.push(den);
                } else if(den.main.temp == maxTemp4){
                    novePole.push(den);
                }
            })    

        return novePole;
                
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