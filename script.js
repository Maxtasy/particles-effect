const particles = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    const particlesAmount = Math.floor(window.innerWidth / 10);

    for (let i = 0; i < particlesAmount; i++) {
        particles.push(new Particle);
    }
}

function draw() {
    background("#298026");
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        particle.connect(particles.slice(index));
    });
}

class Particle {
    constructor() {
        // Position
        this.pos = createVector(random(width), random(height));
        // Size
        this.size = 10;
        // Velocity
        this.vel = createVector(random(-2, 2), random(-2, 2));
    }

    // Update new position of particle
    update() {
        this.pos.add(this.vel);
        this.edges();
    }

    // Draw particle
    draw() {
        noStroke();
        fill("rgba(12,232,68,0.5)");
        circle(this.pos.x, this.pos.y, this.size); 
    }

    // Bounce particles off edges
    edges() {
        if (this.pos.x < 0 || this.pos.x > window.innerWidth) {
            this.vel.x *= -1;
        }
        if (this.pos.y < 0 || this.pos.y > window.innerHeight) {
            this.vel.y *= -1;
        }
    }

    // Connect particles that are close to each other with a line
    connect(particles) {
        particles.forEach(particle => {
            const distance = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
            if (distance < 120) {
                stroke("rgba(255,255,255,0.1)");
                line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
            }
        });
    }
}