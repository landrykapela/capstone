const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//set CORS headers
app.use((req,res,next) =>{
	res.setHeader("Access-Control-Allow-Origin","*");
	res.setHeader("Access-Control-Allow-Headers","Origin, Accept, -Requested-With,Content, Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});

//handle json and urlencoded requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//export app as module
module.exports = app;