let weather = {
    "apiKey": "6df5618d67214c355bc4bf9e62041ff9",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city 
            +"&units=metric&appid=" 
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      console.log(name, icon, description, temp, humidity, speed);
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".humidity").innerText ="Humidity: " + humidity;
      document.querySelector(".wind").innerText ="Wind speed: " + speed + "km/h";
    //document.querySelector(".weather").classList.remove("loading")
      document.querySelector("body").style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name +"/?tower')"
    },
    search: function() {
        if(document.querySelector(".search-bar").value == ""){
            document.querySelector(".search-bar").style.border = "0.01em solid #ff0f0f";
        }
        else {
            document.querySelector(".search-bar").style.border = "none";
            this.fetchWeather(document.querySelector(".search-bar").value);
        }
    }
};

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
})

document.querySelector(".search-bar").addEventListener("keypress", function(e){
    if(e.key === 'Enter') {
        weather.search();
    }
})

// default
weather.fetchWeather("Baku")