var express=require("express");
var router=express.Router();
var connection=require('../config/connect')
var fW=require("../model/findwhere")
router.get('/',function(req,res){
    console.log("registration page")
    var pagedata={
      "pagename":"registration",
      "title":"Create new account"
    }
      res.render("layout",pagedata)
  
  })    
router.post('/registration',function(req,res){
    console.log("/registration found!")
    var pagedata={
      "pagename":"success",
      "title":"Account created"
    }
    
    connection.init(function(err,client){
      if(err){
        console.log("error in router.post('/success')")
        throw err
      }
      var db=client.db('test');
      var firstname=req.body.firstname;
      var lastname=req.body.lastname;
      var address=req.body.address;
      var city=req.body.city;
      var mobileno=req.body.mobileno;
      var gender=req.body.gender;
      var hobbies=req.body.hobbies;
      var email=req.body.email;
      var pass=req.body.pass;
      var cpass=req.body.cpass;
      var data={
        "firstname":firstname,
        "lastname":lastname,
        "address":address,
        "city":city,
        "mobileno":mobileno,
        "gender":gender,
        "hobbies":hobbies,
        "email":email,
        "pass":pass,
        "cpass":cpass
      }
      fW.findWhere({email:email},function(err,result){
        console.log("result.length  :"+result.length)
        if(result.length==0){
      db.collection('userprofile').insertOne(data,function(err,result){
        if(err)
        throw(err)
        console.log("Record inserted successfully!")
      })
      res.render("layout",pagedata)
    }
    else{
      res.end("Entered email id already exists!!")
    }
    })
  })
  })
module.exports=router;