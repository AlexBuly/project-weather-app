//import {domElements } from "./domElements";

function domElements() {
    const currImageElement = (curImage, append, className, condition) => {
        curImage = document.createElement("img");
        curImage.classList.add(className);
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

    const weatherConditions = (image, condition) => {
        const weatherImages = {
            "Clear": "images/sunny.jpg",
            "Partially cloudy": "images/partly cloudy.jpg",
            "Rain": "images/Rain.jpg",
            "Overcast": "images/cloudy.jpg",
            "Snow": "images/snow.jpg"
        };
        image.src = weatherImages[condition];
    }   

    const currTempElement = (currTemp, append, condition) => {
        currTemp = document.createElement("h1");
        currTemp.classList.add("current-temperature");
        currTemp.textContent = `${condition}°F`;
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
            humidityElement,
            weatherConditions
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
    const high = document.querySelector(".high");
    const low = document.querySelector(".low");
    const more = document.querySelector(".moreInfo");
    const rightImg = document.querySelector(".rightImage");
    const descript = document.querySelector(".des");
    const humidityDays = document.querySelector(".humidity");
    const precipprobDays = document.querySelector(".precip");
    const sunRise = document.querySelector(".sunrise");
    const sunSet = document.querySelector(".sunset");

    async function fetchWeather(cityName) {
        try {
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=us&key=8A45R9EG9FAGY786X8WCEGF8M&contentType=json`, {mode: 'cors'});
            const data = await response.json();
            console.log(data);

            const { conditions, temp, precipprob, feelslike, humidity  } = data.currentConditions;

            const DOM = domElements();
    
            let inputs;
            inputs = document.createElement("div");
            inputs.classList.add("temps");
            dataContainer.appendChild(inputs);
            degrees.style.display = "flex";

            dataCurrent.style.backgroundColor = "rgb(118, 176, 223)";
            
           DOM.currImageElement(null, currImage, "img-element", conditions);
           DOM.currTempElement(null, currrentCon, temp);
           DOM.currConditionElement(null, currrentCon, conditions);

            const currInfo = document.createElement("div");
            currInfo.classList.add("info");
            currrentCon.appendChild(currInfo);

            DOM.precipElement(null, currInfo, precipprob);
            DOM.feelsLikeElement(null, currInfo, feelslike);
            DOM.humidityElement(null, currInfo, humidity);

            displayForcast(data.days, inputs, name, currentH3,  data.resolvedAddress, DOM);

        } catch(err) {
            name.textContent = `Error fetching '${cityName}' ${err}`;
        }
    }

        const displayForcast = (days, container, name, currentH3, city, DOM) => {
            let arrDays = [];
            days.forEach(day => {
                const outerDays = document.createElement("div");
                outerDays.classList.add("outer-days");
                container.appendChild(outerDays);
                
                const dayData = document.createElement("div");
                dayData.classList.add("day-data");
                outerDays.appendChild(dayData);

                const dayTitle = document.createElement("div");
                dayTitle.classList.add("day-title");
                dayTitle.textContent = `${day.datetime}: `;
                dayData.appendChild(dayTitle);


                const condition = day.conditions.includes("Rain") ? "Rain" : day.conditions;
                DOM.currImageElement(null, dayData,"weather-img", condition);

                const description = document.createElement("div");
                description.classList.add("days-description");
                description.textContent = day.conditions;
                dayData.appendChild(description);
                
                const minMax = document.createElement("div");
                minMax.classList.add("inputDays");
                minMax.textContent = ` High: ${day.tempmax} \n Low: ${day.tempmin}`;
                dayData.appendChild(minMax);
    
                const precipitation = document.createElement("div");
                precipitation.classList.add("precip");
                precipitation.textContent = `Rain: ${day.precip}%`;
                dayData.appendChild(precipitation);

                const btn = document.createElement("button");
                btn.textContent = "More";
                outerDays.appendChild(btn); 

                const dailyHours = document.createElement("div");
                dailyHours.classList.add("hours-section");
                outerDays.appendChild(dailyHours);
                dailyHours.style.display = "none";

                const hours = document.createElement("button");
                hours.textContent = "Hourly";
                outerDays.appendChild(hours);

                const daily = document.createElement("button");
                daily.classList.add("back-to-day");
                daily.textContent = "Daily";
                outerDays.appendChild(daily);

                daily.addEventListener("click", () => {
                    dayData.style.display = "block";
                    dailyHours.style.display = "none";
                });

                hours.addEventListener("click",() => {
                    dayData.style.display = "none";
                    dailyHours.style.display = "block"; 

                    const hoursTitle = document.createElement("div");
                    hoursTitle.classList.add("hours-title");
                    hoursTitle.textContent = "Hourly";
                    dailyHours.appendChild(hoursTitle);

                    day.hours.forEach(hour => {
                        const hoursText = document.createElement("div");
                        hoursText.classList.add("hours-text");
                        hoursText.textContent = `${hour.datetime}: ${hour.temp}`;
                        dailyHours.appendChild(hoursText);
                    });
                })

                btn.addEventListener("click", () => {
                    DOM.weatherConditions(rightImg, condition);
                    more.style.display = "grid";
                    more.style.gridTemplateColumns = "1fr 1fr 1fr";
                    high.textContent = `High: ${day.tempmax}`;
                    low.textContent = `Low: ${day.tempmin}`;
                    descript.textContent = `Description: ${day.description}`;
                    humidityDays.textContent = `Humidity: ${day.humidity}%`;
                    precipprobDays.textContent = `Rain: ${day.precipprob}%`;
                    sunRise.textContent = `Sunrise: ${day.sunrise}`;
                    sunSet.textContent = `Sunset: ${day.sunset}`;      
                });

                const close = document.querySelector(".close"); 

                close.addEventListener("click", () => {
                    more.remove();
                });

                arrDays.push(day.tempmax, day.tempmin);

                name.textContent = city;
                currentH3.textContent = "Current";
            });
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
            deleteChild(currrentCon);;
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


