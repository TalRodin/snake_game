class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  /**
   * Returns a 2D Array
   */

  makeBoard() {
    let arr = []

    for (let y = 0; y < this.height; y++) {
      let arr_inner = []
      for (let x = 0; x < this.width; x++) {
        arr_inner.push(0)
      }
      arr.push(arr_inner)
    }
    return arr
  }


  /**
   * Return the amount of living neighbors around a given coordinate.
   */
  get(row, column) {
    return this.board[row][column]
  }
  livingNeighbors(row, col) {
    const reducer = (acc, currV) => acc + currV;
    const possible_n = [[row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
    [row, col - 1], [row, col + 1],
    [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]]
    const width = this.width
    const height = this.height
    return possible_n.filter(function (e) {
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


  /**
   * Given the present board, apply the rules to generate a new board
   */
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
    // TODO: Here is where you want to loop through all the cells
    // on the existing board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the new board
    // (the next iteration of the game)
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells in newBoard,
    // based on their current alive neighbors
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        const cell = this.get(row, col)
        const numNeighbors = this.livingNeighbors(row, col);
        // copy over last state to begin with
        newBoard[row][col] = cell;
        // change board according to rules
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
