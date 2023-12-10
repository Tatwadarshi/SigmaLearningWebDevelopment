boxes = document.getElementsByClassName("box");
let r;
let g;
let b;
for (let i = 0; i < boxes.length; i++) {
    const element = boxes[i];
    r = Math.round(Math.random() * 255);
    g = Math.round(Math.random() * 255);
    b = Math.round(Math.random() * 255);
    element.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}