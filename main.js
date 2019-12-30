const width = 60;
const height = 60; // width and height dimensions of the board

const gol = new GameOfLife(width, height);

const tds = [];

// <table> element
const table = document.createElement('tbody');
// build a table row <tr>
for (let h = 0; h < height; h++) {
  const tr = document.createElement('tr');
  // build a table column <td>
  for (let w = 0; w < width; w++) {
    const td = document.createElement('td');
    td.dataset.row = h;
    td.dataset.col = w;
    tds.push(td);
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById('board').append(table);

const paint = () => {
  tds.forEach(function (td) {
    const row = td.dataset.row;
    const col = td.dataset.col;
    if (gol.get(row, col) === 1) {
      td.classList.add('alive')
    } else {
      td.classList.remove('alive');
    }
  })
}

document.getElementById('upload_btn').addEventListener('click', function(){
   document.getElementById('file-input').click()
});
document.getElementById('file-input').addEventListener('change', function(){
   const middleRow=Math.floor(height/2)
   const middleCol=Math.floor(width/2)

   readFile(this.files[0], function(text){
       
       text.split('\n').slice(2).forEach(function(str,row,fullStr){
             const startRow=middleRow-Math.floor((fullStr.length/2))
             const startCol=middleCol-Math.floor((str.length/2))
             str.split('').forEach(function(char, col){
                
                if (char=='O'){
                  gol.board[startCol+col][startRow+row]=1
                }
                else{
                  gol.board[startCol+col][startRow+row]=0
                }
             }
            )
   })
  paint()
  }
  )
})

function readFile(file, cb){
  const reader = new FileReader()
  reader.onload = function(evt){
    cb(evt.target.result)
  }
  reader.readAsText(file)
}

document.getElementById('board').addEventListener('click', function(){
  if(event.target.localName ==='td'){
    const td=event.target;
    const row = td.dataset.row;
    const col = td.dataset.col;
    if ( gol.board[row][col]===1){
      gol.board[row][col]=0

    }
    else{
      gol.board[row][col]=1
    }
    paint()
  }
});

document.getElementById('step_btn').addEventListener('click', function(){
  gol.tick();
  paint();
});

let isPlaying = false
let intervalID = 0;
const playBtn = document.getElementById('play_btn')
playBtn.addEventListener('click', function(){
  if (isPlaying) {
    clearInterval(intervalID)
    isPlaying = false;
    playBtn.textContent = 'Play'
  } else {
    intervalID = window.setInterval(function () {
      gol.tick();
      paint();
    }, 200)
    isPlaying = true;
    playBtn.textContent = 'Pause'
  }
});

document.getElementById('random_btn').addEventListener('click', function(){
  gol.randomize()
  paint()
});

document.getElementById('clear_btn').addEventListener('click', function(){
  gol.clear()
  paint()
});
