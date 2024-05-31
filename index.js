const gameboard = document.querySelector('.gameboard')
const turn = document.querySelector('.turn')
const display = document.querySelector('#display')
const width = 8
const info = document.querySelector('.info')
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
// console.log(allsquares)



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
    const correctGo = draggedEle.firstChild.classList.contains(playerGo)
    const taken = e.target.classList.contains('piece')
    const valid = checkIfValid(e.target)
    const opponentGo = playerGo==='white'?'black':'white'
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo)
    if(correctGo){
        // must be checked for valid move
        if(takenByOpponent && valid){
            e.target.parentNode.append(draggedEle)
            e.target.remove()
            check()
            changePlayer()
            return
        }
        
        if(taken && !takenByOpponent){
            setTimeout(()=>display.textContent = "you cannot go here!",200)
            return
        }
        if(valid){
            e.target.append(draggedEle)
            check()
            changePlayer()
            return
        }
    }
    
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


function checkIfValid(target){
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
    const startId = Number(startPositionId)
    console.log(targetId)
    console.log(startId)
    const piece = draggedEle.id
    switch(piece){
        case 'pawn':
            const starterRow = [8,9,10,11,12,13,14,15]
            if((starterRow.includes(startId)) && (startId + width*2 ===targetId)
                || (startId+width === targetId) || 
                 (startId+width-1 ===targetId && document.querySelector(`[square-id="${startId+width-1}"]`).firstChild )|| 
                 (startId+width+1 ===targetId && document.querySelector(`[square-id="${startId+width+1}"]`).firstChild)
                )
                return true
                break;
        case 'knight':
            if(
                (startId+width*2-1 === targetId) ||
                (startId+width*2+1 === targetId) ||
                (startId+width-2 === targetId) ||
                (startId+width+2 === targetId) ||
                (startId-width*2-1 === targetId) ||
                (startId-width*2+1 === targetId) ||
                (startId-width-2 === targetId) ||
                (startId-width+2 === targetId) 
            )    
            return true
            break;
        case 'bishop':
            if(
                startId+width+1 === targetId ||
                startId+width*2+2 === targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild ||
                startId+width*3+3 === targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild ||
                startId+width*4+4 === targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild ||
                startId+width*5+5 === targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstChild   ||
                startId+width*6+6 === targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*5+5}"]`).firstChild ||
                startId+width*7+7 === targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*5+5}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*6+6}"]`).firstChild ||
                startId-width-1 === targetId ||
                startId-width*2-2 === targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild ||
                startId-width*3-3 === targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild||
                startId-width*4-4 === targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild ||
                startId-width*5-5 === targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstChild   ||
                startId-width*6-6 === targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*5-5}"]`).firstChild ||
                startId-width*7-7 === targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*5-5}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*6-6}"]`).firstChild || 
                startId-width+1 === targetId ||
                startId-width*2+2 === targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild ||
                startId-width*3+3 === targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild ||
                startId-width*4+4 === targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild ||
                startId-width*5+5 === targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstChild   ||
                startId-width*6+6 === targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*5+5}"]`).firstChild ||
                startId-width*7+7 === targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*5+5}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*6+6}"]`).firstChild|| 
                startId+width-1 === targetId ||
                startId+width*2-2 === targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild ||
                startId+width*3-3 === targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild ||
                startId+width*4-4 === targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild ||
                startId+width*5-5 === targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstChild   ||
                startId+width*6-6 === targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*5-5}"]`).firstChild ||
                startId+width*7-7 === targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*5-5}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*6-6}"]`).firstChild  
            )
            return true
            break
        case 'rook':
            if(
                startId+width===targetId ||
                startId+width*2 ===targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild ||
                startId+width*3 ===targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild ||
                startId+width*4 ===targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild||
                startId+width*5 ===targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4}"]`).firstChild ||
                startId+width*6 ===targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*5}"]`).firstChild ||
                startId+width*7 ===targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*5}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*6}"]`).firstChild ||
                startId-width===targetId ||
                startId-width*2 ===targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild ||
                startId-width*3 ===targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild ||
                startId-width*4 ===targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild||
                startId-width*5 ===targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4}"]`).firstChild ||
                startId-width*6 ===targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*5}"]`).firstChild ||
                startId-width*7 ===targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*5}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*6}"]`).firstChild ||
                startId+1===targetId ||
                startId+2 ===targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild ||
                startId+3 ===targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+2}"]`).firstChild ||
                startId+4 ===targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+3}"]`).firstChild||
                startId+5 ===targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+4}"]`).firstChild ||
                startId+6 ===targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+4}"]`).firstChild && !document.querySelector(`[square-id="${startId+5}"]`).firstChild ||
                startId+7 ===targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+4}"]`).firstChild && !document.querySelector(`[square-id="${startId+5}"]`).firstChild && !document.querySelector(`[square-id="${startId+6}"]`).firstChild ||
                startId-1===targetId ||
                startId-2 ===targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild ||
                startId-3 ===targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild && !document.querySelector(`[square-id="${startId-2}"]`).firstChild ||
                startId-4 ===targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild && !document.querySelector(`[square-id="${startId-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-3}"]`).firstChild||
                startId-5 ===targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild && !document.querySelector(`[square-id="${startId-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-4}"]`).firstChild ||
                startId-6 ===targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild && !document.querySelector(`[square-id="${startId-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-4}"]`).firstChild && !document.querySelector(`[square-id="${startId-5}"]`).firstChild ||
                startId-7 ===targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild && !document.querySelector(`[square-id="${startId-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-4}"]`).firstChild && !document.querySelector(`[square-id="${startId-5}"]`).firstChild && !document.querySelector(`[square-id="${startId-6}"]`).firstChild 
            
            )
            return true
            break
        case 'queen':
            if(
                startId+width===targetId ||
                startId+width*2 ===targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild ||
                startId+width*3 ===targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild ||
                startId+width*4 ===targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild||
                startId+width*5 ===targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4}"]`).firstChild ||
                startId+width*6 ===targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*5}"]`).firstChild ||
                startId+width*7 ===targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*5}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*6}"]`).firstChild ||
                startId-width===targetId ||
                startId-width*2 ===targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild ||
                startId-width*3 ===targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild ||
                startId-width*4 ===targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild||
                startId-width*5 ===targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4}"]`).firstChild ||
                startId-width*6 ===targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*5}"]`).firstChild ||
                startId-width*7 ===targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*5}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*6}"]`).firstChild ||
                startId+1===targetId ||
                startId+2 ===targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild ||
                startId+3 ===targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+2}"]`).firstChild ||
                startId+4 ===targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+3}"]`).firstChild||
                startId+5 ===targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+4}"]`).firstChild ||
                startId+6 ===targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+4}"]`).firstChild && !document.querySelector(`[square-id="${startId+5}"]`).firstChild ||
                startId+7 ===targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+4}"]`).firstChild && !document.querySelector(`[square-id="${startId+5}"]`).firstChild && !document.querySelector(`[square-id="${startId+6}"]`).firstChild ||
                startId-1===targetId ||
                startId-2 ===targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild ||
                startId-3 ===targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild && !document.querySelector(`[square-id="${startId-2}"]`).firstChild ||
                startId-4 ===targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild && !document.querySelector(`[square-id="${startId-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-3}"]`).firstChild||
                startId-5 ===targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild && !document.querySelector(`[square-id="${startId-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-4}"]`).firstChild ||
                startId-6 ===targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild && !document.querySelector(`[square-id="${startId-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-4}"]`).firstChild && !document.querySelector(`[square-id="${startId-5}"]`).firstChild ||
                startId-7 ===targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild && !document.querySelector(`[square-id="${startId-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-4}"]`).firstChild && !document.querySelector(`[square-id="${startId-5}"]`).firstChild && !document.querySelector(`[square-id="${startId-6}"]`).firstChild ||
                startId+width+1 === targetId ||
                startId+width+1 === targetId ||
                startId+width*2+2 === targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild ||
                startId+width*3+3 === targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild ||
                startId+width*4+4 === targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild ||
                startId+width*5+5 === targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstChild   ||
                startId+width*6+6 === targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*5+5}"]`).firstChild ||
                startId+width*7+7 === targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*5+5}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*6+6}"]`).firstChild ||
                startId-width-1 === targetId ||
                startId-width*2-2 === targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild ||
                startId-width*3-3 === targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild||
                startId-width*4-4 === targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild ||
                startId-width*5-5 === targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstChild   ||
                startId-width*6-6 === targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*5-5}"]`).firstChild ||
                startId-width*7-7 === targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*5-5}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*6-6}"]`).firstChild || 
                startId-width+1 === targetId ||
                startId-width*2+2 === targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild ||
                startId-width*3+3 === targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild ||
                startId-width*4+4 === targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild ||
                startId-width*5+5 === targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstChild   ||
                startId-width*6+6 === targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*5+5}"]`).firstChild ||
                startId-width*7+7 === targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*5+5}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*6+6}"]`).firstChild|| 
                startId+width-1 === targetId ||
                startId+width*2-2 === targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild ||
                startId+width*3-3 === targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild ||
                startId+width*4-4 === targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild ||
                startId+width*5-5 === targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstChild   ||
                startId+width*6-6 === targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*5-5}"]`).firstChild ||
                startId+width*7-7 === targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*5-5}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*6-6}"]`).firstChild
            )
                return true
            break
        case 'king':
            if(
                startId+1===targetId ||
                startId-1===targetId ||
                startId+width===targetId || 
                startId-width===targetId ||
                startId+width+1===targetId ||
                startId+width-1 ===targetId ||
                startId-width+1===targetId ||
                startId-width-1===targetId
            )
            return true
        default:
            return false    
    }

}

function check(){
    const kings=Array.from(document.querySelectorAll('#king'))
    if(!kings.some(king => king.firstChild.classList.contains('white'))){
        display.innerHTML="Black player wins!"
        info.innerHTML= "Game over!"
        const allsquares = document.querySelectorAll('.square')
        allsquares.forEach(square =>square.firstChild?.setAttribute('draggable',false))
    }
    if(!kings.some(king => king.firstChild.classList.contains('black'))){
        display.innerHTML="White player wins!"
        info.innerHTML= "Game over!"
        const allsquares = document.querySelectorAll('.square')
        allsquares.forEach(square =>square.firstChild?.setAttribute('draggable',false))
    }   

}