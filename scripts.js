const Player = (name, choice) => {
    const getName = () => name;
    const score = 0;
    const getChoice = () => choice;

    return {
        getName,
        getChoice
    }
};

const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;
    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        for(let i = 0; i < board.length; i++){
            document.getElementById(i+1).innerHTML = "";
        }
    }
    const makeMove = (player) => {

    }
    return {
        getBoard,
        resetBoard,
        makeMove
    };
})();

const GameController = (() => {
    const render = (id, choice) => {
        document.getElementById(id).innerHTML= `<span>${choice}</span>`
    }
})();
