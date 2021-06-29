/////////BACKGROUND MUSIC/////////////
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






//this variable turns on, on collision
var isColliding = false;
//bug speed
var speed = 0.5;

var score = 0;

var highscore = JSON.parse(localStorage.getItem("highscore"));
if (typeof(highscore) == "number") {
    //nothing
} else {
    highscore = 0;
}

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
    top: mike.getBoundingClientRect().top,
    bottom: mike.getBoundingClientRect().bottom,
};

//bugs colliders
var bugCollide = {
    right: bug.getBoundingClientRect().right,
    left: bug.getBoundingClientRect().left,
    top: bug.getBoundingClientRect().top,
    bottom: bug.getBoundingClientRect().bottom,
};


//Jump function is called when player presses space
var mikeJump = document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        jump();
    }
})

function jump()
{
    mike.animate({ top: "-=200px" }, "normal");
    mike.animate({ top: "+=200px" }, "normal");
}


//calls collisionCheck every 50 milliseconds
setInterval(collisionCheck, 50);

//calls bug move every millisecond
setInterval(bugMove, 1);

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
        top: bug.getBoundingClientRect().top,
        bottom: bug.getBoundingClientRect().bottom,
    };
    //when bug gets to end of game
    if (bugCollide.left <= gameEdge) {
        bug.remove();
    }
}

//checks if there is a collision
function collisionCheck() {
    if (bugCollide.left <= mikeCollide.right && bugCollide.right >= mikeCollide.left && bugCollide.top <= mikeCollide.bottom && bugCollide.bottom >= mikeCollide.top) {
        isColliding = true;
    } else {
        isColliding = false;
    }
    //call function endGame on collision
    if (isColliding == true) {
        endGame();
    }
}

//if you collide
function endGame() {
    console.log("You Died");
    //highscore
    if (score > highscore) {
    JSON.stringify(localStorage.setItem("highscore", score));
    highscore = JSON.parse(localStorage.getItem("highscore"));
    console.log(highscore);
    }
}