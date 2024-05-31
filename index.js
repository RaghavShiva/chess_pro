const gameboard = document.querySelector(".gameboard")
const turn = document.querySelector('.turn')
const display = document.querySelector('#display')
const width = 8
const startpieces = [
    rook,knight,bishop,queen,king,bishop,knight,rook,
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    rook,knight,bishop,queen,king,bishop,knight,rook
]

function createBoard(){
    startpieces.forEach((startpiece,i)=>{
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = startpiece
        square.setAttribute('square-id',i)
        // square.classList.add('beige')
        const row = Math.floor((63-i)/8)+1
        if(row%2===0){
            square.classList.add(i%2===0 ?"beige":"brown")
        }
        else{
            square.classList.add(i%2===0 ?"brown":"beige")
        }
        
        if(i<16){
            square.firstChild.firstChild.classList.add('black')
        }
        if(i>=48){
            square.firstChild.firstChild.classList.add('white')
        }
        gameboard.append(square)
       
    })
}
createBoard()

const allsquares= document.querySelectorAll('.gameboard .square')
console.log(allsquares)

allsquares.forEach(square => {
    square.addEventListener('dragstart',dragStart)
    square.addEventListener('dragover',dragOver)
    square.addEventListener('drop',dragDrop)
})

let startPositionId 
function dragStart(e){
    startPositionId =e.target.parentNode.getAttribute('square-id')
    draggedEle = e.target
}
function dragOver(e){
    e.preventDefault()
}
function dragDrop(e){
    e.stopPropagation()
    e.target.parentNode.append(draggedEle)
    e.target.remove()
}