const request = require("request");
const mysql = require("mysql");

module.exports = {

	getRandomImages: function(keyword, imageCount){
		var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count=" + imageCount + "&client_id=3d57cf80200b191d9d50c36a0a1bccd61dbeb31aafa1510f87e264666960caab"
		
		return new Promise( function(resolve, reject) {
			request(requestURL, function (error, response, body) {
		//		console.log("error:", error);
		//		console.log("statusCode:", response && response.statusCode);
		//		console.log("body:", body);
				if (!error){
					var parsedData = JSON.parse(body);
					var imageURLs = [];
					
					for (let i = 0; i < imageCount; i++){
						imageURLs.push( parsedData[i].urls.regular );
					}
					//console.log(imageURLs);
					resolve(imageURLs);
					
				} else {
					console.log("error", error);
				}
			}); // request
		}); // promise
	},


	/**
	* Return random image URLs from an API
	* @param string	keyword - search term
	* @param int	imageCount - number of random images
	* @return array of image URLs
	*/
	getRandomImages_cb: function (keyword, imageCount, callback){
		var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count=" + imageCount + "&client_id=3d57cf80200b191d9d50c36a0a1bccd61dbeb31aafa1510f87e264666960caab"
		
		request(requestURL, function (error, response, body) {
	//		console.log("error:", error);
	//		console.log("statusCode:", response && response.statusCode);
	//		console.log("body:", body);

			if (!error){
				var parsedData = JSON.parse(body);
				var imageURLs = [];
				
				for (let i = 0; i < imageCount; i++){
					imageURLs.push( parsedData[i].urls.regular );
				}
				//console.log(imageURLs);
				
				callback(imageURLs);
			} else {
				console.log("error", error);
			}
		}); // request
	},


	/**
	* creates database connection
	* @return db connection
	*/
	createConnection: function (){
		var conn = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "unoDIZ900$m",
			database: "img_gallery"
		});
		
		return conn;
	}

} // end export brace