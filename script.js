const API_KEY = '2ba7ff13e4a123363f333d3c73ab5932'; // Replace with your actual API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// FETCHING HTML ELEMENTS
const cityinput = document.getElementById('cityinput');
const searchButton = document.getElementById('searchButton');
const weatherDisplay = document.getElementById('weatherdisplay');
const loadingMessage = document.getElementById('loadingMessage'); // Optional loading element
const error = document.getElementById('error');
const errorMessage = document.getElementById('errorMessage');

const CityName = document.getElementById('cityName');
const Temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherdescription');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

// Add event listeners
searchButton.addEventListener('click', hiddensearch);
cityinput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        hiddensearch();
    }
});

// Search trigger function
function hiddensearch() {
    const city = cityinput.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    hiddenAllSections();
    showLoading();

    fetchWeatherData(city);
}

// Fetch weather data
async function fetchWeatherData(city) {
    try {
        const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found');
            } else if (response.status === 401) {
                throw new Error('Invalid API key');
            } else {
                throw new Error('An error occurred while fetching the weather data');
            }
        }

        const data = await response.json();
        displayWeatherData(data);
    } catch (err) {
        console.error('Error fetching weather data:', err);
        hideLoading();
        showError(err.message);
    }
}

// Display weather data
function displayWeatherData(data) {
    hideLoading();

    const cityNameText = `${data.name}, ${data.sys.country}`;
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const feelsLikeTemp = Math.round(data.main.feels_like);
    const humidityValue = data.main.humidity;
    const windSpeedValue = Math.round(data.wind.speed);

    CityName.textContent = cityNameText;
    Temperature.textContent = temp;
    weatherDescription.textContent = description;
    feelsLike.textContent = feelsLikeTemp;
    humidity.textContent = humidityValue;
    windSpeed.textContent = windSpeedValue;

    showWeatherDisplay();
}

// UI helper functions
function showLoading() {
    if (loadingMessage) loadingMessage.classList.remove('hidden');
}

function hideLoading() {
    if (loadingMessage) loadingMessage.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    error.classList.remove('hidden');
}

function hideError() {
    error.classList.add('hidden');
}

function showWeatherDisplay() {
    weatherDisplay.classList.remove('hidden');
}

function hideWeatherDisplay() {
    weatherDisplay.classList.add('hidden');
}

function hiddenAllSections() {
    hideLoading();
    hideError();
    hideWeatherDisplay();
}

// Test function with sample data
function testWithSampleData() {
    const sampledata = {
        name: 'London',
        sys: { country: 'GB' },
        main: {
            temp: 15,
            feels_like: 14,
            humidity: 80
        },
        weather: [{ description: 'light rain' }],
        wind: { speed: 5 },
    };
    displayWeatherData(sampledata);
}
