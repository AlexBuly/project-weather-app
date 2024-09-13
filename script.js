// Fetch from API
async function fetchWeather() {
    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Huntington?unitGroup=us&elements=datetime%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2Chumidity%2Cprecip%2Ccloudcover&include=days&key=8A45R9EG9FAGY786X8WCEGF8M&contentType=json');
    const data = await response.json();
    console.log(data);
}

fetchWeather();

// Narrow down to access specific attributes 

// Form to fetch data 

// Display to page 



