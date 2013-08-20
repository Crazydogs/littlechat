
/*
 * GET home page.
 */

var Db = require('mongodb').Db;

module.exports = function(app){
	app.get('/',function(req,res){
		res.render('index');
	});
	app.get('/login',function(req,res){
		res.render('login');
	});
	app.post('/login',function(req,res){
		var username = req.body.username;
		var password = req.body.password;
	})
};
