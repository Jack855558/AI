import Sketch from 'react-p5';



function Screen() {

    //Varbiles 
    let canvas;
    let drop;
    let clearButton;
    let saveButton;
    let inputName;
    // let words;
    let choice;


    function setup(p5) {

        canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        canvas.position(0, 0);

        //background 

        p5.background(39, 68, 113);

        //Create Screen Elements 
        createDrop(p5);
        createDrawButton(p5);
        createSaveButton(p5);
        createInputName(p5);
        createWords(p5);

    }


    function draw(p5) {
        p5.stroke(0, 225, 0);

        if (p5.mouseIsPressed === true) {
            p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
        }

        drop.changed(handleSelectChange);
        console.log(choice);
        createWords(p5);

    }

    function createDrop(p5) {

        drop = p5.createSelect();
        drop.position(p5.windowWidth * .4, p5.windowHeight * .1);
        drop.option('Dog');
        drop.option('Bus'); drop.option('Bicycle'); drop.option('Cat');
        drop.option('Face'); drop.option('Flower'); drop.option('Helicopter');
        drop.option('Sheep'); drop.option('Octopus'); drop.option('Penguin'); drop.option('Pig');

    }



    function createDrawButton(p5) {
        clearButton = p5.createButton('New Drawing');
        clearButton.position(p5.windowWidth * .5, p5.windowHeight * .1);
        clearButton.mousePressed(function () { clearDrawing(p5) });
    }

    function createSaveButton(p5) {
        saveButton = p5.createButton('Save')
        saveButton.position(p5.windowWidth * .75, p5.windowHeight * .9);
    }

    function createInputName(p5) {

        inputName = p5.createInput('Give the image a name to save');
        inputName.position(p5.windowWidth * .25, p5.windowHeight * .9);
        inputName.size(p5.windowWidth * .3, p5.windowHeight * .05);

    }

    function clearDrawing(p5) {
        p5.background(225);
        console.log('Cleared');
    }

    function createWords(p5) {
        p5.textSize(50);
        if (choice === undefined) { p5.text('Choose something to draw, then let A.I. finish it', p5.windowWidth * .1, p5.windowHeight * .1) } else { p5.text(`Begin drawing a ${choice}, then let A.I. finsih it`, p5.windowWidth * .1, p5.windowHeight * .1); }

    }


    function handleSelectChange(event) {
        choice = event.target.value;
    }


    function windowResized(p5) {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        createDrop(p5);
        createDrawButton(p5);
        createSaveButton(p5);
        createInputName(p5);
    }

    return <Sketch setup={setup} draw={draw} windowResized={windowResized} />

}

export default Screen;

