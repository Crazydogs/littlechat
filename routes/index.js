
/*
 * GET home page.
 */

var Db = require('mongodb').Db;
var User = require('user');
var crypto = require('crypto');

module.exports = function(app){
	app.get('/',function(req,res){
		msg = req.session.message || null;
		req.session.message = null;
		if(req.session.user){
			res.render('index',{'message':msg});
		}else{
			res.redirect('/login');
		}
	});
	app.get('/login',function(req,res){
		msg = req.session.message || null;
		req.session.message = null;
		res.render('login',{'message':msg});
	});
	app.post('/login',function(req,res){
		var md5 = crypto.createHash('md5');
		var password = md5.update(req.body.password).digest('base64');

		User.get(req.body.username, function(err, user){
			if(err){
				console.log(err);
			}
			if(!user){
				req.session.message = "no such a user";
				res.redirect('/login');
			}else if( password != user.password ){
				req.session.message = "wrong password";
				res.redirect('/login');
			}else{
				req.session.user = user;
				req.session.message = "login success";
				res.redirect('/');
			}
		});
	});
	app.get('/reg',function(req,res){
		msg = req.session.message || null;
		req.session.message = null;
		res.render('reg',{'message':msg});
	});
	app.post('/reg',function(req,res){
		var md5 = crypto.createHash('md5');
		var password = md5.update(req.body.password).digest('base64');
		User.get(req.body.username, function(err, user){
			if(err){
				console.log(err);
			}
			if(user){
				req.session.message = "the name was used";
				res.redirect('/reg');
			}else{
				var user = new User({
					'name':req.body.username,
					'password':password
				});
				console.log(user.save);
				user.save(function(err){
					if(err){
						console.log(err);
						req.session.message = "faile to create new user, please try again.";
						res.redirect('/reg');
					}
					req.session.message = "regist success";
					req.session.user = user;
					res.redirect('/')
				});
			};
		});
	});
};
