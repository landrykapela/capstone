const express = require('express');
const bodyParser = require('body-parser');
const db = require('mysql');
const connection = require('./database/connection');

const app = express();

//initiate connection to mysql database
const con = connection.connect();
connection.createTable(con,{tableName: "user",fields:[{name:"email",type: "varchar",field_size: 255,required: true, unique: true},{name:"role",type: "int",field_size:10,required: true,default:0},{name: "password",type: "varchar",field_size: 255,required: true},{name: "lastLoggedInAt",type: "timestamp"}]});

connection.findSingleRecord(con,{conditions:[{variable:"email",operation: "=",value:"email@domain.com"}]},"user");
connection.insertSingleRecord(con,"user", {email:"email@domain.com", role:0, password:"complicated password"});
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