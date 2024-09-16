// Fetch from API
function data() {
    const cityInput = document.querySelector("#city");
    const citySubmit = document.querySelector("#city-submit");
    const dataContainer = document.querySelector(".data-container");
    const name = document.querySelector(".cityName");
    const current = document.querySelector(".current");
    const currentH3 = document.querySelector(".current h3")
    const currrentCon = document.querySelector(".current-conditions");

    async function fetchWeather(cityName) {
        try {
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=us&elements=datetime%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2Chumidity%2Cprecip%2Ccloudcover&include=days%2Ccurrent&key=8A45R9EG9FAGY786X8WCEGF8M&contentType=json`, {mode: 'cors'});
            const data = await response.json();
            console.log(data);
    
            let inputs;
            let arrDays = [];
            inputs = document.createElement("div");
            inputs.classList.add("temps");
            dataContainer.appendChild(inputs);

            const currTemp = document.createElement("h1");
            currTemp.classList.add("current-temperature");
            currrentCon.appendChild(currTemp);
            currTemp.textContent = data.currentConditions.temp;
            
            // Narrow down to access specific attributes 
            for (let i = 0; i < data.days.length; i++)  {
                const tempMax = data.days[i].tempmax;
                const tempMin = data.days[i].tempmin;
                const precip = data.days[i].precip;
                arrDays = [];
                const img = document.createElement("div");
                img.textContent = "img";
                inputs.appendChild(img);
                
                const dayTitle = document.createElement("div");
                dayTitle.classList.add("day-title");
                
                const minMax = document.createElement("div");
                minMax.classList.add("inputDays");
    
                const percipitation = document.createElement("div");
                percipitation.classList.add("precip");
                
                inputs.appendChild(dayTitle);
                inputs.appendChild(minMax);
                inputs.appendChild(percipitation);
                
                dayTitle.textContent = `${data.days[i].datetime}: `
        
                arrDays.push(tempMax);
                arrDays.push(tempMin);
    
                // Display to page 
                minMax.textContent = ` High: ${tempMax} \n Low: ${tempMin}`;
                percipitation.textContent = `Rain: ${precip}%`;
                name.textContent = data.resolvedAddress;
                currentH3.textContent = "Current:";
            }  
        } catch(err) {
            name.textContent = `Error fetching '${cityName}' ${err}`;
        }
        
    } 

    const deleteChild = () => {
        let child = dataContainer.firstElementChild;
        while (child) {
            dataContainer.removeChild(child);
            child = dataContainer.lastElementChild;
        }
    }

    // Form to fetch data 
    citySubmit.addEventListener("click", () => {
        const searchTerm = cityInput.value.trim();
        if (searchTerm) {
            deleteChild();
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


