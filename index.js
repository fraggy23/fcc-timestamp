// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

let daysArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
let monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// api endpoint






app.get("/api/:date", (req, res) => {
  console.log(req.params.date.toString())
  let datum = new Date(isNaN(req.params.date)?req.params.date:req.params.date*1);
  if(datum.getTime()){
    console.log(datum);

    let day = daysArr[datum.getDay()];
    let date = datum.getDate()>9?datum.getDate():`0${datum.getDate()}`
    let month = monthArr[datum.getMonth()]
    let year = datum.getFullYear();
    let hours = datum.getHours()>9?datum.getHours():`0${datum.getHours()}`;
    let min = datum.getMinutes()>9?datum.getMinutes():`0${datum.getMinutes()}`;
    let sec = datum.getSeconds()>9?datum.getSeconds():`0${datum.getSeconds()}`;
    
    let timedate = `${day}, ${date} ${month} ${year} ${hours}:${min}:${sec} GMT`;
    res.json({"unix":datum.getTime(), "utc":timedate});
    console.log(timedate,"hello",day,hours,year)
  }else{
    res.json({error : "Invalid Date"})
  }

});



app.get("/api/", (req, res) => {
  let datum = new Date();
  let day = daysArr[datum.getDay()];
  let date = datum.getDate()>9?datum.getDate():`0${datum.getDate()}`
  let month = monthArr[datum.getMonth()]
  let year = datum.getFullYear();
  let hours = datum.getHours()>9?datum.getHours():`0${datum.getHours()}`;
  let min = datum.getMinutes()>9?datum.getMinutes():`0${datum.getMinutes()}`;
  let sec = datum.getSeconds()>9?datum.getSeconds():`0${datum.getSeconds()}`;
  let timedate = `${day}, ${date} ${month} ${year} ${hours}:${min}:${sec} GMT`;
  res.json({"unix":datum.getTime(), "utc": timedate});

});

