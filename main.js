
document.addEventListener("DOMContentLoaded", () => {
  search("Cairo"); 
});

document.getElementById("search").addEventListener("keyup", (event) => {
  const cityName = event.target.value.trim(); 
  if (cityName.length > 2) {
    search(cityName); 
  }
});

async function search(cityName) {
  const container = document.getElementById("cards-container");
  container.innerHTML = "<p>Loading...</p>"; 

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=545b20577e1c449eac0183607241312&q=${cityName}&days=3`
    );

    if (response.ok) {
      const data = await response.json();
      displayWeather(data.forecast.forecastday, cityName); 
    } else {
      container.innerHTML = "<p>City not found. Please try again.</p>";
    }
  } catch (error) {
    console.error("Fetch error:", error);
    container.innerHTML =
      "<p>Something went wrong. Please try again later.</p>";
  }
}

function displayWeather(forecast, cityName) {
  const container = document.getElementById("cards-container");
  container.innerHTML = ""; 

  forecast.forEach((day) => {
    const date = new Date(day.date);
    const card = `
        <div class="col-md-4">
          <div class="card pb-5 d-flex flex-column">
            <div class="card-head d-flex p-2 justify-content-between align-items-center">
              <div>${days[date.getDay()]}</div>
              <div>${date.getDate()} ${monthNames[date.getMonth()]}</div>
            </div>
            <div class="card-body">
              <span class="mb-2 text-opacity-75 text-white"> ${cityName}</span>
           
              <div class="degree">
                <div class="num">${day.day.avgtemp_c}<sup>o</sup>C</div>
                <div class="img-degree">
                  <img src="${day.day.condition.icon}" alt="Weather Icon" />
                </div>
              </div>
              <div class="mood ms-2">${day.day.condition.text}</div>
              <div class="items mt-3 text-opacity-75 text-white">
                <span class="ms-2">
                  <img src="./imgs/icon-umberella@2x.png" alt="" /> 20%
                </span>
                <span class="ms-2">
                  <img src="./imgs/icon-wind@2x.png" alt="" /> ${
                    day.day.maxwind_kph
                  } km/h
                </span>
                <span class="ms-2">
                  <img src="./imgs/icon-compass@2x.png" alt="" /> East
                </span>
              </div>
            </div>
          </div>
        </div>
      `;
    container.innerHTML += card;
  });
}

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
