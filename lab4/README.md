Prompts:
1) Make a weather app using the Tech stack of HTML, CSS and JS use openweather map API with API key of (2647e6e2577161f590f6002bb89571cb) and visualcrossing’s weather API with API key of (RLL7C39CSZU8F593DTZC6AZP3)
Using the open weather map, display the city,icon, and current temperature on the left side of the upper section. Then, using visualcrossing’s weather API, use its forecasting data to show the weather of the next 7 days, displaying the day of the week, weather icon, a weather bar with a gradient that corresponds to the temperature and a low and high temperature. THis is all in the upper section of the app.
Then in the lower section, display the wind gusts, wind speed and wind direction using the visual crossing API, with a compass displaying the wind direction. Under that display a 2 row by 3 column grid of rounded squares displaying feels like temperature, precipitation, visibility, humidity, sunrise/sunset (depending on what time it is), and pressure.
The app should be color themed based on time of day and weather, examples like dark when it’s night and light blue when it’s sunny.
2) Can you make the following changes:
Use this for the VisualCrossing weather icons: https://github.com/visualcrossing/WeatherIcons/tree/main/PNG/4th%20Set%20-%20Color
Change the degrees to fahrenheit
Make the forecast vertical and make the gradient based off the lows and highs of that day in the forecast
Make a compass for the wind direction, pointing to the direction given by the API

3) script.js:74 Uncaught (in promise) TypeError: Cannot read properties of null (reading 'style')
    at fetchAdditionalWeatherDetails
4) Make the gradient into a rounded bar and have the days displayed vertically. 
5) Don’t make the background of the forecast the gradient color, have the format of (for each day in the forecast) from left to right: day of the week, icon, low temperature, gradient bar, high temperature. Make sure not to include the words low and high. Then have the city, current temperature and current icon displayed to the left of the forecasted weather, with a background of similar but different shade than the page background.
6) make the forecast be in the same section as the city, current temperature and icon and make them have the same background
7) put the forecast on the right side of the top section and the current city, temperature and icon on the left side of the section
8)make sure the forecast and the left side have the same background color, also center the left side vertically to the center of the section
9) try to make it more visually appealing
10) correct the font sizes
11) for everything
12) can you change the bar to a gray bar in the background that is the same length for each day, with each bar starting and ending at the same x location and having a colored bar located on the gray bar with it's length and location dependent on the low and high of that day
13) can you fix the js so that it works again
14) correct the html and css
15) do it again correctly and change print all the files
16) fix the js
17) put the wind components in a box


Subset of the lab: Pulling and displaying information from the two APIs

Reflection:
Throughout this lab, I got very frustrated with Chat GPT as it ran out of memory and kept forgetting what the old code was, therefore not regenerating the code bits the same as before. This made errors as the html, css and js pages were not lined up with each other. In addition, it did not and would not understand what a gradient bar is, so I just left it as a bar, which works as well. In addition, when I told it to do one thing, it would often delete the thing I previously told it to do and just try to implement the thing that I just told it to do. Another problem was the displaying the information that was requested from the API. There were often errors where the data would not show up and the whole screen were filled with blank images and null information. I fixed this just by copy and pasting the errors into chatgpt and asking to fix it and with enough iterations, it was able to fix the error. 

Citations:
https://chatgpt.com/
