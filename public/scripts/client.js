/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  //FORM SUBMIT HANDLER 

  const sanitize = function (str) { //safety check
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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

  const page = {
    tweetForm: $('.tweetForm'),
    errorMessage: $('#errorMessage'),
    tweetText: $('#tweet-text'),
    counter: $("#counter"),
    tweetContainer: $('.tweetContainer'),

    renderTweet: (tweet) => {
      let newTweet = createTweetElement(tweet)
      page.tweetContainer.prepend(newTweet)
    },

    renderTweets: (tweets) => {
      page.tweetContainer.empty() //prevents the existing tweets from being duplicated on page refresh
      for (let tweet of tweets) {
        page.renderTweet(tweet)
      }
    },

    loadAllTweets: () => {
      $.ajax("/tweets", { method: "GET" })
        .then(function (JSONResponse) { //JSONResponse is the server database
          page.renderTweets(JSONResponse) //renderTweets then calls the server database
        })
    },

    clearTweetInput: () => {
      page.tweetText.val("")
    },

    clearErrorMessage: () => {
      page.errorMessage.css("display", "none");
    },

    setErrorMessage: (message) => {
      if (message === "") {
        page.errorMessage.css("display", "none");
        return;
      }

      page.errorMessage.css("display", "block")
      page.errorMessage.html(message);
    },

    validateInput: (input) => {
      if (input === "") {
        page.setErrorMessage("Error! Please input text!")
        return false
      }
      if (input === null) {
        page.setErrorMessage("Error! Your tweet has an invalid value of null!")
        return false
      }
      if (input.length > 140) { //this is currently only alerting when tweet is submitted
        page.setErrorMessage("Error! Your character limit has been exceeded!")
        return false
      }

      return true
    },

    onFormSubmit: (event) => {
      event.preventDefault();
      page.setErrorMessage("")

      const input = page.tweetText.val()
      const sanitizedInput = `${sanitize(input)}`;
      const isInputValid = page.validateInput(sanitizedInput);

      if (!isInputValid) {
        return;
      }

      page.counter.val(140)

      $.ajax({
        beforeSend: function (req) { //prevents CORS error
          req.setRequestHeader("Access-Control-Allow-Origin", "*")
        },
        url: "/tweets",
        method: "POST",
        //looks through all tweet-texts in the html, only finds one cuz #, 
        //we use the index to grab that element, and then return .value
        data: { text: sanitizedInput },
        success: function (response) { //on a success
          page.clearTweetInput()
          page.renderTweet(response.tweet)
        }
      })


    },

    init: () => {
      page.tweetForm.submit(page.onFormSubmit); // bind submit
      page.loadAllTweets(); // load all tweets
    }
  }


  page.init()
})
