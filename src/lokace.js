export default function getLocation(callback){
    let lat = "";
    let lon = "";
    if ("geolocation" in navigator) {
        //geolokace je dostupná a získáme souřadnice:
        //očekává jako parametr funkci s jedním parametrem, která se zavolá, až budou známé souřadnice
        navigator.geolocation.getCurrentPosition(callback);
    } else {
        console.log ("Smůla");
    };
}