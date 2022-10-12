/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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
          <p>${tweetObject.created_at}</p>
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
    let tweetElements = []
    for (let tweet of tweets) {
      let newTweet = createTweetElement(tweet)
      tweetElements.push(newTweet)
    }
    $(".tweetContainer").append(...tweetElements)
  }

  renderTweets(data)
})
