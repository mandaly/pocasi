export default function getLocation(callback){
    let lat = "";
    let lon = "";

    if ("geolocation" in navigator) {
        //geolokace je dostupná a získáme souřadnice:
        //očekává jako parametr funkci s jedním parametrem, která se zavolá, až budou známé souřadnice
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            
            console.log(position.coords.latitude, position.coords.longitude); 
            console.log(`?lat=${lat}&lon=${lon}`);

            return `?lat=${lat}&lon=${lon}`;
        });
    } else {
        console.log ("Smůla");
    };
}