$(document).ready(function() {
    $("#form-gif-request").submit(fetchAndDisplayGif);
});

function fetchAndDisplayGif(event) {
    event.preventDefault();

    var captcha = $("#verify").val();
    if (captcha != 5) {
      setGifLoadedStatus(false);
      $("#verify-form").attr("class", "forms has-error");
      $("#verify-error").attr("hidden", false).attr("class", "text-danger");
      $("#verify-button").attr("class", "input-group-addon text-danger");
      $("#verify-error").text("No gifs for you.");
      return false;
    }
    else {
      $("#verify-error").attr("hidden", true);
      $("#verify-button").attr("class", "input-group-addon");
      $("#verify-form").attr("class", "forms");
    }

    var searchQuery = $("#tag").val();

    var params = {
        api_key: "dc6zaTOxFJmzC",
        tag : "jackson 5 " + searchQuery
    };

    $.ajax({
        url: "https://api.giphy.com/v1/gifs/random",
        data: params,
        success: function(response) {

            console.log("we received a response!");
            console.log(response);

            $("#gif").attr("src", response.data.image_url);
            setGifLoadedStatus(true);
        },
        error: function() {

            $("#feedback").text("Sorry, could not load GIF. Try again!");
            setGifLoadedStatus(false);
        }
    });

    setGifLoadedStatus(false);
    $("#feedback").text("Loading...");

}

function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}
