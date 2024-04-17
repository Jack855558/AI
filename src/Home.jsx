import React, { useEffect, useState } from 'react';
import Sketch from 'react-p5';
import Button from './Button';
// import './Home.css';

function Home() {
    const [fontSize, setFontSize] = useState(60); // Initial font size
    const [textTop, setTextTop] = useState('30%'); // Initial vertical position

    let dots = [];

    function setup(p5, canvasParentRef) {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

        // Create 100 dots for the background
        for (let i = 0; i < 100; i++) {
            dots.push(new Dot(p5));
        }
    }

    function draw(p5) {
        p5.background(30);

        // Update and display each dot
        for (let i = 0; i < dots.length; i++) {
            dots[i].update(p5);
            dots[i].display(p5);
        }
    }

    class Dot {
        constructor(p5) {
            this.x = p5.random(p5.windowWidth);
            this.y = p5.random(p5.windowHeight);
            this.diameter = p5.random(10, 15);
            this.speed = p5.random(.1, .3);
            this.directionX = p5.random(-1, 1);
            this.directionY = p5.random(-1, 1);
        }
        update(p5) {
            // Move the Dot
            this.x += this.speed * this.directionX;
            this.y += this.speed * this.directionY;

            // Change direction if the dot reaches the edge
            if (this.x <= 0 || this.x >= p5.windowWidth) { this.directionX *= -1 }
            if (this.y <= 0 || this.y >= p5.windowHeight) { this.directionY *= -1 }
        }
        display(p5) {
            p5.noStroke();
            p5.fill(225, 150);
            p5.ellipse(this.x, this.y, this.diameter);
        }
    }

    useEffect(() => {
        const handleResize = () => {
            // Set font size based on screen width
            const newFontSize = Math.min(60, Math.max(30, window.innerWidth / 30));
            setFontSize(newFontSize);
            // Adjust the vertical position to keep the text centered
            const newTop = `${(window.innerHeight - newFontSize) / 2 - 75}px`;
            setTextTop(newTop);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call handleResize once to set initial font size and position
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Watch for changes in screen size

    function textStyle() {
        return {
            position: 'absolute',
            top: textTop,
            left: '50%', // Center horizontally
            transform: 'translateX(-50%)', // Center horizontally
            fontSize: `${fontSize}px`, // Dynamic font size
            color: '#FFFFFF',
            textAlign: 'center', // Center text
            whiteSpace: 'nowrap', // Prevent text from wrapping to new lines
        };
    }

    return (
        <div>
            <Sketch setup={setup} draw={draw} />
            <Button />
            <strong style={textStyle()} className="text-style">Begin Drawing and Let A.I. Finish the Drawing</strong>
        </div>
    );
}

export default Home;
