$(()=>{

const $startGame = $('#start-game');
$('#board').hide();

$startGame.on('click', ()=>{
    $startGame.hide('slow');
    $('#board').show('slow');
});

const $board = $('#board');
let xScore = 0;
let oScore = 0;

let boardArray =    [[0,0,0],
                    [0,0,0],
                    [0,0,0]];

let playerTurn = 0; // 0 for 'X', 1 for 'O'

function checkWin (arr, symbol) {
    for (let j = 0 ; j < arr.length ; j++){
        for (let i = 0 ; i < arr[j].length ; i++){
            if( (arr[j][0] === symbol && arr[j][1] === symbol && arr[j][2] === symbol) ||
                (arr[0][i] === symbol && arr[1][i] === symbol && arr[2][i] === symbol) ||
                (arr[0][0] === symbol && arr [1][1] === symbol && arr[2][2] === symbol)||
                (arr[0][2] === symbol && arr [1][1] === symbol && arr[2][0] === symbol)){
                    return true;
                }
        }
    }
    return false;
}

function checkDraw (arr) {
    for (let j = 0 ; j < arr.length ; j++){
        for (let i = 0 ; i < arr[j].length ; i++){
            if(arr[j][i] === 0){
                return false;
            }
        }
    }
    return true;
}

for(let i = 0; i < 9 ; i++){
    $board.children('div').eq(i).on("click", (event)=>{

        if(playerTurn === 0){

            $(event.currentTarget).text('X').css('color','blue');
            playerTurn++;
            logSymbol(i, boardArray, 'X');

            if(checkWin(boardArray, 'X')){
                console.log('X wins!');
                xScore++;
                $('#result').text(`X wins! X: ${xScore}, O: ${oScore}`);
                resetGame();
            } else if(checkDraw(boardArray)){
                $('#result').text(`Game drawn! X: ${xScore}, O: ${oScore}`);
                resetGame();
            };

        } else if(playerTurn === 1){

            $(event.currentTarget).text('O').css('color','red');;
            playerTurn--;
            logSymbol(i, boardArray, 'O');

            if(checkWin(boardArray, 'O')){
                console.log('O wins!');
                oScore++;
                $('#result').text(`O wins! X: ${xScore}, O: ${oScore}`);
                resetGame();
            } else if(checkDraw(boardArray)){
                $('#result').text(`Game drawn! X: ${xScore}, O: ${oScore}`);
                resetGame();
            };
        }

    });
}

function logSymbol (cellNum, arr, symbol) {
    let elementNum = 0;
    for (let j = 0; j < arr.length; j++){
        for(let i = 0; i < arr.length ; i++){
            if(cellNum === elementNum){
                arr[j][i] = symbol;
                console.log(arr);
                return;
            }
            elementNum++;
        }
    }
}

function resetGame(){
    
    $('.cell').empty();
    boardArray = [[0,0,0],[0,0,0],[0,0,0]];
}
























});