"use strict";

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;


$(document).keypress(function () {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});


$(".btn").click(function () {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  // if user answer = gamepattern --> continue
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    console.log("userClickedPattern[currentLevel] = " + userClickedPattern[currentLevel]);
    console.log("gamePattern[currentLevel] = " + gamePattern[currentLevel]);

    if (userClickedPattern.length === gamePattern.length) {
      // setTimeout(() => {
      //   nextSequence();
      // }, 1000);
      setTimeout(nextSequence, 1000);
    }

  } else {
    // else restart game
    console.log("wrong");
    console.log("userClickedPattern[currentLevel] = " + userClickedPattern[currentLevel]);
    console.log("gamePattern[currentLevel] = " + gamePattern[currentLevel]);
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
  
}

function nextSequence() {
  userClickedPattern = [];

  // Increase level
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Flash the element:
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  // $(element).delay(delayInMilliseconds).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play the sound    
  playSound(randomChosenColor);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

// $(document).on( "click", function(event) {
//     alert( "Handler for `keydown` called." );
//     var userChosenColor = event.target.id;
//     userClickedPattern.push(userChosenColor);
//   } );


// for (let index = 0; index < gamePattern.length; index++) {
//     const element = gamePattern[index];
//     var delayInMilliseconds = 1000; //1 second

//     // Add timeout
//     setTimeout(function() {
//     //your code to be executed after 1 second
//     }, delayInMilliseconds);
// }