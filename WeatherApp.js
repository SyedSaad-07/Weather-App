const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;


async function getWeatherByLocation(city) {
    const resp = await fetch( url(city), { origin: "cors" });
    const respData = await resp.json();

    addWeatherToPage(respData);
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    const location = search.value;
    console.log(search.value);
    if(location){
        getWeatherByLocation(location);
    }
});
function addWeatherToPage(data)
{
    const temp = KtoC(data.main.temp);
    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
    <h2>${temp}°C  <img src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png"/> </h2>
    <p>${data.weather[0].main}</p>
     `;
    
    main.innerHTML="";
    main.appendChild(weather);
    search.value="";
}