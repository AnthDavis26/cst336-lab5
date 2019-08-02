const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

const request = require("request");
const mysql = require("mysql");
const tools = require("./tools.js");

// Routes

// Root
app.get("/", async function(req, res) {	
	var imageURLs = await tools.getRandomImages("", 1);
	//console.log("imageURLs using Promises: " + imageURLs);
	res.render("index", {"imageURLs":imageURLs});
	
}); // root route

app.get("/search", async function(req, res){
	//console.dir(req);
	//console.log(req.query.keyword);
	var keyword = req.query.keyword;
	
	var imageURLs = await tools.getRandomImages(keyword, 9);
	console.log("imageURLs using Promises: " + imageURLs);
	res.render("results", {"imageURLs":imageURLs, "keyword":keyword});
	
	//getRandomImages_cb( function () {
	//	console.log("imageURLs: " + imageURLs);
	//	res.render("results", {"imageURLs":imageURLs});
	//});
	
}); // search

app.get("/api/updateFavorites", function(req, res) {
	
	var conn = tools.createConnection();
	
	var sql;
	var sqlParams;
	
	
	if (req.query.action == "add") {
		sql = "INSERT INTO favorites (imageURL, keyword) VALUES (?,?)";
		sqlParams = [req.query.imageURL, req.query.keyword];
	}
	else {
		sql = "DELETE FROM favorites WHERE imageURL = ?";
		sqlParams = [req.query.imageURL];
	}
	
	
	conn.connect( function (err) {
		if (err) throw err;
		
		conn.query(sql, sqlParams, function(err, result){
			if (err) throw err;
		}); // query
			
	}); // connect
	
});


app.get("/displayKeywords", async function(req, res){
	var imageURLs = await tools.getRandomImages("", 1);
	var conn = tools.createConnection();
	var sql = "SELECT DISTINCT keyword FROM favorites ORDER BY keyword";
	
	conn.connect(function(err){
		if (err) throw err;
		conn.query(sql, function(err, result){
			if (err) throw err;
			res.render("favorites", {"rows": result, "imageURLs":imageURLs})
		});
	});
});


app.get("/api/displayFavorites", function(req, res){
	var conn = tools.createConnection();
	var sql = "SELECT imageURL FROM favorites WHERE keyword = ?";
	var sqlParams = [req.query.keyword];
	
	conn.connect(function(err){
		if (err) throw err;
		conn.query(sql, sqlParams, function(err, results){
			if (err) throw err;
			res.send(results);
		});
	});
	
});// displayFavorites


// Heroku server listener
app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Running Express Server..")
});


// server listener
//app.listen("8081", "0.0.0.0", function(){
//	console.log("Express Server running...")
//});

