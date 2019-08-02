$(document).ready(function(){
	
	$(".favoriteIcon").on("click", function(){
		
		//alert($(this).prev().attr("src"));
		
		var imageURL = $(this).prev().attr("src");
		
		if ($(this).attr("src") == "img/fav_off.png"){
			$(this).attr("src","img/fav_on.png");
			updateFavorite("add", imageURL);
		}
		else {
			$(this).attr("src","img/fav_off.png");
			updateFavorite("delete", imageURL);
		}		
	});
	
	
	$(".keywordLink").on("click", function(){
		
		//alert($(this).text().trim());
		
		$.ajax({
			method: "get",
			url: "/api/displayFavorites",
			data: {"keyword" : $(this).text().trim(),
				},
			success: function(rows, status){
				
				$("#favorites").html("");
				rows.forEach(function(row){
					$("#favorites").append("<div class='imageContainer'>";
					$("#favorites").append("<img class='image' src='"+row.imageURL+"' width='200' height='200'/>");
					$("#favorites").append("<img class='favoriteIcon' src='img/fav_off.png' width='20'/></div>");
					
				})
			}
		});
	});
	
	
	function updateFavorite(action, imageURL){
		$.ajax({
			method: "get",
			url: "/api/updateFavorites",
			data: {"imageURL" : imageURL,
					"keyword" : $("#keyword").val(),
					"action" : action
				}
		});
	}
});