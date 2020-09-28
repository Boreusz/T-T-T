const Player = (name) => {
    let score = 0;
    let userName = name;
    const changeName = (name) => {
        userName = name;
    }
    const getName = () => userName;
    const getScore = () => score;
    const win = (id) => {
        score++;
        document.getElementById(id).innerHTML = `${score}`
    }
    const resetGame = (id) => {
        score = 0;
        document.getElementById(id).innerHTML = `${score}`
    }
    return {
        getName,
        changeName,
        getScore,
        win,
        resetGame
    }
};
const playerOne = Player('Player1');
const playerTwo = Player('Player2')

const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    let lastMove = "O";
    let count = 0;
    const getBoard = () => board;
    const getlastMove = () => lastMove;
    const getMovesCount = () => count;
    const makeMove = (id, choice) => {
        document.getElementById(id).innerHTML = `<span>${choice}</span>`;
        board[id] = choice;
        lastMove = choice;
        count++;
    }
    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        for(let i = 0; i < board.length; i++){
            document.getElementById(i).innerHTML = "";
            document.getElementById(i).classList.remove("taken")
            count = 0;
            lastMove = "O"
        }
    }

    return {
        getBoard,
        getlastMove,
        getMovesCount,
        makeMove,
        resetBoard
    };
})();

const GameController = (() => {
    const action = (event) =>{
        if(Gameboard.getlastMove() == 'O'){
            Gameboard.makeMove(event.target.id, "X");
            event.target.classList.add("taken");
        }else{
            Gameboard.makeMove(event.target.id, "O")
            event.target.classList.add("taken");
        }
        resultchecker();
}
const resultchecker = () => {
    let helper = Gameboard.getBoard();
        if((helper[0] == "X" && helper[1] == "X" && helper[2] == "X") ||
        (helper[3] == "X" && helper[4] == "X" && helper[5] == "X") ||
        (helper[6] == "X" && helper[7] == "X" && helper[8] == "X") ||
        (helper[0] == "X" && helper[3] == "X" && helper[6] == "X") ||
        (helper[1] == "X" && helper[4] == "X" && helper[7] == "X") ||
        (helper[2] == "X" && helper[5] == "X" && helper[8] == "X") ||
        (helper[0] == "X" && helper[4] == "X" && helper[8] == "X") ||
        (helper[2] == "X" && helper[4] == "X" && helper[6] == "X")){
            playerOne.win("pone");
            result('win1')
        }else if ((helper[0] == "O" && helper[1] == "O" && helper[2] == "O") ||
        (helper[3] == "O" && helper[4] == "O" && helper[5] == "O") ||
        (helper[6] == "O" && helper[7] == "O" && helper[8] == "O") ||
        (helper[0] == "O" && helper[3] == "O" && helper[6] == "O") ||
        (helper[1] == "O" && helper[4] == "O" && helper[7] == "O") ||
        (helper[2] == "O" && helper[5] == "O" && helper[8] == "O") ||
        (helper[0] == "O" && helper[4] == "O" && helper[8] == "O") ||
        (helper[2] == "O" && helper[4] == "O" && helper[6] == "O")){
            playerTwo.win("ptwo");
            result("win2")
        }else if(Gameboard.getMovesCount() == 9){
            result("draw")
        };
    }
const result = (info) => {
    const displayChange = (value)=> {
        document.getElementById("informator").style.visibility = "visible";
        document.getElementById("result-information").innerHTML = `<span>${value}</span>`
    }
    switch (info) {
        case "win1":
            displayChange(playerOne.getName() + " won!")
            break;
        case "win2":
            displayChange(playerTwo.getName() + " won!")
            break;
        case "draw":
            displayChange("It's a draw")
            break;
        }}
    return {action}
    })();

const spots = document.getElementsByClassName("grid-item");
Array.from(spots).forEach(function(spot) {
    if(spot.classList.contains("taken") != true){
        spot.addEventListener('click', GameController.action)
    }
  });
const continueButtons = document.getElementsByClassName("continue");
Array.from(continueButtons).forEach(function(button){
    button.addEventListener('click', () => {
        document.getElementById("informator").style.visibility = "hidden";
        document.getElementById("result-information").innerHTML = "";
        Gameboard.resetBoard();
    })});
document.getElementById("game-starter").addEventListener('click', () => {
        if(document.getElementById("player-one").value != ""){
            document.getElementById("poneName").innerHTML = document.getElementById("player-one").value;
            playerOne.changeName(document.getElementById("player-one").value);
        }
        if(document.getElementById("player-two").value != ""){
            document.getElementById("ptwoName").innerHTML = document.getElementById("player-two").value;
            playerTwo.changeName(document.getElementById("player-two").value);
        }
        document.getElementById("player-one").value = "";
        document.getElementById("player-two").value = "";
        document.getElementById("start").style.visibility = "hidden";
    })
const resetButtons = document.getElementsByClassName("reset");
    Array.from(resetButtons).forEach(function(bttn){
        bttn.addEventListener('click', () => {
            Gameboard.resetBoard();
            playerOne.resetGame('pone');
            playerTwo.resetGame("ptwo");
            document.getElementById("start").style.visibility = "visible";
            document.getElementById("informator").style.visibility = "hidden";
        })
    });