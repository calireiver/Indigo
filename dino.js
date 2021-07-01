/////////BACKGROUND MUSIC///////////
var lastSong = null;
    var selection = null;
    var playlist = ["Background Music 1.mp3", "Background Music 2.mp3", "Background Music 3.mp3", "Background Music 4.mp3"]; // List of songs
    var player = document.getElementById("audioplayer"); // Get audio element
    player.autoplay=true;
    player.addEventListener("ended", selectRandom); // Run function when the song ends

    function selectRandom(){
        while(selection == lastSong){ // Repeat until a different song is selected
            selection = Math.floor(Math.random() * playlist.length);
        }
        lastSong = selection; // Remember the last song
        player.src = playlist[selection]; // Tell HTML the location of the new song
    }

    selectRandom(); // Select initial song
    player.play(); // Start song
/////////////////////////////////////////

/////////////////TIMER/////////////
var timeElapsed = 0;
var myTimer = setInterval(function(){
    timeElapsed += 1;
    document.getElementById("timer").innerText = timeElapsed;
    score = timeElapsed;
}, 1000);


///////////////////////////////






//this variable turns on, on collision
var isColliding = false;
//bug speed
var startSpeed = 0.5;
var speed = startSpeed;

var score = 0;

var bugCount = 0;

var setHeight = false;

var gameOver = false;

var highscore = JSON.parse(localStorage.getItem("highscore"));
if (typeof(highscore) == "number") {
    //nothing
} else {
    highscore = 0;
}
document.getElementById("highscore").innerHTML = highscore;

console.log(highscore);

//DOM CAlls
var mike = document.getElementById("Mike");
var bug = document.getElementById("bug");
var gameDiv = document.getElementById("gameDiv");

//figures out where to kill bug
var gameEdge = gameDiv.getBoundingClientRect().left;

//changes the bugs location/moving the bug
var bugLocation = bug.style.left;

//mikes colliders
var mikeCollide = {
    right: mike.getBoundingClientRect().right,
    left: mike.getBoundingClientRect().left,
};

//bugs colliders
var bugCollide = {
    right: bug.getBoundingClientRect().right,
    left: bug.getBoundingClientRect().left,
};


//Jump function is called when player presses space
var mikeJump = document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        jump();
        console.log("hello");
    }
})

var isJumping = false;

function jump()
{
    if (gameOver == false) {
        if (isJumping == false) {
            if (setHeight == true) {
                return;
            } else {
                isJumping = true;
                $("#Mike").animate({ marginTop: "-=150px" }, "slow");
                    setTimeout(function () {
                        if (setHeight == true) {
                            return;
                        }
                    $("#Mike").animate({ marginTop: "+=150px" }, "slow");
                    }, 500);
                }
                setTimeout(function () {
                    isJumping = false;
                }, 1100);
            }
        }   
    }


//calls collisionCheck every 50 milliseconds
setInterval(collisionCheck, 50);

//calls bug move every millisecond
var bugTime = setInterval(bugMove, 1);

//this make the bug move
function bugMove() {
    //changes bug location to slightly to the left
    bugLocation -= speed;
    //updates location on screen
    bug.style.left = bugLocation + "px";
    //updates bug colliders
    bugCollide = {
        left: bug.getBoundingClientRect().left,
        right: bug.getBoundingClientRect().right,
    };
    //when bug gets to end of game
    if (bugCollide.left <= gameEdge) {
        bug.remove();
        addBug();
    }
}

var mySound = new Audio("Game Over 2.mp3")

//checks if there is a collision
function collisionCheck() {
    if (bugCollide.left <= mikeCollide.right && bugCollide.right >= mikeCollide.left && isJumping == false) {
        isColliding = true;
    } else {
        isColliding = false;
    }
    //call function reset on collision
    if (isColliding == true) {
        mySound.play();
        clearInterval(myTimer);
        clearInterval(bugTime);
        gameOver = true;
        document.getElementById("restartDiv").style.display = "block";
    }
}

function addBug() {
    speed += 0.02;
    bugCount++;
    var x = "<div class='bug' id='bug'></div>";
    gameDiv.innerHTML += x;
    console.log(bug);
    bugCollide = {
        left: bug.getBoundingClientRect().left,
        right: bug.getBoundingClientRect().right,
    };
    bug = document.getElementById("bug");
    //bug.style.left = (-1 * bugLocation) + "px";
    bugLocation = 0;
    setHeight = true;
    $("#Mike").animate({ marginTop: "200px" }, "slow", function() {
        setHeight = false;
    });
    var bugChoice = 1 + (Math.floor(Math.random() * 5));
    console.log(bugChoice);
    bug.style.backgroundImage = "url(bug" + bugChoice + ".png)";
}

//if you collide
function reset() {
    console.log("You Died");
    //highscore
    if (score > highscore) {
        JSON.stringify(localStorage.setItem("highscore", score));
        highscore = JSON.parse(localStorage.getItem("highscore"));
        document.getElementById("highscore").innerHTML = highscore;
    }
    score = 0;
    speed = startSpeed;
    bug.remove();
    location.reload();
}

