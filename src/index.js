import getLocation from './lokace';
import Pocasi from "./pocasi";
import Predpoved from "./predpoved";


let pocasi = new Pocasi();
let predpoved = new Predpoved();

let location = "";

getLocation(function (lokace) {

    location = `?lat=${lokace.coords.latitude}&lon=${lokace.coords.longitude}`;
    
    pocasi.getWeather(location);
    predpoved.getForecast();
});



