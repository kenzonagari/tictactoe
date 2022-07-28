$(()=>{

const $startGame = $('#start-game');
$('#board').hide();

$startGame.on('click', ()=>{
    $startGame.hide();
    $('#board').show();
});

const $board = $('#board');
let xScore = 0;
let oScore = 0;

let boardArray =    [[0,0,0],
                    [0,0,0],
                    [0,0,0]];

let playerTurn = 0; // 0 for 'X', 1 for 'O'

const color = {
    x: "#71D0FF",
    o: "#ff5ea9",
}

function checkWin (arr, symbol) {
    for (let j = 0 ; j < arr.length ; j++){
        for (let i = 0 ; i < arr[j].length ; i++){
            if( (arr[j][0] === symbol && arr[j][1] === symbol && arr[j][2] === symbol) ||
                (arr[0][i] === symbol && arr[1][i] === symbol && arr[2][i] === symbol) ||
                (i === 0 && (arr[i][i] === symbol && arr [i+1][i+1] === symbol && arr[i+2][i+2] === symbol))||
                (i === 0 && (arr[i][2-i] === symbol && arr [i+1][1-i] === symbol && arr[i+2][i] === symbol))){
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

for(let i = 0; i < 3 ; i++){ //row
    for(let j = 0 ; j < 3 ; j++){ //col
        $(`#${i}${j}`).on("click", (event)=>{
    
            if(playerTurn === 0){
    
                $(event.currentTarget).text('X').css('color',color.x);
                $(event.currentTarget).css("pointer-events","none"); //turn the cell unclickable after clicked once
                playerTurn++;
                logSymbol(i, j , boardArray, 'X');
    
                if(checkWin(boardArray, 'X')){
                    console.log('X wins!');
                    xScore++;
                    highlightSymbol('X');
                    $('#result').text(`X wins! X: ${xScore} | O: ${oScore}`);
                    //resetGame();
                } else if(checkDraw(boardArray)){
                    reset('draw');
                };
    
            } else if(playerTurn === 1){
    
                $(event.currentTarget).text('O').css('color',color.o);
                $(event.currentTarget).css("pointer-events","none"); //turn the cell unclickable after clicked once
                playerTurn--;
                logSymbol(i, j, boardArray, 'O');
    
                if(checkWin(boardArray, 'O')){
                    console.log('O wins!');
                    oScore++;
                    highlightSymbol('O');
                    $('#result').text(`O wins! X: ${xScore} | O: ${oScore}`);
                    //resetGame();
                } else if(checkDraw(boardArray)){
                    reset('draw');
                };
            }
    
        });
    }
}

function logSymbol (row, col, arr, symbol) {
    for (let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr.length ; j++){
            if(row === i && col === j){
                arr[i][j] = symbol;
                console.log(arr);
                return;
            }
        }
    }
}

function reset(condition){
    if(condition === "draw"){
        $('#result').text(`Game drawn! X: ${xScore} | O: ${oScore}`);
        resetGame();
    }
}

function highlightSymbol(symbol){
    setTimeout(()=>{
        for(let i = 0; i < 3 ; i++){ //row
            for(let j = 0 ; j < 3 ; j++){ //col
                if(boardArray[i][j] === symbol){
                    console.log('done');
                    $(`#${i}${j}`).css({animation: `flash 0.5s linear`});
                }
            }
        }
    },0)
    setTimeout(()=>{
        for(let i = 0; i < 3 ; i++){ //row
            for(let j = 0 ; j < 3 ; j++){ //col
                $(`#${i}${j}`).css({animation: ``})
            }
        }
        resetGame();
    },500)
}

function resetGame(){
    $('.cell').empty();
    $('.cell').css("pointer-events","auto"); //turn all cells clickable again
    boardArray = [[0,0,0],[0,0,0],[0,0,0]];
}
























});