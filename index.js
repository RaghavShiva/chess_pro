const gameboard = document.querySelector('.gameboard')
const turn = document.querySelector('.turn')
const display = document.querySelector('#display')
const width = 8
let playerGo = 'black'
turn.textContent = 'black'
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
        square.firstChild?.setAttribute('draggable',true) 
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

const allsquares = document.querySelectorAll('.square')
console.log(allsquares)



let startPositionId 
allsquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
})
function dragStart(e){
    // console.log(e.target)
    startPositionId =e.target.parentNode.getAttribute('square-id')
    draggedEle = e.target
}
function dragOver(e){
    e.preventDefault()
}
function dragDrop(e){
    e.stopPropagation()
    console.log(e.target)
    // e.target.parentNode.append(draggedEle)
    // e.target.append(draggedEle)
    // e.target.remove()
    const taken = e.target.classList.contains('piece')
    changePlayer()
}
function changePlayer(){
    if(playerGo==='black'){
        playerGo='white'
        turn.textContent='white'
        reverseIDs()
    }
    else{
        revertIDs()
        playerGo='black'
        turn.textContent='black'
    }
        
}

function reverseIDs(){
    const allsquares=document.querySelectorAll('.square')
    allsquares.forEach((square,i)=>square.setAttribute('square-id',(63-i)))
}
function revertIDs(){
    const allsquares=document.querySelectorAll('.square')
    allsquares.forEach((square,i)=>square.setAttribute('square-id',i))
}