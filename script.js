// Fetch from API
function data() {
    const cityInput = document.querySelector("#city");
    const citySubmit = document.querySelector("#city-submit");
    const dataContainer = document.querySelector(".data-container");
    const name = document.querySelector(".cityName");
    const current = document.querySelector(".current");
    const currentH3 = document.querySelector(".current h3")
    const currrentCon = document.querySelector(".current-conditions");
    const degrees = document.querySelector(".degrees");
    const currData = document.querySelector(".curr-data");
    const currImage = document.querySelector(".curr-image");

    async function fetchWeather(cityName) {
        try {
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=us&key=8A45R9EG9FAGY786X8WCEGF8M&contentType=json`, {mode: 'cors'});
            const data = await response.json();
            console.log(data);
    
            let inputs;
            let arrDays = [];
            inputs = document.createElement("div");
            inputs.classList.add("temps");
            dataContainer.appendChild(inputs);
            degrees.style.display = "flex";

            current.style.backgroundColor = "rgb(118, 176, 223)";

            const imgElement = document.createElement("img");
            imgElement.classList.add("img-element");
            currImage.appendChild(imgElement);

            // current 
            let currTemp = document.createElement("h1");
            currTemp.classList.add("current-temperature");
            currrentCon.appendChild(currTemp);
            currTemp.textContent = data.currentConditions.temp;

            let currConditions = document.createElement("h2");
            currConditions.classList.add("current-description");
            currConditions.textContent = data.currentConditions.conditions;
            currrentCon.appendChild(currConditions);

            if (data.currentConditions.conditions === "Clear") {
                imgElement.src = "images/sunny.jpg";
            } else if (data.currentConditions.conditions === "Partially cloudy") {
                imgElement.src = "images/partly cloudy.jpg";
            } else if (data.currentConditions.conditions === "Rain") {
                imgElement.src = "images/Rain.jpg";
            } else if (data.currentConditions.conditions === "Overcast") {
                imgElement.src = "images/cloudy.jpg";
            } else if (data.currentConditions.conditions === "Snow") {
                imgElement.src = "images/snow.jpg";
            }

            const currInfo = document.createElement("div");
            currInfo.classList.add("info");
            currrentCon.appendChild(currInfo);

            let currPrecip = document.createElement("div");
            currPrecip.classList.add("current-precipitation");
            currPrecip.textContent = `Rain: ${data.currentConditions.precip}%`;
            currInfo.appendChild(currPrecip);

            let feelsLike = document.createElement("div");
            feelsLike.classList.add("feels-like");
            feelsLike.textContent = `Feels Like: ${data.currentConditions.feelslike}`;
            currInfo.appendChild(feelsLike);

            let humidity = document.createElement("div");
            humidity.classList.add("humidity");
            humidity.textContent = `Humidity: ${data.currentConditions.humidity}`;
            currInfo.appendChild(humidity);
            
            // Bottom cards 
            for (let i = 0; i < data.days.length; i++)  {
                const tempMax = data.days[i].tempmax;
                const tempMin = data.days[i].tempmin;
                const precip = data.days[i].precip;
                arrDays = [];

                const outerDays = document.createElement("div");
                outerDays.classList.add("outer-days");
                inputs.appendChild(outerDays);

                const dayTitle = document.createElement("div");
                dayTitle.classList.add("day-title");
                dayTitle.textContent = `${data.days[i].datetime}: `;
                outerDays.appendChild(dayTitle);

                const image = document.createElement("img");
                image.classList.add("weather-img");
                outerDays.appendChild(image);

                if (data.days[i].conditions === "Clear") {
                    image.src = "images/sunny.jpg";
                } else if (data.days[i].conditions === "Partially cloudy") {
                    image.src = "images/partly cloudy.jpg";
                } else if (data.days[i].conditions.includes("Rain")) {
                    image.src = "images/Rain.jpg";
                } else if (data.days[i].conditions === "Overcast") {
                    image.src = "images/cloudy.jpg";
                } else if (data.days[i].conditions.includes("Snow")) {
                    image.src = "images/snow.jpg";
                }

                const img = document.createElement("div");
                img.classList.add("days-description");
                img.textContent = data.days[i].conditions;
                outerDays.appendChild(img);
                
                const minMax = document.createElement("div");
                minMax.classList.add("inputDays");
    
                const percipitation = document.createElement("div");
                percipitation.classList.add("precip");
                
                outerDays.appendChild(minMax);
                outerDays.appendChild(percipitation);
                
        
                arrDays.push(tempMax);
                arrDays.push(tempMin);
    
                // Display to page 
                minMax.textContent = ` High: ${tempMax} \n Low: ${tempMin}`;
                percipitation.textContent = `Rain: ${precip}%`;
                name.textContent = data.resolvedAddress;
                currentH3.textContent = "Current";
            }  
        } catch(err) {
            name.textContent = `Error fetching '${cityName}' ${err}`;
        }
        
    } 

    const deleteChild = (container) => {
        let child = container.firstElementChild;
        while (child) {
            container.removeChild(child);
            child = container.lastElementChild;
        }
    }

    // Form to fetch data 
    citySubmit.addEventListener("click", () => {
        const searchTerm = cityInput.value.trim();
        if (searchTerm) {
            deleteChild(currImage);
            deleteChild(dataContainer);
            deleteChild(currrentCon);
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


