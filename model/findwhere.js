var connection = require('../config/connect');
module.exports.findWhere=function(obj, cb){
	connection.init(function(err, client){
		var db = client.db('test');
		db.collection('userprofile').find(obj).toArray(cb);
	});
}


