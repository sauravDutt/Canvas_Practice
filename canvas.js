// For working with Canvas we first havto make a variable as bello
const canvas = document.querySelector('canvas');

//To set the hight and width of the entire screen 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//This is how we draw on the canvas getContext('2d'), means to draw 2d figurs
const c = canvas.getContext('2d');
//the .fillRect function require 4 parimeters (x, y, width, height)
// c.fillStyle = "#ccc"; //This is how we add color to the rectangle
// c.fillRect(100, 100, 100, 100);
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = "rgba(255, 0, 0, 0.5)"; //To change the color of other rectangles we just havto pass the fillStyle before the rectangle
// c.fillRect(300, 300, 100, 100);
// c.fillRect(600, 200, 100, 100);
//With c we can draw the following shapes :-
// 1.Rectangles, as shown Above
// 2.Lines
// 3.Arcs/Circles
// 4.Bezier Curves
// 5.Images
// 6.Text

console.log(canvas);

// Lines
// c.beginPath();
// //Where on the Canvas we want to start our path
// //so for that we use the following function .moveTo(x,y)
// c.moveTo(50, 300); //This will not be visible untill we call a strok mathod.
// c.lineTo(300, 100); //This will not be visible untill we call a strok mathod.
// c.lineTo(400, 300); //We can keep on extending our line

// c.strokeStyle = "#fa34a3"; //this can include any css color hexa or rgba or rgb.
// c.stroke();

// Arc / Circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI*2, false);
// c.strokeStyle = 'blue';
// c.stroke();

// for (var i = 0; i < 100; i++){
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight; 
//     var r = Math.random() * 500;
//     var g = Math.random() * 10;
//     var b = Math.random() * 300;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI*2, false);
//     c.strokeStyle = `rgb(${r}, ${g}, ${b})`;
//     c.stroke();
// }

// Now for creating the mouse move effect :- 

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

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y; 
});

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

// For creating multipal circles we will be useing Object Oriented JavaScript
// The following is how we make an object in js
// We define a Function with the first letter of the function name capitel.
 
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

// var x = Math.random()*innerWidth;
// var y = Math.random()*innerHeight;
// var dx = (Math.random()-0.5) * 8; 
// var dy = (Math.random()-0.5) * 8;
// var radius = 30;

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

// We are going to make the circle move around in the canvas
//For animating any shape we havto define a function
//we can name the function anything,
//Inside the function we havto call a function called requestAnimationFrame(_functionName_) as shown in the code below


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight); // this clear Rect mathod is like the fillRect method as discussed above this method clearsss the canvas takes 4 parameters - x, y, width and hight.
    
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    
}



init();
animate();
