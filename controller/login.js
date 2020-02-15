var express=require("express");
var router=express.Router();
var connection=require('../config/connect');
router.get('/', function(req, res) {
  var pagedata={
    "pagename":"login",
    "title":"login page"
  }
    res.render("layout",pagedata)
});
router.post('/submit',function(req,res){
  var pagedata={
    "pagename":"submit",
    "title":"submit"
  }
    console.log(req.body)
  connection.init(function(err, client){
    var db = client.db('test');
    var email=req.body.email;
    var pass=req.body.pass;
    db.collection('userprofile').find({ $or: [ { email:email }, { mobileno:email } ] }).toArray(function(err,user){
      //db.collection('userprofile').findOne({ email:email},{mobileno:mobileno}, function(err, user) {
        console.log(user[0])
          if(err){
            console.log("error")
            res.status(400).json({status:1,err:err})
          }
      if(user ===null){
        res.redirect('/')
      }else if (user[0].pass==req.body.pass){
            console.log("successful login!")
            var data=user[0];
            req.session.userid = data._id;
				req.session.email = data.email;
				req.session.is_user_logged_in=true;
         res.render("layout",pagedata);
       } else {
         console.log("incorrect password")
         res.send("Invalid username or password!!")
       }
});
});
});
module.exports=router;