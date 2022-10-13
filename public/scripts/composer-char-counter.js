$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    let numOfLetters = $(this).val().length
    let remainingChar = (140 - numOfLetters)
    $bottomOfTweet = $("#counter")
    if (remainingChar < 0) {
      $($bottomOfTweet).css("color", "red")
    } else {
      $($bottomOfTweet).css("color", "black")
    }
    $bottomOfTweet.text(remainingChar)
  })
});


