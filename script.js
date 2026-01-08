// addMusic
let gameMusic = document.querySelector("#gameSound");
let clickMusic = document.querySelector("#clickSound");
let gameWinSound = document.querySelector("#gameWinSound");
let gameOverSound = document.querySelector("#gameOverSound");

// game elements access
let btn = document.querySelectorAll(".btn"); //game buttons
let gameDance = document.querySelector(".dance"); //danceing logo
let gameMuLogo = document.querySelector(".music"); //music  logo
let resetBtn = document.getElementById("resetGame"); //resetBtn
let newGameBtn = document.getElementById("newGame"); //newGameBtn
let gameText = document.querySelector("#gameResp"); //responce text
let boxes = document.querySelector(".boxes"); //left box
let mobLine = document.querySelector(".line"); //moving line
let info = document.querySelector(".gameInfo"); //win loose
let turnText = document.querySelector(".turn"); //turn text

//addMusicLogic
gameDance.addEventListener("click", () => {
  gameDance.classList.remove("bounce");
  gameDance.offsetWidth; //magic line
  gameDance.classList.add("bounce");
  toggleGameMusic();
});
gameMuLogo.addEventListener("click", () => {
  gameMuLogo.classList.remove("bounce");
  gameMuLogo.offsetWidth;
  gameMuLogo.classList.add("bounce");
  toggleGameMusic();
});

let toggleGameMusic = () => {
  clickMusic.currentTime = 0;
  clickMusic.play();
  if (gameMusic.paused) {
    gameMusic.play(); // yahin allowed hota hai
  } else {
    gameMusic.pause();
  }
};

//reset and new game btn sound
resetBtn.addEventListener("click", () => {
  clickMusic.currentTime = 0;
  clickMusic.play();
});
newGameBtn.addEventListener("click", () => {
  clickMusic.currentTime = 0;
  clickMusic.play();
});

//gameBtn sound
btn.forEach((box) => {
  box.addEventListener("click", () => {
    box.classList.remove("btnBounce");
    box.offsetWidth;
    box.classList.add("btnBounce");
    
    clickMusic.currentTime = 0;
    clickMusic.play();
  });
  box.addEventListener("animationend", (e) => {
    if(e.animatoinName === "spring02"){
      box.disabled = true;
    }
  })
});

//game logic declerations
let winningPatterns = [
  [0, 1, 2, 0, 10, 0],
  [3, 4, 5, 0, 30, 0],
  [6, 7, 8, 0, 50, 0],
  [0, 3, 6, 10, 0, 90],
  [1, 4, 7, 30, 0, 90],
  [2, 5, 8, 50, 0, 90],
  [0, 4, 8, 9, 9, 45],
  [2, 4, 6, 51, 9, 135],
];
let turnO = true;
let win = false;
let draw = false;

//game logic definaitons
for (let box of btn) {
  box.addEventListener("click", () => {
    if (turnO) {
      box.classList.remove("o-text");
      box.classList.add("x-text");

      box.innerText = "X";
      turnO = false;
      turnText.innerText = "O's turn";
    } else {
      box.classList.remove("x-text");
      box.classList.add("o-text");

      box.innerText = "O";
      turnO = true;
      turnText.innerText = "X's turn";
    }
    box.disabled = true;
    checkWinner();
    checkDraw();
  });
}

//functions
let checkWinner = () => {
  for (let pattern of winningPatterns) {
    let pos01 = btn[pattern[0]].innerText;
    let pos02 = btn[pattern[1]].innerText;
    let pos03 = btn[pattern[2]].innerText;

    if (pos01 != "" && pos02 != "" && pos03 != "") {
      if (pos01 === pos02 && pos02 === pos03) {
        mobLine.style.transform = `translate(${pattern[3]}vmin, ${pattern[4]}vmin) rotate(${pattern[5]}deg)`;
        mobLine.style.width = "100%";

        gameText.classList.remove("hide");
        gameText.innerText = `${pos01} win's 🎉`;
        gameText.classList.add("pop");

        gameWinSound.play();
        dissableBtn();
        toogleBtn();
        danceBtn();
        screenHandling();
        turnText.classList.add("hide");
        pos01 === "X"
          ? mobLine.classList.add("lineShadowBlue")
          : mobLine.classList.add("lineShadowRed");

        win = true;
        return;
      }
    }
  }
};

const dissableBtn = () => {
  for (let box of btn) {
    box.disabled = true;
  }
};

const toogleBtn = () => {
  resetBtn.classList.add("hide");
  newGameBtn.classList.add("pop");
  newGameBtn.classList.remove("hide");
};
const danceBtn = () => {
  gameDance.classList.remove("hide");
  gameDance.classList.add("pop");
  gameText.classList.add("pop");
  gameMuLogo.classList.add("hide");
};

//draw check
let checkDraw = () => {
  if (win) {
    return;
  }

  for (let box of btn) {
    if (box.innerText === "") {
      return;
    }
  }
  gameText.classList.remove("hide");
  gameText.innerText = `Draw😐`;
  gameText.classList.add("pop");
  gameMuLogo.classList.add("hide");
  gameDance.classList.remove("hide");
  gameDance.classList.add("pop");
  resetBtn.classList.add("hide");
  newGameBtn.classList.remove("hide");
  newGameBtn.classList.add("pop");
  turnText.classList.add("hide");
  gameOverSound.play();
  draw = true;
  screenHandling();
};

//container handel
let screenHandling = () => {};

//reset and newGame btn
resetBtn.addEventListener("click", () => {
  turnText.classList.remove("hide");
  turnText.innerText = "";
  turnO = true;
  win = false;
  draw = false;
  clearBtns();
  resetLine();
  btnBounce();
});

newGameBtn.addEventListener("click", () => {
  turnO = true;
  win = false;
  draw = false;

  clearBtns();
  resetLine();
  mobLine.classList.remove("lineShadowBlue");
  mobLine.classList.remove("lineShadowRed");
  turnText.classList.remove("hide");
  turnText.innerText = "";
  newGameBtn.classList.add("hide");
  resetBtn.classList.remove("hide");
  resetBtn.classList.add("pop");
  gameText.classList.add("hide");
  gameDance.classList.add("hide");
  gameMuLogo.classList.remove("hide");
  gameMuLogo.classList.add("pop");
});

let clearBtns = () => {
  for (let box of btn) {
    box.disabled = false;
    box.innerText = "";
  }
};

function resetLine() {
  mobLine.style.transition = "none"; //transition band
  mobLine.style.width = "0vmin";

  mobLine.offsetWidth; //magic line
  mobLine.style.transition = "width 1s ease-in-out";
}

//bounce function
let btnBounce = () => {
  resetBtn.classList.remove("bounce");
  resetBtn.offsetWidth;
  resetBtn.classList.add("bounce");
};

//Dark mode
let themeBtn = document.querySelector("#themeBtn");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  let mode = document.body.classList.contains("dark") ? "dark" : "light";

  localStorage.setItem("theme", mode);

  themeBtn.classList.remove("bounce");
  themeBtn.offsetWidth;
  themeBtn.classList.add("bounce");

  clickMusic.currentTime = 0;
  clickMusic.play();
});

