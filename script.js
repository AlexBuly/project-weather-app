// Fetch from API
function data() {
    const cityInput = document.querySelector("#city");
    const citySubmit = document.querySelector("#city-submit");
    async function fetchWeather(cityName) {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=us&elements=datetime%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2Chumidity%2Cprecip%2Ccloudcover&include=days%2Ccurrent&key=8A45R9EG9FAGY786X8WCEGF8M&contentType=json`, {mode: 'cors'});
        const data = await response.json();
        console.log(data);
    
        // Narrow down to access specific attributes 
        for (let i = 0; i < data.days.length; i++)  {
            const tempMax = data.days[i].tempmax;
            const tempMin = data.days[i].tempmin;
            console.log(` day ${i +1} max ` + tempMax);
            console.log(`day ${i + 1} min ` + tempMin);
            //if (clouds < 7 ) console.log("Value " + clouds);
        }
    }

    citySubmit.addEventListener("click", () => {
        const searchTerm = cityInput.value.trim();
        if (searchTerm) {
            fetchWeather(searchTerm);
        }
    })


    return {fetchWeather} 
}
// async function fetchWeather() {
//     const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Huntington?unitGroup=us&elements=datetime%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2Chumidity%2Cprecip%2Ccloudcover&include=days%2Ccurrent&key=8A45R9EG9FAGY786X8WCEGF8M&contentType=json');
//     const data = await response.json();
//     console.log(data);

//     // Narrow down to access specific attributes 
//     for (let i = 0; i < data.days.length; i++)  {
//         const clouds = data.days[i].cloudcover;
//         console.log(clouds);
//         //if (clouds < 7 ) console.log("Value " + clouds);
//     }
// }
//fetchWeather();

const myData = data();

// Form to fetch data 


// Display to page 



