// SkyFetch Weather Dashboard - Part 1
// Hardcoded city: London (as per assignment requirements)
const city = 'London';
const apiKey = '9696384b5b8c2d47bf75f67'; // Your generated API key
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

// DOM elements
const cityNameEl = document.getElementById('city-name');
const tempEl = document.getElementById('temperature');
const descEl = document.getElementById('description');
const iconEl = document.getElementById('weather-icon');
const weatherDisplay = document.getElementById('weather-display');

// Function to update DOM with weather data
function updateWeather(data) {
    cityNameEl.textContent = data.name;
    tempEl.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
    descEl.textContent = data.weather[0].description;
    iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    
    // Remove loading class
    weatherDisplay.classList.remove('loading');
}

// Function to show error
function showError(message) {
    cityNameEl.textContent = 'Weather Unavailable';
    tempEl.textContent = 'Temperature: --°C';
    descEl.textContent = message;
    iconEl.src = '';
    weatherDisplay.classList.add('error');
    weatherDisplay.classList.remove('loading');
}

// Fetch weather data using Axios with Promises
axios.get(url)
    .then(response => {
        console.log('✅ API Response:', response.data); // Debug log
        updateWeather(response.data);
    })
    .catch(error => {
        console.error('❌ API Error:', error.response?.data || error.message);
        
        if (error.response?.status === 404) {
            showError('City not found. Check spelling.');
        } else if (error.response?.status === 401) {
            showError('Invalid API key. Regenerate key.');
        } else {
            showError('Failed to fetch weather. Check connection.');
        }
    });

// Add loading state initially
weatherDisplay.classList.add('loading');
