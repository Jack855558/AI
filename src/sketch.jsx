import Sketch from 'react-p5';



function Screen() {

    //Varbiles 
    let canvas;
    let clearButton;
    let saveButton;
    // let words;
    let choice;

    let model;

    //let x;
    //let y;
    // let strokePath;
    // let previousPen = 'down';
    let seedStrokes = [];
    let userStroke;


    function setup(p5) {

        canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        canvas.position(0, 0);

        //background 

        p5.background(160);


        // model = ml5.sketchRNN(choice, modelReady); 

        createDrawButton(p5);
        createSaveButton(p5);

        console.log(choice);
        createWords(p5);

    }


    function draw(p5) {

        if (p5.mouseIsPressed) {
            // Draw line
            p5.stroke(0);
            p5.strokeWeight(3.0);
            p5.line(p5.pmouseX, p5.pmouseY, p5.mouseX, p5.mouseY);
            // Create a "stroke path" with dx, dy, and pen
            userStroke = {
                dx: p5.mouseX - p5.pmouseX,
                dy: p5.mouseY - p5.pmouseY,
                pen: 'down'
            };

            seedStrokes.push(userStroke);
            console.log(seedStrokes);

        }
    }

    // function startSketchRNN(){
    //     //Start where mouse was last pressed
    //     x = mouseX; 
    //     y = mouseY; 
    //     
    //     .generate(seed, callback)
    //     model.generate(seedStrokes, gotStrokes); 
    // }

    // A new stroke path
    // function gotStroke(err, s) {
    //     strokePath = s;
    //  }

    // function modelReady (p5){
    //     p5.canvas.p5.mouseReleased(startSketchRNN); 
    // }


    function createDrawButton(p5) {
        clearButton = p5.createButton('New Drawing');
        clearButton.position(p5.windowWidth * .5, p5.windowHeight * .8);
        clearButton.mousePressed(function () { clearDrawing(p5) });
    }

    function createSaveButton(p5) {
        saveButton = p5.createButton('Save')
        saveButton.position(p5.windowWidth * .75, p5.windowHeight * .9);
    }


    function clearDrawing(p5) {
        p5.background(160);
        console.log('Cleared');
        createWords(p5);
        seedStrokes = [];
    }

    function createWords(p5) {
        p5.textSize(50);
        if (choice === undefined) { p5.text('Choose something to draw, then let A.I. finish it', p5.windowWidth * .1, p5.windowHeight * .1) } else { p5.text(`Begin drawing a ${choice}, then let A.I. finsih it`, p5.windowWidth * .1, p5.windowHeight * .1); }

    }


    function windowResized(p5) {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        createDrawButton(p5);
        createSaveButton(p5);
    }

    return <Sketch setup={setup} draw={draw} windowResized={windowResized} />

}

export default Screen;

