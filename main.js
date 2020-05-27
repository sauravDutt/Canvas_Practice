const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');


var mouse = {
    x: undefined,
    y: undefined
};

var maxRadius = 50;
// var minRadius = 2;

var colorArray = [
    '#5C257F',
    '#933CCC',
    '#B84BFF',
    '#D697FF',
    '#6B4C7F',
];

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y; 
});

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

 
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function () {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0 ) {
            this.dx = -this.dx;
        }
    
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0 ) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        //interactivity
         if (mouse.x-this.x<50 && mouse.x-this.x>-50 && mouse.y-this.y<50 && mouse.y-this.y>-50) {
             if (this.radius < maxRadius) {
                this.radius +=1;
             }
         } else  if(this.radius > this.minRadius){
             this.radius -= 1;
         }

        this.draw();
    }
}



var circleArray = [];

function init() {
    
    circleArray = [];
    for (var i = 0; i < 4000; i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random()*(innerWidth-radius*2)+radius;
        var y = Math.random()*(innerHeight-radius*2)+radius;
        var dx = (Math.random()-0.5); 
        var dy = (Math.random()-0.5);
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}




function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight); 
    
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    
}



init();
animate();


const snakee = document.querySelector('#canvasTwo');
const ctx = snakee.getContext("2d");

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// create the score var

let score = 0;

//control the snake

let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "#562974" : "#8a54ad";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "#562974";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "#562974";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

// call draw function every 100 ms

let game = setInterval(draw,100);


// Bike Game
const bike = document.querySelector('#canvasThree');


bike.width = window.innerWidth;
bike.height = 300;
const ctxbike = bike.getContext('2d');

var perm = [];
while(perm.length < 255) {
    while(perm.includes(val = Math.floor(Math.random()*255)));
    perm.push(val);
}

var lerp = (a,b,t) => a + (b-a) * (1-Math.cos(t*Math.PI))/2;
var noise = x => {
    x = x * 0.006 % 255;
    return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
}

var player = new function() {
    this.x = bike.width/2;
    this.y = 0;
    this.ySpeed = 0;
    this.rot = 0;

    this.img = new Image();
    this.img.src = "img/moto.png";
    this.draw = function() {
        var p1 = bike.height - noise(t + this.x) * 0.25
        var p2 = bike.height - noise(t+5 + this.x) * 0.25
        if (p1-15 > this.y) {
            this.ySpeed += 0.1;
        }else {
            this.ySpeed -= this.y - (p1-15);
            this.y = p1-15;
        }
        var angle = Math.atan2((p2-15) - this.y, (this.x + 5) - this.x);
        this.y += this.ySpeed;

        ctxbike.save();
        ctxbike.translate(this.x, this.y);
        ctxbike.rotate(this.rot);
        ctxbike.drawImage(this.img, -15, -15, 70, 55);
        ctxbike.restore();
    }
}

var t = 0;
function loop() {
    t += 5;
    ctxbike.fillStyle = "#fff";
    ctxbike.fillRect (0, 0, bike.width, bike.height);

    ctxbike.fillStyle = "#8a54ad"
    ctxbike.beginPath();
    ctxbike.moveTo(0, bike.height);
    for (let i = 0; i < bike.width; i++)
        ctxbike.lineTo(i, bike.height - noise(t + i) * 0.25);

    
    ctxbike.lineTo(bike.width, bike.height);
    ctxbike.fill();

    player.draw();
    requestAnimationFrame(loop);
}

loop();


AOS.init({
    easin: 'ease',
    duration: 1800
});
