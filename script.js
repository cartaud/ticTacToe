let board = JSON.parse(localStorage.getItem('board')) || [[0, 0 ,0], [0, 0, 0], [0, 0, 0]]

class Player {
    constructor(mark) {
        this.mark = mark;
    }

    play(row, col, e) {
        console.log(e)
        if (board[row][col] == 0) {
            board[row][col] = this.mark
            console.log(board)
            const buttonEl = document.querySelector(`.b${e}`);
            buttonEl.innerHTML = `${this.mark}`
            localStorage.setItem('board', JSON.stringify(board))
            const win = checkWin(this.mark)
            if (this.mark == 'X' && win!='win') {
                cpuPick()
            }
        } 
    }
}

const cpuPick = () => {
    const row = Math.floor(Math.random()*3)
    const col = Math.floor(Math.random()*3)
    if (board[row][col] == 0) {
        playerTwo.play(row, col, `${row}${col}`)
    }
    else {
        cpuPick()
    }
}

function checkWin(mark) {
    if (board[0][0] == mark && board[0][1] == mark && board[0][2] == mark || 
        board[1][0] == mark && board[1][1] == mark && board[1][2] == mark ||
        board[2][0] == mark && board[2][1] == mark && board[2][2] == mark ||
        board[0][0] == mark && board[1][0] == mark && board[2][0] == mark ||
        board[0][1] == mark && board[1][1] == mark && board[2][1] == mark ||
        board[0][2] == mark && board[1][2] == mark && board[2][2] == mark ||
        board[0][2] == mark && board[1][1] == mark && board[2][0] == mark ||
        board[0][0] == mark && board[1][1] == mark && board[2][2] == mark) {
        console.log('winner!')
        for (i=0;i<3;i++) {
            for (j=0;j<3;j++) {
                const buttonEl = document.querySelector(`.b${i}${j}`);
                buttonEl.innerHTML = ``
                board[i][j] = 0
                localStorage.setItem('board', JSON.stringify(board))
            }
        }
        return 'win'
    }
}


const playerOne = new Player('X');
const playerTwo = new Player('O');