function getWeather() {
    // API key obtained from OpenWeatherMap API documentation
    const apiKey = '61244f8685a666a2518fb7cddeb2d5a2';
    // Extracting city name from input field
    const city = document.getElementById('city').value.trim();
  
    // Check if city name is empty
    if (!city) {
      displayError('Please enter a city.', true);
      return;
    }
  
    // Constructing API request URL based on city name and units
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${getUnits()}`;
  
    // Fetching weather data from OpenWeatherMap API
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Weather data not found. Please try again.');
        }
        return response.json();
      })
      .then(data => {
        // Displaying weather information on the web page
        displayWeatherInfo(data);
      })
      .catch(error => {
        // Displaying error message if weather data retrieval fails
        displayError(error.message, true);
      });
  }

  function displayWeatherInfo(data) {
    // Formatting and displaying weather information
    const weatherInfo = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>Temperature: ${data.main.temp} ${getTemperatureUnit()}</p>
      <p>Weather: ${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    document.getElementById('weather-info').innerHTML = weatherInfo;
    document.getElementById('weather-info').classList.remove('hidden');
  }
  function displayError(message, show) {
    // Displaying error message if there is an issue with user input or API request
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.classList.toggle('hidden', !show);
  }
  function getUnits() {
    // Getting selected units (metric or imperial) from dropdown menu
    return document.getElementById('units').value;
}

function getTemperatureUnit() {
    // Determining the temperature unit based on selected units
    return getUnits() === 'metric' ? '°C' : '°F';
}

function changeUnits() {
    // Triggering weather data retrieval when units are changed
    getWeather();
}

function changeTheme() {
    // Changing theme (light or dark) based on selected option
    const theme = document.getElementById('theme').value;
    document.body.className = theme;
}