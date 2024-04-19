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