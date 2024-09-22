//import {domElements } from "./domElements";

function domElements() {
    const currImageElement = (curImage, append, condition) => {
        curImage = document.createElement("img");
        curImage.classList.add("img-element");
        append.appendChild(curImage);

        const weatherImages = {
            "Clear": "images/sunny.jpg",
            "Partially cloudy": "images/partly cloudy.jpg",
            "Rain": "images/Rain.jpg",
            "Overcast": "images/cloudy.jpg",
            "Snow": "images/snow.jpg"
        };

        curImage.src = weatherImages[condition];
    }

    const currTempElement = (currTemp, append, condition) => {
        currTemp = document.createElement("h1");
        currTemp.classList.add("current-temperature");
        currTemp.textContent = condition;
        append.appendChild(currTemp);
    }

    const currConditionElement = (currConditions, append, condition) => {
        currConditions = document.createElement("h2");
        currConditions.classList.add("current-description");
        currConditions.textContent = condition;
        append.appendChild(currConditions);

    }

    const precipElement = (currPrecip, append, condition) => {
        currPrecip = document.createElement("div");
        currPrecip.classList.add("current-precipitation");
        currPrecip.textContent = `Rain: ${condition}%`;
        append.appendChild(currPrecip);
    }

    const feelsLikeElement = (feelsLike, append, condition) => {
        feelsLike = document.createElement("div");
        feelsLike.classList.add("feels-like");
        feelsLike.textContent = `Feels Like: ${condition}`;
        append.appendChild(feelsLike);

    }

    const humidityElement = (humidity, append, condition) => {
        humidity = document.createElement("div");
        humidity.classList.add("humidity");
        humidity.textContent = `Humidity: ${condition}`;
        append.appendChild(humidity);
    }

    return {
            currImageElement, 
            currTempElement, 
            currConditionElement,
            precipElement,
            feelsLikeElement,
            humidityElement
        }
}

// Fetch from API
function data() {
    const cityInput = document.querySelector("#city");
    const citySubmit = document.querySelector("#city-submit");
    const dataContainer = document.querySelector(".data-container");
    const name = document.querySelector(".cityName");
    const current = document.querySelector(".current");
    const dataCurrent = document.querySelector(".data");
    const currentH3 = document.querySelector(".titleH3")
    const currrentCon = document.querySelector(".current-conditions");
    const degrees = document.querySelector(".degrees");
    const currData = document.querySelector(".curr-data");
    const currImage = document.querySelector(".curr-image");

    async function fetchWeather(cityName) {
        try {
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=us&key=8A45R9EG9FAGY786X8WCEGF8M&contentType=json`, {mode: 'cors'});
            const data = await response.json();
            console.log(data);

            const { conditions, temp, precip, feelslike, humidity  } = data.currentConditions;

            const DOM = domElements();
    
            let inputs;
            let arrDays = [];
            inputs = document.createElement("div");
            inputs.classList.add("temps");
            dataContainer.appendChild(inputs);
            degrees.style.display = "flex";

            dataCurrent.style.backgroundColor = "rgb(118, 176, 223)";
            
           DOM.currImageElement(null, currImage, conditions);
           DOM.currTempElement(null, currrentCon, temp);
           DOM.currConditionElement(null, currrentCon, conditions);

            const currInfo = document.createElement("div");
            currInfo.classList.add("info");
            currrentCon.appendChild(currInfo);

            DOM.precipElement(null, currInfo, precip);
            DOM.feelsLikeElement(null, currInfo, feelslike);
            DOM.humidityElement(null, currInfo, humidity);
            
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

                const btn = document.createElement("button");
                btn.textContent = "More";

                const more = document.querySelector(".moreInfo");

                btn.addEventListener("click", () => {
                    more.style.display = "block";
                })
                
                outerDays.appendChild(minMax);
                outerDays.appendChild(percipitation);
                outerDays.appendChild(btn);
                
        
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


