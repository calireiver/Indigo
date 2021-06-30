var mikeSurrounding = mike.style.bottom;

var jumpSound = new sound("jumpSound1.mp3")

document.addEventListener("keyup", function (e) {

    if (e.code === 'Space') {
        jump();
    }

    function jump()
    {
        console.log("you jumped");
        mikeSurrounding += 200;
        jumpSound.play();
        mike.style.bottom = mikeSurrounding + "px";
        mikeSurrounding -= 200;
        mike.style.bottom = mikeSurrounding + "px";
        mikeSurrounding=0;
    }
});
