import Sketch from 'react-p5';



function Screen() {

    //Varbiles 
    let canvas;
    let clearButton;
    let saveButton;
    // let words;
    let choice;


    function setup(p5) {

        canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        canvas.position(0, 0);

        //background 

        p5.background(39, 68, 113);


        createDrawButton(p5);
        createSaveButton(p5);
        createWords(p5);

    }


    function draw(p5) {
        p5.stroke(0, 225, 0);

        if (p5.mouseIsPressed === true) {
            p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
        }

        console.log(choice);
        createWords(p5);

    }



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
        p5.background(225);
        console.log('Cleared');
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

