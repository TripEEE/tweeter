/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  //FORM SUBMIT HANDLER 

  const escape = function (str) { //safety check
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  $(".tweetForm").submit(function (event) {
    event.preventDefault()

    $("#errorMessage").css("display", "none")

    const formBody = $('#tweet-text').val()
    const safeHTML = `${escape(formBody)}`;

    if (safeHTML === "") {
      $("#errorMessage").css("display", "block")
      $("#errorMessage").html("Error! Please input text!")
      return
    }
    if (safeHTML === null) {
      $("#errorMessage").css("display", "block")
      $("#errorMessage").html("Error! Your tweet has an invalid value of null!")
      return
    }
    if (safeHTML.length > 140) { //this is currently only alerting when tweet is submitted
      $("#errorMessage").css("display", "block")
      $("#errorMessage").html("Error! Your character limit has been exceeded!")
      return
    }

    $.ajax({
      beforeSend: function (req) { //prevents CORS error
        req.setRequestHeader("Access-Control-Allow-Origin", "*")
      },
      url: "/tweets",
      method: "POST",
      //looks through all tweet-texts in the html, only finds one cuz #, 
      //we use the index to grab that element, and then return .value
      data: { text: safeHTML },
      success: function (response) { //on a success
        console.log(response)
        $('#tweet-text').val("") //resets the textarea to ""
        // loadAllTweets() //loads existing tweets so no refresh is necessary
        let newTweet = createTweetElement(response.tweet)
        $(".tweetContainer").prepend(newTweet)
      }
    })

    $("#counter").val(140) //resets counter

    return false
  })

  const createTweetElement = function (tweetObject) {
    //use jquery to attach the values from tweetData into the elements on the HTML page.
    const $newTweet =
      `<article class="articleContainer">
        <header class="articleHeader">
          <div class="articleFirstName">
            <img src=${tweetObject.user.avatars}>
            <p>${tweetObject.user.name}</p>
          </div>
          <p class="articleUsername">${tweetObject.user.handle}</p>
        </header>
        <h6>${tweetObject.content.text}</h6>
        <footer class="articleFooter">
          <p>${timeago.format(tweetObject.created_at)}</p>
          <ul>
            <li><i class="fa-solid fa-flag"></i></li>
            <li><i class="fa-sharp fa-solid fa-retweet"></i></li>
            <li><i class="fa-solid fa-heart"></i></li>
          </ul>
        </footer>
      </article>`

    return $newTweet
  }

  const renderTweets = function (tweets) {
    $(".tweetContainer").empty() //prevents the existing tweets from being duplicated on page refresh
    for (let tweet of tweets) {
      let newTweet = createTweetElement(tweet)
      $(".tweetContainer").prepend(newTweet)
    }
  }

  const loadAllTweets = function () {
    $.ajax("/tweets", { method: "GET" })
      .then(function (JSONResponse) { //JSONResponse is the server database
        renderTweets(JSONResponse) //renderTweets then calls the server database
      })
  }

  loadAllTweets()
})
