var mikeSurrounding = mike.style.bottom;

document.addEventListener("keyup", function (e) {

    if (e.code === 'Space') {
        jump();
    }

    function jump()
    {
        console.log("you jumped");
        mikeSurrounding += 200;
        mike.style.bottom = mikeSurrounding + "px";
        mikeSurrounding -= 200;
        mike.style.bottom = mikeSurrounding + "px";
        mikeSurrounding=0;
    }
});
