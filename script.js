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
let info = document.querySelector(".gameInfo"); //win loose

//addMusicLogic
gameDance.addEventListener("click", () => {
  if (gameMusic.paused) {
    gameMusic.play(); // yahin allowed hota hai
  } else {
    gameMusic.pause();
  }
});
gameMuLogo.addEventListener("click", () => {
  if (gameMusic.paused) {
    gameMusic.play(); // yahin allowed hota hai
  } else {
    gameMusic.pause();
  }
});
//reset and new game btn sound
resetBtn.addEventListener("click", () => {
  if (clickMusic.paused) {
    clickMusic.play(); // yahin allowed hota hai
  } else {
    clickMusic.pause();
  }
});
newGameBtn.addEventListener("click", () => {
  if (clickMusic.paused) {
    clickMusic.play(); // yahin allowed hota hai
  } else {
    clickMusic.pause();
  }
});
//gameBtn sound
btn.forEach((box) => {
  box.addEventListener("click", () => {
    clickMusic.play();
  });
});

//game logic declerations
let winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let turnO = true;
let win = false;
let draw = false;

//game logic definaitons
for (let box of btn) {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "X";
      box.style.color = "red";
      turnO = false;
    } else {
      box.innerText = "O";
      box.style.color = "blue";
      turnO = true;
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
        gameText.innerText = `${pos01} win's 🎉`;
        gameWinSound.play();
        dissableBtn();
        toogleBtn();
        danceBtn();
        win = true;
        screenHandling();
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
  for (let box of btn) {
    if (box.innerText === "") {
      return;
    }
  }
  gameText.innerText = `Draw😐`;
  gameText.classList.add("pop");
  gameMuLogo.classList.add("hide");
  gameDance.classList.remove("hide");
  gameDance.classList.add("pop");
  resetBtn.classList.add("hide");
  newGameBtn.classList.remove("hide");
  newGameBtn.classList.add("pop");
  gameOverSound.play();
  draw = true;
  screenHandling();
};

//reset and newGame btn
resetBtn.addEventListener("click", () => {
  turnO = true;
  clearBtns();
});
let clearBtns = () => {
  for (let box of btn) {
    box.disabled = false;
    box.innerText = "";
  }
};

newGameBtn.addEventListener("click", () => {
  turnO = true;
  clearBtns();
  newGameBtn.classList.add("hide");
  resetBtn.classList.remove("hide");
  resetBtn.classList.add("pop");
  gameText.classList.add("hide");
  gameDance.classList.add("hide");
  gameMuLogo.classList.remove("hide");
  gameMuLogo.classList.add("pop");
});

//media query
let screenHandling = () => {
  if (window.innerWidth <= 1024 && window.innerWidth >= 300) {
    if (win === true || draw === true) {
      boxes.classList.add("tempHide");
      info.classList.remove("tempHide");
      gameText.classList.remove("hide");
      gameText.classList.add("pop");
      gameDance.classList.add("pop");
      newGameBtn.classList.add("pop");
    }
  }

  newGameBtn.addEventListener("click", () => {
    info.classList.add("tempHide");
    boxes.classList.remove("tempHide");
    boxes.classList.add("pop");
  });
};
