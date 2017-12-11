// Drawing and animating circles with random velocity and color

// Report JS file connected

console.log("js connected");

// Set up the canvas and make full screen

var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set 2D context

var ctx = canvas.getContext("2d");

// Mouse coordiantes

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

// Responsive Canvas

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Utility Functions

function randomIntFromRange(min, max) {
    return Math.random() * (max - min + 1) + min;
}

// Create Circle function

function Circle(x,y,dx,dy,rad,color, boundaryRight, boundaryLeft) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    this.boundaryRight = boundaryRight;
    this.boundaryLeft = boundaryLeft;
    var minRad = rad;
    var maxRad = (rad * 2);
    this.color = color;
    
    // Draw circle function
    
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI *2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    };
    
    // Update circle position for animation
    
    this.update = function() {
        
        // Move circle to top once it reaches bottom
        
        if(this.y + this.rad < 0) {
            this.y = window.innerHeight;
        }
        
        if(this.x > boundaryRight || this.x < boundaryLeft) {
            this.dx = -this.dx;
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
    
    for (var i = 0; i < 100; i++) {
        var rad = randomIntFromRange(2,4);
        var x = Math.random() * (window.innerWidth - rad * 2);
        var y = Math.random() * (window.innerHeight - rad * 2);
        var dx = 0.2;
        var dy = -randomIntFromRange(0.2,0.3);
        var color = "white";
        var boundaryRight = x + rad;
        var boundaryLeft = x - rad;
        console.log(dy);
        circles.push(new Circle(x,y,dx,dy,rad,color,boundaryRight,boundaryLeft));
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