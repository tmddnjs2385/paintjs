const canvas = document.getElementById("jsCanvas");

const ctx = canvas.getContext("2d");

const colors = document.getElementsByClassName("jsColor");

const range = document.getElementById("jsRange");

const saveBtn = document.getElementById("jsSave");



canvas.width = 700;

canvas.height = 700;

ctx.strokeStyle = "#2c2c2c"

ctx.lineWidth = 2.5;

let painting = false;

let filling = false;

const mode = document.getElementById("jsMode");

function stopPainting() {

    painting = false;

}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {

    const x = event.offsetX;

    const y = event.offsetY;

    // console.log(x, y);

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event) {

    painting = true;

}

function onMouseUp(event) {
    stopPainting();

}

// function onMouseLeave(event){
//     painting=false;
// }

if (canvas) {

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("contextmenu", handleCM);
    canvas.addEventListener("touchstart", startPainting);
    canvas.addEventListener("touchmove", startPainting);
    canvas.addEventListener("touchend", stopPainting);




}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;


}

function handleRangeChange(event) {

    // console.log(event);

    const size = event.target.value;

    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {

        filling = false;

        mode.innerText = "Fill";
    } else {

        filling = true;

        mode.innerText = "Paint";
    }
}


function handleFillChange(event) {

    if (filling) {
        canvas.style.backgroundColor = event.target.style.backgroundColor;
    } else {
        const color = event.target.style.backgroundColor;
        ctx.strokeStyle = color;
    }



}

function handleCM(event) {

    event.preventDefault();

}

function handleSaveClick(event) {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[?]";
    link.click();

}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleFillChange)
);


if (range) {

    range.addEventListener("input", handleRangeChange);

}


if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick)
}


