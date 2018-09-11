var topics = ["tim and eric", "snl", "it's always sunny in philadelphia", "the office", "curb your enthusiasm", "south park", "party down", "arrested development", "cops", "to catch a predator"]

var newShow;

function renderGifs() {
    var show = $(this).attr("value");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        show + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var showDiv = $("<div>")

            var p = $("<p>").text("Rating: " + results[i].rating)

            var showImage = $('<img>')

            showImage.addClass('gifImage')

            showImage.attr({
                src: results[i].images.original_still.url,
                dataState: "still",
                dataStill: results[i].images.original_still.url,
                dataAnimate: results[i].images.original.url,

            });

            showDiv.append(p).append(showImage)

            $('#gifsView').prepend(showDiv)

        }

    });
};


// Function for displaying movie data
function renderButtons() {
    $("#buttonsView").empty();
    for (var i = 0; i < topics.length; i++) {
        $('<input>').attr({
            value: topics[i],
            type: "submit"
        }).addClass("shows").appendTo($("#buttonsView"))
    }
}

// This function handles events where one button is clicked
$("#add-show").on("click", function (event) {
    event.preventDefault();

    newShow = $("#show-input").val().trim();
    topics.push(newShow);

    renderButtons();
});


function playPause() {

    var state = $(this).attr("dataState")

    if (state === "still") {
        var animateSRC = $(this).attr("dataAnimate")
        $(this).attr("src", animateSRC)
        $(this).attr("dataState", "animate")
    } else {
        var stillSRC = $(this).attr("dataStill")
        $(this).attr("src", stillSRC)
        $(this).attr("dataState", "still")
    }
};

$(document).on("click", ".shows", renderGifs);
$(document).on("click", ".gifImage", playPause);

renderButtons();