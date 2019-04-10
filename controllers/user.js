const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/connection');
const bodyParser = require('body-parser');

exports.signup = (req,res,next)=>{
  let email = req.body.email;
  let password = req.body.password;

  bcrypt.hash(password,12)
  .then((hashedPassword)=>{
    let con = db.connect();
    let timestamp = new Date().getTime();
    db.insertSingleRecord(con,"user",{email:email,role:0,password:hashedPassword,createdAt:timestamp})
    .then((result)=>{
      console.log("Operation successful");
      res.status(201).json({result});
    })
    .catch((error)=>{
      console.error(error);
      res.status(400).json({error:error});
    });
  })
  .catch((error)=>{
    console.error(error);
    res.status(400).json({error:error});
  });
}

exports.login = (req,res,next)=>{
  // req.body.email = JSON.parse(req.body.email);
  let email = req.body.email;
  
  let password = req.body.password;
  let conditions = [{variable:"email",operation:"=",value:email}];
  let con = db.connect();
  db.findSingleRecord(con,"user",conditions)
  .then((record)=>{
    let userJsonString = JSON.stringify(record[0]);
    let userJsonObject = JSON.parse(userJsonString);
    let user = new User(userJsonObject);
    bcrypt.compare(password,user.password)
    .then((verified)=>{
      if(verified){
        const token = jwt.sign({userId:user._id},'secret_random',{expiresIn:'24'});
        console.log("user token: "+token);
        let result = {userId:user._id,token:token};
        // res.redirect('/pan')
        res.status(200).json({result:result});
      }
      else{
        let err = "Incorrect password";
        console.log(err);
        res.status(400).json({error:err});
      }
    })
    .catch((error)=>{
      console.error(error);
      let err = "Incorrect password";
      res.status(400).json({error:err});
    });
  })
  .catch((error)=>{
    console.error(error);
    let err = "User does not exist!";
    res.status(400).json({error:err});
  })
}
exports.updateUser = (req,res,next) =>{
  let con = db.connect();
  let data = {role:1,lastLoggedInAt:new Date().getTime()};
  let conditions = [{variable:"id",operation:"=",value:req.params.id},{variable:"email",operation:"=",required:true,value:"'"+req.body.email+"'"}];
  db.updateRecord(con,"user",data,conditions)
  .then((result)=>{
    console.log(result);
    res.status(201).json({result});
  })
  .catch((error)=>{
    console.error(error);
    let err = "Could not update user records!";
    res.status(400).json({error:err});
  })
}

exports.getUsers = (req,res,next) =>{
  // let con = db.connect();
  // db.createTable(con,{tableName: "user",fields:[{name:"email",type: "varchar",field_size: 255,required: true, unique: true},{name:"role",type: "int",field_size:1,required: true,default:0},{name: "password",type: "varchar",field_size: 255,required: true},{name: "lastLoggedInAt",type: "bigint",},{name:"createdAt",type:"bigint"}]});
  //
  // res.status(200).json({result:"All is ok"});
}
