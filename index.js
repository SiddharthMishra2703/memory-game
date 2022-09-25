var finalGamePattern = [];
var user2Clicks = [];
var userChoosenCard;
var success = 0;
var moves = 0;
var turnedCards = {};
var seconds = 0;
var minutes = 0;
var myInterval;


//hidden part
$(".container").hide();
$("h3").hide();



$(".card").click(function(){
    var id = $(this).attr("id");
    userChoosenCard = parseInt(id.slice(5,id.length));
    if(turnedCards[userChoosenCard] != true){
        $("#card-" + (userChoosenCard)).html('<img src="img/img' + finalGamePattern[userChoosenCard-1] + '.png">').addClass("flip");
        user2Clicks.push(userChoosenCard);
        flipConditions();
        information();
    }
});


$("#start-button").click(function(){
    patternCreator();
    $("#start-button").hide();
    $("h1").hide();
    $(".container").show();
    moves = 0;
    $("#moves-count").text(moves);
    $("h3").hide();
    timer();
});


$("#stop-button").click(function(){
    $(".container").hide();
    $("#start-button").show();
    $("h1").show();
    resetGame();
});



function flipConditions(){
    if(user2Clicks[0] == user2Clicks[1]){
        user2Clicks.pop();
        moves--;
    }
    if(checkAnswer() === false){
        if(user2Clicks.length === 3){
            unFlipAnimation(user2Clicks);
            temp = user2Clicks[2];
            user2Clicks = [];
            user2Clicks[0] = temp;
        }
        if(user2Clicks.length === 2){
            setTimeout(function(){
                unFlipAnimation(user2Clicks);
                user2Clicks.splice(0,2);
            }, 1000);
        }
        $("#card-" + (userChoosenCard)).fadeIn(100).fadeOut(100).fadeIn(100);
    }
}


function patternCreator(){
    while(finalGamePattern.length < 16){
        var r = Math.floor(Math.random() * 16) + 1;
        if(finalGamePattern.indexOf(r) === -1) {
            finalGamePattern.push(r);
        }
    }
    for(var i=0; i<16; i++)
    {
        if(finalGamePattern[i]>8)
            finalGamePattern[i]-=8;
    }
}



function unFlipAnimation(user2Clicks){
    $("#card-" + (user2Clicks[0])).text("?").removeClass("flip");
    $("#card-" + (user2Clicks[1])).text("?").removeClass("flip");
}


function checkAnswer(){
    if(finalGamePattern[user2Clicks[0]-1] === finalGamePattern[user2Clicks[1]-1]){
        turnedCards[ user2Clicks[0]] = true;
        turnedCards[ user2Clicks[1]] = true;
        user2Clicks.splice(0,2);
        success++;
        if(success == 8){
            gameOver();
        }
        return true;  
    }
    else{
        return false;
    }
}

function resetGame(){
    finalGamePattern = [];
    user2Clicks = [];
    clearInterval(myInterval);
    success = 0;
    seconds = 0;
    minutes = 0; 
    turnedCards = {};
    $(".card").text("?").removeClass("flip");
}

function gameOver(){
    $(".container").hide();
    $("#start-button").show();
    $("h1").show();
    $("h1").text("You Won");
    $("#total-moves").text(moves);
    resetGame();
    $("h3").show();
}

function information(){
    moves++;
    $("#moves-count").text(moves);
}


function timer() {
    myInterval = setInterval(function () {
        seconds++;
        if(seconds === 61){
            seconds = 1;
            minutes++;
        }
        $("#timer-count").text(pad(minutes) + ":" + pad(seconds))
    }, 1000);
}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}