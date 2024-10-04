# project-weather-app

This is Project Weather App. In this project, weather data can be viewed from Visual Crossing's weather API. Users can search a city to view weather data for that city. 

The weather data is organized in the following ways: 
When weather data is loaded to the page, in the container directly under the city title is the current weather. This includes the current temperature, current conditions (Clear, Partly cloudy, Rain, Overcast, Snow, or Partly cloudy/rain), percent probability of rain, what temperature it currently feels like, and the humidity level. 

Below this, there are 15 cards that represent the forcast for the next 15 days. These containers include the date, conditions, the high and low temperature for the day, and the percent probability of rain. The columns and rows within this card container grow/shrink dynamically using the auto-fill property. 
Within each day card, there are three buttons: more, hourly, and daily. When more is clicked another card displays the right of (or below on smaller screens) the current section. Additional data for that day displayed on this card is a description of the day's weather, the humidity, sunrise amd sunset. To remove this card, a close button is displayed in the top right corner. The hours button replaces the card's content with the temperature for each hour of that day. To remove this, click the daily button. 

The sun/cloud images were created from shapes in Microsoft Word. The raindrops were added using Microsoft Edge's PDF reader. 

In the top right corner, there are buttons to toggle the degrees from fahrenheit to celsius and vice versa. 

Lastly, if the city name is invalid, the error message will display to the DOM when clicking submit. 