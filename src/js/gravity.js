// Initial Setup
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables

// 

var mouse = {
    x: undefined,
    y: undefined
};

// Event Listeners

// Capture Mouse movement

window.addEventListener("mousemove", 
    function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
const gravity = 1;
var friction = 0.9;

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

addEventListener('click', function() {
    init();
});

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// Objects
function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    
    this.update = function() {
        
        if(this.x > canvas.width - this.radius || this.x < 0 + this.radius) {
            this.dx = -this.dx * friction;
        }
        
        if(this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction;
            this.dx = this.dx * friction
        } else {
            this.dy += gravity;
        }
        
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };
    
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = "#333";
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };
    
}

// Implementation

var ball;
var ballArray;

function init() {
    
    ballArray = [];
    
    for(var i = 0; i < 100; i++) {
        var radius = randomIntFromRange(5,50);
        var x = randomIntFromRange(radius, canvas.width - radius);
        var y = randomIntFromRange(radius, canvas.height - radius);
        var dx = randomIntFromRange(-2,2);
        var dy = randomIntFromRange(-2,2);
        var color = randomColor(colors);
        ballArray.push(new Ball(x,y,dx,dy,radius,color));
    }
    
    console.log(ballArray);
    
}

// Animation Loop
function animate() {
    
    requestAnimationFrame(animate);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(var i = 0; i < ballArray.length; i++) {
        ballArray[i].update();
    }
}

init();
animate();
