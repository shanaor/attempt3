const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const GRAVITY = 0.5;
const JUMP_STRENGTH = 10;
const MOVEMENT_SPEED = 5;
const ATTACK_RADIUS = 50;

// Game state
const keys = {};
let player1, player2;

function init() {
    player1 = new Character(100, canvas.height - 50, 'blue');
    player2 = new Character(canvas.width - 150, canvas.height - 50, 'red');
    addEventListeners();
    gameLoop();
}

function addEventListeners() {
    window.addEventListener('keydown', (e) => keys[e.code] = true);
    window.addEventListener('keyup', (e) => keys[e.code] = false);
}

class Character {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.color = color;
        this.velX = 0;
        this.velY = 0;
        this.jumping = false;
        this.attacking = false;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        // Movement controls
        if (keys['ArrowRight']) this.x += MOVEMENT_SPEED;
        if (keys['ArrowLeft']) this.x -= MOVEMENT_SPEED;
        if (keys['Space'] && !this.jumping) {
            this.velY = -JUMP_STRENGTH;
            this.jumping = true;
        }

        // Update position
        this.velY += GRAVITY;
        this.y += this.velY;
        this.x = Math.max(0, Math.min(this.x, canvas.width - this.width));

        // Check for ground collision
        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
            this.velY = 0;
            this.jumping = false;
        }

        // Handle attacks
        if (this.attacking) {
            this.attack();
        }
    } 

    attack() {
        // Implement attack logic
        if (this.color === 'blue') {
            // Blue player attack
            if (Math.abs(player2.x - this.x) < ATTACK_RADIUS) {
                console.log('Player 1 hits Player 2!');
            }
        } else {
            // Red player attack
            if (Math.abs(player1.x - this.x) < ATTACK_RADIUS) {
                console.log('Player 2 hits Player 1!');
            }
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player1.update();
    player2.update();
    player1.draw();
    player2.draw();

    requestAnimationFrame(gameLoop);
}

init();
