let inputDir = {
    x:0,
    y:0,
};
const foods = new Audio('food.mp3');
const move = new Audio('move.mp3');
const music = new Audio('music.mp3');
const gameover = new Audio('gameover.mp3');
let speed = 7;
let lastpaintime = 0;
let snakearray = [
    {x:13,y:15}
];

let food = {
    x:6,
    y:7
}
score = 0;

let highscoreval = 0;
// game function9
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastpaintime )/1000  < 1/speed){
        return;
    }
    lastpaintime = ctime;
    gameengine();
}

function isCollide(snake){
   for (let i = 1; i < snakearray.length; i++) {
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y ){
        return true;
    }
   }

   if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
   return true;
   }
}

function gameengine(){
    // part1 updating the snake and food
    if(isCollide(snakearray)){
        gameover.play();
        music.pause();
        inputDir = {x:0,y:0};
        alert("game over ! press any key to play again...");
        snakearray = [{x:13,y:15}];
        music.play();
        score = 0;
    }

    // if you have to eten the food ,incement the score and regenerate the food
     if(snakearray[0].y === food.y && snakearray[0].x === food.x){
        foods.play();
        score += 1;
        if(score>highscoreval){
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highscorebox.innerHTML = "HighScore: " + highscoreval;
        }
        scorebox.innerHTML = "Score: " + score;
       snakearray.unshift({x: snakearray[0].x + inputDir.x , y: snakearray[0].y + inputDir.y});
       let a = 2;
       let b = 16;
       food = {x: Math.round(a + (b-a)* Math.random()),y: Math.round(a + (b-a)* Math.random())}
     }
    
    //  moving the snake 
   for (let i = snakearray.length - 2; i>=0; i--) {
    snakearray[i+1] = {...snakearray[i]}
   }
   snakearray[0].x +=  inputDir.x;
   snakearray[0].y +=  inputDir.y;

    // prt2 display the food and snake
    // display the snake
    document.querySelector(".board").innerHTML = "";
    snakearray.forEach((e,index)=>{
    snakeelement = document.createElement("div");
    snakeelement.style.gridRowStart = e.y;
    snakeelement.style.gridColumnStart = e.x;
    
    if(index === 0){
        snakeelement.classList.add("head");
    }
    else{
        snakeelement.classList.add("snake");
    }
    document.querySelector(".board").appendChild(snakeelement);
    });
    // display the food
  
        foodelement = document.createElement("div");
        foodelement.style.gridRowStart = food.y;
        foodelement.style.gridColumnStart = food.x;
        foodelement.classList.add("food");
        document.querySelector(".board").appendChild(foodelement);

}


// game logic
let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
}
else{
    highscoreval = JSON.parse(highscore)
    highscorebox.innerHTML = "HighScore: " + highscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown",(e)=>{
    inputDir = {x:0,y:1}  //start the game
    move.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowrRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})