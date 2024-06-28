
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
$(".s-btn").click(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
 
  });
  $(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
            console.log("wrong");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);
            $("#level-title").text("Game Over, Press any key to restart");

            startOver();
        }
    
}
function nextSequence(){
    userClickedPattern = []
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 3)+1;
    var randomChosenColour = buttonColors[randomNumber] ; 
    gamePattern.push(randomChosenColour);
    var j = "#"+randomChosenColour;
    $(j).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);


}
function playSound(name){
    var audio_1 = new Audio("sounds/"+ name +".mp3")
    audio_1.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed")
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);

}
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
