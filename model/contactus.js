var connection = require("../config/connect");
module.exports.insert=function(obj,cb){
  connection.init(function(err,client){
    var db = client.db('test');
db.collection("contact_us").insert(obj,cb)
});
}