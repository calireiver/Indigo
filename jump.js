document.addEventListener('keyup', event => {
    if (event.key === 'Space') {
        jump();
    }
})

function jump()
{
    character.animate({ top: "+=50px" }, "normal");
    character.animate({ top: "+=50px" }, "normal");
}