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
				
				$("#favoritesArea").html("");
				rows.forEach(function(row){
					$("#favoritesArea").append("<img class='image' src='"+row.imageURL+"' width='200' height='200'/>");
					$("#favoritesArea").append("<img class='favoriteIcon' src='img/fav_on.png' width='20'/>");
				})
				
				$(".favoriteIcon").on("click", function(){
					var imageURL = $(this).prev().attr("src");
					
					if ($(this).attr("src") == "img/fav_off.png"){
						$(this).attr("src","img/fav_on.png");
						updateFavorite("add", imageURL);
					}
					else {
						$(this).attr("src","img/fav_off.png");
						updateFavorite("delete", imageURL);
					}		
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