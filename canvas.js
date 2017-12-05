// Drawing and animating circles with random velocity and color

// Report JS file connected

console.log("js connected");

// Set up the canvas and make full screen

var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set 2D context

var ctx = canvas.getContext("2d");

// Colors arrray for circle fill

var colors = [
    "#A7C7C5",
    "#09504F",
    "#172A40",
    "#FFF7DC",
    "#D9383A"
    ]

// Mouse coordiantes

var mouse = {
    x: undefined,
    y: undefined
};

var maxRad = 100;

// Event Listeners

// Capture Mouse movement

window.addEventListener("mousemove", 
    function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Responsive Canvas

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

// Create Circle function

function Circle(x,y,dx,dy,rad,color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    var minRad = rad;
    this.color = color;
    
    // Draw circle function
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI *2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
    };
    
    // Update circle position for animation
    this.update = function() {
        
        // Left/Right Collision Detection for window
        if (this.x + this.rad > window.innerWidth || 
            this.x - this.rad < 0) {
            this.dx = -this.dx;
        } 
        
        // Top/Bottom Collision Detection for window
        if (this.y + this.rad > window.innerHeight || 
            this.y - this.rad < 0) {
            this.dy = -this.dy;
        }
        
        // Increment position (x,y)
        this.x += this.dx;
        this.y += this.dy;
        
        // Interactivity (mouse and circles)
        // Mouse detection for circle
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            // Limit circle grow size
            if (this.rad < maxRad) {
                this.rad += 1;   
            }
        // Limit circle shrink size    
        } else if (this.rad > minRad) {
            this.rad -= 1;
        } else if (this.rad < this.minRad) {
            this.rad += 1;
        }
        
        // Draw Circle
        this.draw();
        
    };
}

// Create circles array
var circles = [];

function init() {
    
    // Reset circles array
    circles = [];
    
    // Randomize circle value (position, velocity, fill and stroke color, and opacity)
    for (var i = 0; i < 800; i++) {
        var rad = (Math.floor(Math.random() * 4)) + 1;
        var x = Math.random() * (window.innerWidth - rad * 2) + rad;
        var y = Math.random() * (window.innerHeight -rad * 2) + rad;
        var dx = (Math.random() - 0.5) * 3;
        var dy = (Math.random() - 0.5) * 3;
        var color = colors[Math.floor(Math.random() * colors.length)];
        circles.push(new Circle(x,y,dx,dy,rad,color));
        
        console.log(circles);
    }
}

//  Animation function
function animation() {
    //Start loop
    requestAnimationFrame(animation);
    // Clear window after drawing circle
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
    // Draw the circles
    for (var i = 0; i < circles.length; i++) {
        circles[i].update();
    }
    
}

// Run 
animation();
init();