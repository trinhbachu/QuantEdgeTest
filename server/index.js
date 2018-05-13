const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
const http = require('http');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use('/api', require('./api/normal-request'));
app.get("*", (req, res)=>res.sendFile(path.join(__dirname, "../client/dist/index.html")));
const port = process.env.PORT || 3000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, ()=> console.log("Server is running"));
const io = require('./api/real-time-change')(server);
//init database
// const randomFloat = require('random-float');
// const randomInt = require('random-int');
// const mongoClient = require('mongodb').MongoClient;
// const connect = closure => mongoClient.connect('mongodb://localhost:27017/test', (err, db)=> err? console.log(err) : closure(db));
// var temp_arr= new Array();
// let dem= 0;
// var initData = (dem)=>{
//     let temp = new Object();
//     temp.code = "demo";
//     temp.company = "demo";
//     temp.price = randomFloat(0.01, 99.99).toFixed(2);
//     temp.volume = randomInt(1000, 1000000);
//     temp.value = Math.round(temp.price* temp.volume);
//     temp_arr.push(temp);
//     if(dem < 30) {
//         dem++;
//         initData(dem);
//     }
//     else {
//         connect(db => db.collection('test').insertMany(temp_arr, (err, result)=>{
//          err ? console.log(err) : console.log("Done!");
//         }))
//     }
// }
// initData(dem);
    

