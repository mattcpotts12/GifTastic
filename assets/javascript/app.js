var topics = ["Football", "Basketball", "Soccer", "Baseball"];


function displayTopicButtons() {
	$("#buttonDisplay").empty();
	for (var i = 0; i < topics.length; i++) {
		var topicButton = $("<button>");
		topicButton.addClass("btn btn-primary");
		topicButton.attr("id", "button" + i);
		topicButton.attr("data-name", topics[i]);
		topicButton.text(topics[i]);
		$("#buttonDisplay").append(topicButton);
	} // for loop
} // function displayGifTopics

displayTopicButtons();

function displayGifs() {
	$("#gifDisplay").empty();
	var name = $(this).attr("data-name");
	console.log("name: " + name);

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC&limit=10";
	console.log("URL: " + queryURL);

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		var results = response.data;	
		console.log(results);

		for (var i = 0; i < results.length; i++) {
			var gifContainer = $("<div class='gifbox'>");

			var rating = results[i].rating;
			var header = $("<h2>").html("Rating: " + rating);


			var image = $("<img>");
			image.attr({
				"data-animate": results[i].images.fixed_height.url,
				"data-still": results[i].images.fixed_height_still.url,
				"src": results[i].images.fixed_height_still.url,
				"data-state": "still",
				"id": "gif"
			})
			
			gifContainer.append(image);
			gifContainer.append(header);
			$("#gifDisplay").prepend(gifContainer);
		}
	})
}



$("#gifSearch").on("click", function(event) {
	event.preventDefault();
	var newTopic = $("#gifInput").val().trim();
	topics.push(newTopic);
	displayTopicButtons();
})


$(document).on("click", ".btn", displayGifs);



$(document).on("click", "#gif", function() {
	var state = $(this).attr("data-state");
	if (state == "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");		
	}

})



