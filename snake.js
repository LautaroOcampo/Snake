let game = document.getElementById("game")
let start = document.getElementById("start")
let pixel = document.getElementsByClassName("pixel")
let r = 5
let c = 6 
let array = []
let snake = document.getElementsByClassName("snake")
let scoreJS = 0
let score = document.getElementsByClassName("score")
let playing = false
let rows = [[],[],[],[],[],[],[],[],[],[],[],[]]
let array2 = []
let array3 = []
let a = 0
let i = 0


const pushArrays = (row, indexA, indexB) => {
    for(let i = indexA ; i < indexB ; i++){
        rows[row].push(pixel[i])
    }
}

const movement = () => {

    window.addEventListener("keydown",(e) => {
        if(e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowDown"){
            if (e.key !== array[i - 1]) {
                array.push(e.key)
                i++
            }
            if(array[0] === "ArrowLeft"){
                array.pop()
                i--
            }
        }
    })
    array3 = [rows[5][4],rows[5][5],rows[5][6]]
    for(ele of array3){
        ele.classList.add("snake")
    }
    
    let interval = setInterval(() => {
        if(array[array.length - 1] !== undefined && array2[array2.length - 1] !== array[array.length - 1]){
            array2.push(array[array.length - 1])
        }
        if(playing){
            try{
                if(array2[array2.length - 1] === "ArrowRight"){
                    if(array2[array2.length - 2] === "ArrowLeft" ){
                        array2[array2.length - 1] = "ArrowLeft"
                        leftMovement(array3)
                    }else{
                        rightMovement(array3)
                    }
                }
                else if(array2[array2.length - 1] === "ArrowLeft"){
                    if(array2[array2.length - 2] === "ArrowRight" ){
                        array2[array2.length - 1] = "ArrowRight"
                        rightMovement(array3)
                    }
                    else{
                        leftMovement(array3)
                    }
                }
                else if(array2[array2.length - 1] === "ArrowUp"){
                    if(array2[array2.length - 2] === "ArrowDown" ){
                        array2[array2.length - 1] = "ArrowDown"
                        downMovement(array3)
                    }
                    else{
                        upMovement(array3)
                    }
                }
                else if(array2[array2.length - 1] === "ArrowDown"){
                    if(array2[array2.length - 2] === "ArrowUp" ){
                        array2[array2.length - 1] = "ArrowUp"
                        upMovement(array3)
                    }
                    else{
                        downMovement(array3)
                    }
                }
                sumarPuntos()
            }
            catch(error){
                gameOver()
            }
    }else{
        clearInterval(interval)
    }
    },200)
}

let apple = () => {
    let random = Math.floor(Math.random() * 240)
    if(pixel[random].classList.contains("snake")){
        apple()
    }
    else{
        pixel[random].classList.add("apple")
    }

}

const sumarPuntos = () => {
    add = false
    for(let i = 0 ; i < snake.length ; i++) {
        if(snake[i].classList.contains("apple")){
            snake[i].classList.remove("apple")
            scoreJS++
            score[0].innerHTML = `SCORE: ${scoreJS}`
            apple()
            add = true
        }
    }
}

const rightMovement = (param) => {
    c++
    if(!rows[r][c].classList.contains("snake")){
        rows[r][c].classList.add("snake")
        param.push(rows[r][c])
        if(!add){
            param.shift().classList.remove("snake")
        }
    }
    else{
        gameOver()
    }
}

const leftMovement = (param) => {
    c--
    if(!rows[r][c].classList.contains("snake")){
        rows[r][c].classList.add("snake")
        param.push(rows[r][c])
        if(!add){
            param.shift().classList.remove("snake")
        }
    }
    else{
        gameOver()
    }
}

const downMovement = (param) => {
    r++
    if(!rows[r][c].classList.contains("snake")){
        rows[r][c].classList.add("snake")
        param.push(rows[r][c])
        if(!add){
            param.shift().classList.remove("snake")
        }
    }
    else{
        gameOver()
    }
}
const upMovement = (param) => {
    r--
    if(!rows[r][c].classList.contains("snake")){
        rows[r][c].classList.add("snake")
        param.push(rows[r][c])
        if(!add){
            param.shift().classList.remove("snake")
        }
    }
    else{
        gameOver()
    }
}

const gameOver = () => {
    playing = false
    game.innerHTML = ""
    score[0].innerHTML = ""
    let div = document.createElement("div")
    div.className = "restart-div"
    div.innerHTML = `
    <p class="score-restart">SCORE</p>
    <p class="number-restart">${scoreJS}</p>
    <p class="retry-restart" id="retry">RETRY</p>`

    game.append(div)
    document.getElementById("retry").addEventListener("click", () => {
        stopGame()
        startGame()
    })
}

const startGame = () => {
    playing = true
    scoreJS = 0
    game.innerHTML = ""
    for(let i = 0 ; i < 12 ; i++){
        let div = document.createElement("div")
        div.className = "row"
        div.innerHTML = `
        <div class="pixel">
        </div>
        <div class="pixel">
        </div>
        <div class="pixel">
        </div>
        <div class="pixel">
        </div>
        <div class="pixel">
        </div>
        <div class="pixel">
        </div>
        <div class="pixel">
        </div>
        <div class="pixel">
        </div>
        <div class="pixel">
        </div>
        <div class="pixel">
        </div>
        <div class="pixel">
        </div>
        <div class="pixel">
        </div>
        <div class="pixel">
        </div>
        <div class="pixel">
        </div>
        <div class="pixel">
        </div>
        <div class="pixel">
        </div>
        <div class="pixel">
        </div>
        <div class="pixel">
        </div>
        <div class="pixel">
        </div>
        <div class="pixel">
        </div>

        `
        game.append(div)
    }
    let div = document.createElement("div")
    div.className = "score"
    div.innerHTML = `SCORE: <span id = "score">0</span>`
    document.body.append(div)
    pushArrays(0, 0, 20)
    pushArrays(1, 20, 40)
    pushArrays(2, 40, 60)
    pushArrays(3, 60, 80)
    pushArrays(4, 80, 100)
    pushArrays(5, 100, 120)
    pushArrays(6, 120, 140)
    pushArrays(7, 140, 160)
    pushArrays(8, 160, 180)
    pushArrays(9, 180, 200)
    pushArrays(10, 200, 220)
    pushArrays(11, 220, 240)
    apple()
    movement()
}
start.addEventListener("click", startGame)

const stopGame = () => {
    r = 5
    c = 6
    i = 0
    rows = [[],[],[],[],[],[],[],[],[],[],[],[]]
    array2 = []
    array = []
    score[0].remove()
}