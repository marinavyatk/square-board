const board = document.querySelector("#board");
const SQUARES_NUMBER = 400;
const colors = ["white", "#c3c3c3", "#949494", "#575757", "#313131", "#f96137"];

for (let i = 0; i < SQUARES_NUMBER; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    board.appendChild(square);
    square.addEventListener("mouseover", () => setColor(square));
    square.addEventListener("mouseleave", () => removeColor(square));
}

function setColor(element) {
    const color = getRandomColor();
    element.style.backgroundColor = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
    element.classList.add('active')
}

function removeColor(element) {
    element.style.backgroundColor = "#1d1d1d";
    element.style.boxShadow = `0 0 2px #000`;
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

let arrayOfActiveSquares = []
let currElem = null

const toggleSelection = (activeSquare) => {
    arrayOfActiveSquares.push(activeSquare)
}

board.addEventListener("touchmove", (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (target && target.classList.contains("square") && !arrayOfActiveSquares.includes(target)) {
        currElem = target
        toggleSelection(currElem)
        setColor(currElem);
    }
    if (currElem !== arrayOfActiveSquares.at(0) && target.classList.contains("active") && arrayOfActiveSquares.length > 10) {
        removeColor(arrayOfActiveSquares.at(0));
        arrayOfActiveSquares.shift()
        }
});

board.addEventListener("touchend", (event) => {
    event.preventDefault();
    let time = 200;
    for (let i = 0; i < arrayOfActiveSquares.length; time += 100) {
        setTimeout(() => {
            removeColor(arrayOfActiveSquares.at(0))
            arrayOfActiveSquares.shift()
        }, time)
        i++;
    }
})

