const notificationElement = document.querySelector('.notification');
const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');
const locationElement = document.querySelector('.location p');

const kelvin = 273;
const key = 'cd0fab900d4bf026b1020d1872a23c39';

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = '<p> Browser Doesnt Support Geolocation.</p>';
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude);
    console.log(longitude);
    getWeather(latitude, longitude);
}

function showError(error) {
    error = "Check your Internet Connection";
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `<p>${error}</p>`;
}

async function getWeather(latitude, longitude) {

    let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily,alerts&appid=${key}`;

    await fetch(api)
    //console.log(api);
    .then((response) =>{
        let data = response.json();
        return data;
    })
    .then((data) =>{
        weather.temperature.value = Math.floor(data.current.temp - kelvin);
        weather.description = data.current.weather[0].description;
        weather.iconId = data.current.weather[0].icon;
    })
    .then(() =>{
        displayWeather();
    })
    console.log(api);
}

const weather = {
    temperature: {
        value: '',
        unit: ''
    },
    description: '',
    iconId: '',
    city: 'Jalna',
    country: 'India'
};


function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

tempElement.addEventListener('click', () => {
    try{

        if (temperature.value === undefined || temperature.value == '') {
            return;
        }
    }catch(err){
        err = alert('Please Check your internet connection');
    }
    if (weather.temperature.unit === 'celsius') {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit.innerHTML = Math.floor(fahrenheit);
        tempElement.innerHTML = `${fahrenheit}° <span>F</span>`;
        weather.temperature.unit = "fahrenheit"
    } else if(weather.temperature.unit === 'fahrenheit') {
        tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
        weather.temperature.unit = 'celsius';
    }
});

function displayWeather() {

    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png">`;

    tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;

    descElement.innerHTML = weather.description;

    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}



