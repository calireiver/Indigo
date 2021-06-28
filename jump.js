document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        jump();
    }
})

function jump()
{
    character.animate({ top: "-=200px" }, "normal");
    character.animate({ top: "+=200px" }, "normal");
}
