const http = require('http');
const express = require('express')
const app = express()
const cors = require('cors');
const hostname = '127.0.0.1';
const port = 8088;
const path = require("path");
const pug = require('pug');
const APIKEY = "5fbeec192f55d711648ffe425ddaa1e9";
const fetch = require('node-fetch');


/* 
var script1 = document.createElement('script');
script1.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC3WMBm1H4bIGRFOgRpSoWABmPbp3yn6Bw&callback=initMap';
script1.defer = true;
script1.async = true;
window.initMap = function() {
   // JS API is loaded and available
 }; */
 




var options = {
    host: 'api.openweathermap.org',
    port: 80,
    path: '/data/2.5/weather?q=Tokyo,jp&units=metric',
    method: 'GET'
};
 const setOptionPath = (city) => {
   options.path = "/data/2.5/weather?q=" + city + "&units=metric&appid=" + APIKEY;
   //	options.path = "/data/2.5/weather?q=" + city.replace(/ /g,"+") + "&units=metric&APPID=" + APIKEY;
 console.log("can pass here")
} 

async function getWeatherDetails() {
	//let currTemp 
	//let maxTemp = 'N/A';
	//let minTemp = 'N/A';
  //  let letidity = 'N/A';
    //let lon ='N/A';
    //let lat ='N/A';
  //  let desc = 'N/A';

   const res = await fetch(`http://${options.host}/${options.path}`);
   const data = await res.json();
   
   currTemp = data.main.temp;
   maxTemp = data.main.temp_max;
   minTemp = data.main.temp_min;
   humidity = data.main.humidity;


   
   return({
      currTemp: currTemp,
      maxTemp: maxTemp,
      minTemp: minTemp,
      humidity: humidity,
  
   });
}
/* async function getMap(){
   const res = await fetch(`https://maps.googleapis.com/maps/api/js?key=AIzaSyC3WMBm1H4bIGRFOgRpSoWABmPbp3yn6Bw&callback=initMap`)
} */

app.use(cors());

//app.get('/',(req,res)=> res.render('index'));
//app.get('/',(req,res)=> res.render('index'));
 app.get('/', (req, res) =>  {
    //var city = req.query.city;
   var city = "Hong Kong"
    var title = "Home"
    console.log(`City: ${city}`);
    console.log("can pass here1")
    setOptionPath(city);
    getWeatherDetails().then(data => {
    	data.city = city.toUpperCase();
        //res.render('weather', data);
        res.render("index",data, title,city )

        //res.end.json(data);
        //console.log(data)
   })
   res.render("index" )
}  ) 

app.get("/user",(req,res)=> {
var b = 'ad';
res.render("user",{title:"Profile", userProfile: { nickname: "Eugene Ho" } })
}
)



/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "src/public")));


/*  app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
}); 
 */
