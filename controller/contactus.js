var express=require("express");
var router=express.Router();
var contactus=require("../model/contactus");
var Mongodb = require('mongodb');
var nodemailer=require("nodemailer");
router.post('/addinfo',function(req,res)
{
    var information=req.body;
    console.log("req.body ........",information)
    contactus.insert(req.body,function(err,result)
    {
        if(err){
            res.status(400).json({status:0,err:"err"})
        }
        if(result){
            res.status(200).json({status:1,err:result.ops})
        }
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'manasvi111.kaplay@gmail.com',
              pass: '100Scholars'
            }
          });
          var mailOptions = {
            from: 'manasvi111.kaplay@gmail.com',
            to: 'manasvi111.kaplay@gmail.com',
            subject: 'New information',
            html:'<h2>Text:</h2><h3>'+req.body.text+'</h3>'
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });      
    });
    }); 
module.exports=router;