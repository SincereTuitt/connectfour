let playerOne = {}
let playerTwo = {}


// objects created using this class store player info - name, number of wins, number of losses
class connectFourPlayer {
    constructor (name, piece) {
        this.name = name;
        this.wins = 0;
        this.losses = 0;
        this.piece = piece
    };

    incrementWins () {
        this.wins++;
    };

    incrementLosses () {
        this.losses++;
    };
};

const gameBoard = {
    board: [ //each array in this array of arrays represents a row in the gameBoard. The array at index zero is
             //the bottom row, the next is the second from the bottom, and so on. Initialized with empty board
        ['-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-']
    ],

    turnCounter: 0, // counter used to keep track of whose turn it is in the game

    // return value "X" if turncounter is even, "O" if turncounter is odd
    currentPiece: function () {
        if (gameBoard.turnCounter % 2 === 0) {
            return 'X'
        } else {
            return 'O'
        }
    },


    // increments turn count and changes header in document to reflect player turn
    turnCounterIncrementor: function () {
        gameBoard.turnCounter++
        if (gameBoard.turnCounter % 2 === 0) {
            document.getElementById('playerTurn').innerHTML = '<h2>It\'s ' + playerOne.name + '\'s turn</h2>'
        } else {
            document.getElementById('playerTurn').innerHTML = '<h2>It\'s ' + playerTwo.name + '\'s turn</h2>'
        }
    },

    // score tracker
    scoreTracker: function () {
        document.getElementById('scoreBoard').innerHTML = 
        '<table border=1 id="score">' + '<tr> <td></td> <td>Wins</td> <td>Losses</td> </tr>' + 
        `<tr> <td>${playerOne.name}</td> <td>${playerOne.wins}</td> <td>${playerOne.losses}</td> </tr>` +
        `<tr> <td>${playerTwo.name}</td> <td>${playerTwo.wins}</td> <td>${playerTwo.losses}</td> </tr>` +
        '</table>'
    },

    // replace body of html page with updated version of gameBoard, created after each player turn
    newGameBoard: 
    
    function () {
        let result = '<table border=1>'
        for (let i = gameBoard.board.length -1; i >= 0; i--) {
            result += '<tr>'
            for (let j = 0; j < gameBoard.board[i].length; j++) {
                result += `<td>${gameBoard.board[i][j]}</td>`
            }
            result += '</tr>'
        }
        result += '</table>'
        return result
    },
    
    //clears game board, board reassigned to initial value
    clearBoard: function () {
        this.board = [
        ['-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-']
        ]
        document.getElementById('board').innerHTML = this.newGameBoard()
    },
    
    //places an "O" or "X" piece in the specified column
    addPiece: function (id, column) { 
        // iterate through each array in board
        for (let i = 0; i < 6; i++) {
            // if the value of the element at the index given by column is zero, replace it with the specified piece. return out
            if (gameBoard.board[i][column] === '-') {
                gameBoard.board[i].splice(column, 1, id)
                return
            } else if (i == 5) {
            // else, if the sixth array, return 'Column full'
                return console.log('column full') //CHANGE THIS FUNCTIONALITY
            }
            
        }
            
    },

    // determines if game is a draw (full board)
    gameDraw: function () {
         let isDraw = true
        // iterate through final array in board
        for (let element of gameBoard.board[5]) {
            // if any element has a value zero, reassign value of isDraw to false
            if (element === '-') {
                isDraw = false
            }
        }   
        // if isDraw has value true, return ''
        if (isDraw) {
            gameBoard.clearBoard()
            alert('It\'s a draw!')
        } 
    },

    // determines if game is a win by x
    gameWinX: function () {
        let consecutiveCount = 0
    // check if four Xs in column
        // iterate through each column
        for (let i = 0; i < 7; i++) {
            // iterate through each element in coulumn, from top to bottom
            for (let array of gameBoard.board) {
                if (array[i] === 'X'){
                    consecutiveCount++
                } else {
                    consecutiveCount = 0
                }
                if (consecutiveCount === 4) {
                    playerOne.incrementWins()
                    playerTwo.incrementLosses()
                    gameBoard.clearBoard()
                    gameBoard.scoreTracker()
                    alert(`${playerOne.name} is the winner!`)
                    return
                }
            }
            consecutiveCount=0   
        }
        consecutiveCount = 0
    // check if four Xs in row
        // iterate through each row
        for (let array of gameBoard.board) {
            // iterate through each row element, left to right
            for (let i = 0; i <= 6; i++) {
                if (array[i] === "X") {
                    consecutiveCount++
                } else {
                    consecutiveCount = 0
                }
                if (consecutiveCount === 4) {
                    playerOne.incrementWins()
                    playerTwo.incrementLosses()
                    gameBoard.clearBoard()
                    gameBoard.scoreTracker()
                    alert(`${playerOne.name} is the winner!`)
                    return
                }
            }
            consecutiveCount=0 
        }
        consecutiveCount=0
    // check if four Xs along diaganol, lower left to upper right
        //iterate 0 to 3, representing first four diags
        for (let i = 0; i < 4; i++){
          // iterate through 0-5, representing rows
          for (let j = 0; j < 6; j++) {
            if (gameBoard.board[j][j+i] === 'X') {
                consecutiveCount++
            } else {
                consecutiveCount = 0
            }
            if (consecutiveCount === 4) {
                playerOne.incrementWins()
                playerTwo.incrementLosses()
                gameBoard.clearBoard()
                gameBoard.scoreTracker()
                alert(`${playerOne.name} is the winner!`)
                return
            }
          }
          consecutiveCount=0
        }
        consecutiveCount=0
    // check if four Xs along diaganol, lower right to upper left
        //iterate 0 to 3, representing last four diags
        for (let i = 0; i < 4; i++){
            // iterate through 0-5, representing rows
            for (let j = 0; j < 6; j++) {
              if (gameBoard.board[j][6-j-i] === 'X') {
                  consecutiveCount++
              } else {
                  consecutiveCount = 0
              }
              if (consecutiveCount === 4) {
                  playerOne.incrementWins()
                  playerTwo.incrementLosses()
                  gameBoard.clearBoard()
                  gameBoard.scoreTracker()
                  alert(`${playerOne.name} is the winner!`)
                  return
              }
            }
            consecutiveCount=0
        }
        consecutiveCount=0

            


    },

    // determines if game is a win by o
    gameWinO: function () {
        let consecutiveCount = 0
    // check if four Os in column
        // iterate through each column
        for (let i = 0; i < 7; i++) {
            // iterate through each element in coulumn, from top to bottom
            for (let array of gameBoard.board) {
                if (array[i] === 'O'){
                    consecutiveCount++
                } else {
                    consecutiveCount = 0
                }
                if (consecutiveCount === 4) {
                    playerTwo.incrementWins()
                    playerOne.incrementLosses()
                    gameBoard.clearBoard()
                    gameBoard.scoreTracker()
                    alert(`${playerTwo.name} is the winner!`)
                    return
                }
            }
            consecutiveCount=0   
        }
        consecutiveCount = 0
    // check if four Os in row
        // iterate through each row
        for (let array of gameBoard.board) {
            // iterate through each row element, left to right
            for (let i = 0; i <= 6; i++) {
                if (array[i] === "O") {
                    consecutiveCount++
                } else {
                    consecutiveCount = 0
                }
                if (consecutiveCount === 4) {
                    playerTwo.incrementWins()
                    playerOne.incrementLosses()
                    gameBoard.clearBoard()
                    gameBoard.scoreTracker()
                    alert(`${playerTwo.name} is the winner!`)
                    return
                }
            }
            consecutiveCount=0 
        }
        consecutiveCount=0
    // check if four Os along diaganol, lower left to upper right
        //iterate 0 to 3, representing first four diags
        for (let i = 0; i < 4; i++){
            // iterate through 0-5, representing rows
            for (let j = 0; j < 6; j++) {
              if (gameBoard.board[j][j+i] === 'O') {
                  consecutiveCount++
              } else {
                  consecutiveCount = 0
              }
              if (consecutiveCount === 4) {
                  playerTwo.incrementWins()
                  playerOne.incrementLosses()
                  gameBoard.clearBoard()
                  gameBoard.scoreTracker()
                  alert(`${playerTwo.name} is the winner!`)
                  return
              }
            }
            consecutiveCount=0
        }
        consecutiveCount=0
    // check if four Os along diaganol, lower right to upper left
        //iterate 0 to 3, representing last four diags
        for (let i = 0; i < 4; i++){
            // iterate through 0-5, representing rows
            for (let j = 0; j < 6; j++) {
              if (gameBoard.board[j][6-j-i] === 'O') {
                  consecutiveCount++
              } else {
                  consecutiveCount = 0
              }
              if (consecutiveCount === 4) {
                  playerTwo.incrementWins()
                  playerOne.incrementLosses()
                  gameBoard.clearBoard()
                  gameBoard.scoreTracker()
                  alert(`${playerTwo.name} is the winner!`)
                  return
              }
            }
            consecutiveCount=0
        }
        consecutiveCount=0

    }
    
    
    ,

    gameState: function () {
        gameBoard.gameWinO()
        gameBoard.gameWinX()
        gameBoard.gameDraw()
    }

}


// creates two counnectFourPlayer class objects
function initiateTwoPlayer () {
    let p1 = prompt('Player 1 name?')
    let p2 = prompt('Player 2 name?')
    playerOne = new connectFourPlayer(p1, "X")
    playerTwo = new connectFourPlayer(p2, "O")
    document.getElementById('board').innerHTML = gameBoard.newGameBoard()
    document.getElementById('playerTurn').innerHTML = '<h2>It\'s ' + playerOne.name + '\'s turn</h2>'

}

//updates board after each turn
function reloadBoard () {
   document.getElementById('board').innerHTML = gameBoard.newGameBoard() 
}
