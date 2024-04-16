import Sketch from 'react-p5';
import { Link } from 'react-router-dom';

function Home() {

    let dots = [];


    function setup(p5, canvasParentRef) {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

        //Create 100 dots for the background
        for (let i = 0; i < 100; i++) {
            dots.push(new Dot(p5));
        }
    }

    function draw(p5) {
        p5.background(30);



        //update and display each dot
        for (let i = 0; i < dots.length; i++) {
            dots[i].update(p5);
            dots[i].display(p5);
        }

        // Draw square
        p5.fill(150);
        p5.rect(p5.width * 0.15, p5.height * 0.25, p5.width * 0.7, p5.height * 0.5);
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
            //Move the Dot
            this.x += this.speed * this.directionX;
            this.y += this.speed * this.directionY;

            //Change direction if the dot reaches the edge
            if (this.x <= 0 || this.x >= p5.windowWidth) { this.directionX *= -1 }
            if (this.y <= 0 || this.y >= p5.windowHeight) { this.directionY *= -1 }
        }
        display(p5) {
            p5.noStroke();
            p5.fill(225, 150);
            p5.ellipse(this.x, this.y, this.diameter);
        }
    }

    function buttonStyle() {
        return {
            padding: '10px',
            fontSize: '16px',
            position: 'absolute',
            top: '50%',
            left: '45%', // middle of the screen
        };
    }

    function textStyle() {
        return {
            position: 'absolute',
            top: '30%',
            left: '24%',
            fontSize: '58px',
        }
    }

    function selectStyle() {
        return {
            position: 'absolute',
            top: '60%',
            left: '24%',
        }
    }

    return (<div>
        <Sketch setup={setup} draw={draw} />
        <Link to="/draw" style={{ ...buttonStyle() }}>
            <button style={{ ...buttonStyle() }}>Start</button>
        </Link>
        <strong style={{ ...textStyle() }}>Chose Something to Draw</strong>
        <select style={{ ...selectStyle() }}>
            <option value="Bicycle">Bicycle</option>
            <option value="Bus">Bus</option>
            <option value="Cat">Cat</option>
            <option value="Dog">Dog</option>
            <option value="Face">Face</option>
            <option value="Flower">Flower</option>
            <option value="Helicopter">Helicopter</option>
            <option value="Sheep">Sheep</option>
            <option value="Octupus">Octupus</option>
            <option value="Penguin">Penguin</option>
            <option value="Pig">Pig</option>
        </select>
    </div>)
}

export default Home; 