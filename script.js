// Fetch from API
function data() {
    const cityInput = document.querySelector("#city");
    const citySubmit = document.querySelector("#city-submit");
    const dataContainer = document.querySelector(".data-container");
    const name = document.querySelector(".cityName");

    async function fetchWeather(cityName) {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=us&elements=datetime%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2Chumidity%2Cprecip%2Ccloudcover&include=days%2Ccurrent&key=8A45R9EG9FAGY786X8WCEGF8M&contentType=json`, {mode: 'cors'});
        const data = await response.json();
        console.log(data);

        let inputs;
        let arrDays = [];
        inputs = document.createElement("div");
        inputs.classList.add("temps");
        dataContainer.appendChild(inputs);
        // Narrow down to access specific attributes 
        for (let i = 0; i < data.days.length; i++)  {
            const tempMax = data.days[i].tempmax;
            const tempMin = data.days[i].tempmin;
            arrDays = [];
            const dayTitle = document.createElement("div");
            dayTitle.classList.add("day-title");
            const days = document.createElement("div");
            days.classList.add("inputDays");
            inputs.appendChild(dayTitle);
            inputs.appendChild(days);
            dayTitle.textContent = `Day ${i +1 }: `
    
            // inputs = document.createElement("div");
            // inputs.classList.add("temps");
            // dataContainer.appendChild(inputs);
            //inputs.textContent = '';
            arrDays.push(tempMax);
            arrDays.push(tempMin);
            console.log(arrDays);
            console.log(`Day ${i + 1} max: ` + tempMax);
            console.log(`Day ${i + 1} min: ` + tempMin);
            console.log(name);

            // Display to page 
            days.textContent = ` Max: ${tempMax} Min: ${tempMin}`;
            name.textContent = data.address;
            //location.textContent = data
            //if (clouds < 7 ) console.log("Value " + clouds);
        }
    }

    const deleteChild = () => {
        let child = dataContainer.lastElementChild;
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


