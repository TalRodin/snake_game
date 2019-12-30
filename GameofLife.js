class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }
  makeBoard() {
    let arr = []

    for (let y = 0; y < this.height; y++) {
      let arrInner = []
      for (let x = 0; x < this.width; x++) {
        arrInner.push(0)
      }
      arr.push(arrInner)
    }
    return arr
  }
  get(row, column) {
    return this.board[row][column]
  }
  livingNeighbors(row, col) {
    const reducer = (acc, currV) => acc + currV;
    const possibleN = [[row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
    [row, col - 1], [row, col + 1],
    [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]]
    const width = this.width
    const height = this.height
    return possibleN.filter(function (e) {
      if (e[0] < 0 || e[1] < 0 || e[0] >= height || e[1] >= width) {
        return false
      }
      else {
        return true
      }
    }).map(function (e) {
      return this.get(e[0], e[1])
    }.bind(this)).reduce(reducer, 0)

  }
  randomize(){
    const newBoard = this.makeBoard();
    for (let row=0; row<this.height; row++){
      for (let col=0;col<this.width;col++){
         const newState=Math.floor(Math.random() * 2)
         newBoard[row][col]=newState
      }
    }
    this.board = newBoard;
  }
  tick() {
    const newBoard = this.makeBoard();
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        const cell = this.get(row, col)
        const numNeighbors = this.livingNeighbors(row, col);
        newBoard[row][col] = cell;
        if (numNeighbors < 2) {
          newBoard[row][col] = 0;
        } else if (numNeighbors > 3) {
          newBoard[row][col] = 0;
        } else if (numNeighbors === 3) {
          newBoard[row][col] = 1;
        }
      }
    }
    this.board = newBoard;
  }
  clear(){
    this.board=this.makeBoard()
  }
}
