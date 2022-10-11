$(document).ready(function () {
  let countInCorner = $('tweet')
  let textarea = $("#tweet-text")
  $("#tweet-text").on("input", function () {
    let numOfLetters = $(this).val().length
    let remainingChar = (140 - numOfLetters)
    let $bottomOfTweet = $(".buttonAndCounter").parent().find("#counter")
    if (remainingChar < 0) {
      $($bottomOfTweet).css("color", "red")
    }
    $bottomOfTweet.text(remainingChar)
  })
});


