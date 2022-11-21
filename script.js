//TODO
// make cursor styles into classes and switch between them with JS

// Custom cursor
var cursor = document.getElementById('cursor');
document.addEventListener('mousemove', function(e){
    var x = e.pageX;
    var y = e.pageY;
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
});

//Drag to scroll img
const slider = document.querySelector('.image-container');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", e => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
})  ;
slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
});
slider.addEventListener("mousemove", e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
});

// Click anywhere to close .seemore
const clickTarget = document.getElementById('label')
const checkbox = document.getElementById('lifestory')
const seemorebox = document.querySelector('.seemore')

document.addEventListener("click", (e) => {
    if (checkbox.checked && e.target.contains(seemorebox || clickTarget)) {
        checkbox.checked = false;
    }
})