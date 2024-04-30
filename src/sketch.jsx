//Import Libaries
import Sketch from 'react-p5';
import * as ml5 from 'ml5';
import ReactDOM from 'react-dom';
import { google } from 'googleapis';

function Screen() {

    // AI should only draw when shouldGenerate = true
    let shouldGenerate = false;

    //Screen Varibles
    let canvas;
    let clearButton;
    let saveButton;

    //ML5 Varibles
    let model;
    let x;
    let y;
    let strokePath;
    let previousPen = 'down';
    let seedStrokes = [];
    let userStroke;



    //Current Model Being Drawn
    let choice = 'face';

    //Model Options
    let modelOptions = ['face', 'dog', 'cat', 'pig', 'bus', 'eye', 'flower', 'crab', 'rabbit', 'penguin', 'dolphin', 'helicopter', 'lighthouse', 'owl', 'butterfly', 'pineapple', 'octopus'];

    function setup(p5, canvasParentRef) {

        // Create canvas
        const canvasWidth = p5.windowWidth;
        const canvasHeight = p5.windowHeight;
        canvas = p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
        canvas.position(0, 0); // Position canvas at top-left corner

        //Create Background Color
        p5.background(160);

        //Start Model on Face
        loadModel(choice, p5);
        console.log(choice);

        //Draw Screen Elements
        createButtons(p5);
        showModels(p5);

        // Display "Loading model" for 1 seconds
        createWords(p5, 'Loading model...');
        setTimeout(() => {
            createWords(p5);
        }, 1000);
    }

    function draw(p5) {

        //Draw a line if the mouse is pressed
        if (p5.mouseIsPressed) {
            p5.stroke(0);
            p5.strokeWeight(3.0);
            p5.line(p5.pmouseX, p5.pmouseY, p5.mouseX, p5.mouseY);
            userStroke = {
                dx: p5.mouseX - p5.pmouseX,
                dy: p5.mouseY - p5.pmouseY,
                pen: 'down'
            };
            seedStrokes.push(userStroke);
            console.log(seedStrokes);
        }

        // AI checks if there should be a new drawing
        if (shouldGenerate && strokePath) {
            if (previousPen === 'down') {
                p5.stroke(0);
                p5.strokeWeight(3.0);
                p5.line(x, y, x + strokePath.dx, y + strokePath.dy);
            }
            x += strokePath.dx;
            y += strokePath.dy;
            previousPen = strokePath.pen;

            if (strokePath.pen !== 'end') {
                strokePath = null;
                model.generate(gotStroke);
            }
        }
    }

    //Loads Model from ML5 library
    function loadModel(name, p5) {
        model = ml5.sketchRNN(name, () => modelReady(p5));
    }


    function startSketchRNN(p5) {
        // Start where mouse was last pressed
        x = p5.mouseX;
        y = p5.mouseY;

        // .generate(seed, callback) is ml5 function to create a sketch
        model.generate(seedStrokes, gotStroke);
    }

    // Callback function
    function gotStroke(err, s) {
        strokePath = s;
    }

    //Begins the model when the mouse is released and starts the sketch
    function modelReady(p5) {
        console.log('Model Ready');
        canvas.mouseReleased(() => {
            console.log('Model will Start');
            shouldGenerate = true;
            startSketchRNN(p5);
        });
    }

    //Create Style for each of the buttons
    function setButtonStyles(button, styles) {
        const buttonElement = button.elt;
        Object.keys(styles).forEach(style => {
            buttonElement.style[style] = styles[style];
        });
    }

    //Create the buttons on screen
    function createButtons(p5) {
        // Adjusted button height and width
        const windowHeightRatio = p5.windowHeight / 100;
        const windowWidthRatio = p5.windowWidth / 100;
        const buttonHeight = 12 * windowHeightRatio;

        // Total width minus margins
        const availableWidth = p5.windowWidth - 10 * windowWidthRatio;

        // Divide by 2 buttons and subtract spacing
        const buttonWidth = availableWidth / 2 - 7 * windowWidthRatio;
        const buttonSpacing = 2 * windowWidthRatio;

        // Small offset to the right
        const xOffset = 15 * windowWidthRatio;

        // Change button color on hover
        function handleHover(button) {
            button.style('background-color', 'rgba(100, 100, 100, 0.75)'); // Change 
        }

        // Function button color back when un-hover
        function handleHoverEnd(button) {
            button.style('background-color', 'rgba(80, 80, 80, 0.7)');
        }

        //Create Clear Button
        clearButton = p5.createButton('Clear');
        clearButton.position(buttonSpacing + xOffset, p5.windowHeight - buttonHeight - 20);
        setButtonStyles(clearButton, {
            'background-color': 'rgba(80, 80, 80, 0.7)',
            'border': 'none',
            'border-radius': '20px',
            'color': 'white',
            'padding': '20px 40px',
            'font-size': '35px',
            'width': `${buttonWidth}px`,
            'height': `${buttonHeight}px`,
        });

        //Add function when clear button is clicked
        clearButton.mousePressed(function () { clearDrawing(p5) });

        //Add Hover for Clear Button
        clearButton.mouseOver(function () { handleHover(clearButton); });
        clearButton.mouseOut(function () { handleHoverEnd(clearButton); });

        //Create Save Button
        saveButton = p5.createButton('Save');
        saveButton.position(buttonWidth + 2 * buttonSpacing + xOffset, p5.windowHeight - buttonHeight - 20);
        setButtonStyles(saveButton, {
            'background-color': 'rgba(80, 80, 80, 0.7)',
            'border': 'none',
            'border-radius': '20px',
            'color': 'white',
            'padding': '20px 40px',
            'font-size': '35px',
            'width': `${buttonWidth}px`,
            'height': `${buttonHeight}px`,
        });

        //Add Hover for Save Button
        saveButton.mouseOver(function () { handleHover(saveButton); });
        saveButton.mouseOut(function () { handleHoverEnd(saveButton); });

        //Create functionality when saveButton is clicked
        saveButton.mousePressed(function () { saveDrawing(p5) });
    }
    //Function for when save button is clicked
    function saveDrawing(p5) {
        //Save drawing to files with the time
        const timestamp = Date.now();
        const filename = `drawing_${timestamp}.png`;
        p5.saveCanvas(canvas, filename, 'png');

    }

    //Function to clear the screen
    function clearDrawing(p5) {
        //Resets Background Color
        p5.background(160);
        console.log('Cleared');

        // Display "Loading model" for the first 1 seconds
        createWords(p5, 'Loading model...');
        setTimeout(() => {
            createWords(p5);
        }, 1000);

        //Reset the ML5 Model
        seedStrokes = [];
        model.reset();
        shouldGenerate = false; // Set flag to false when canvas is cleared


    }

    //Creates Text at Top
    function createWords(p5, text = '') {
        //Clears old Text
        p5.background(160);

        p5.textSize(50);

        //If text parameter is empty create "Begin Drawing", else created passed in text
        if (text === '') {
            p5.strokeWeight(1);
            console.log('created Words');
            p5.text(`Begin drawing a ${choice}, then let A.I. finish it`, p5.windowWidth * .2, p5.windowHeight * .1);
        } else {
            p5.text(text, p5.windowWidth * .2, p5.windowHeight * .1);
        }
    }

    //Adjust Screen if resized
    function windowResized(p5) {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        createButtons(p5);
    }

    //If Clicked New Model on the Side
    function handleClickModel(modelName, p5) {
        console.log(`A button has been clicked ${modelName}`);

        //Changes choice varible to new Model
        choice = modelName;

        // Display "Loading model" for the first second
        createWords(p5, 'Loading model...');
        setTimeout(() => {
            createWords(p5);
        }, 1000);
        loadModel(choice, p5);

    }

    //Creates New Models on the sidebar
    function showModels(p5) {

        //Create Color for sidebar
        const sidebarStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '13%',
            height: '100%',
            backgroundColor: '#ccc',
            padding: '10px',
            boxSizing: 'border-box',
        };

        //Create Style for Models Text 
        const headerStyle = {
            fontSize: '28px',
            color: '#000',
            marginBottom: '10px',
            textAlign: 'center', // Center align the text
        };

        // Render sidebar
        const sidebar = (
            <div style={sidebarStyle}>
                <div style={headerStyle}>Models</div>
            </div>
        );

        //Use ReactDOM to render the sidebar
        const sidebarContainer = document.createElement('div');
        document.body.appendChild(sidebarContainer);
        ReactDOM.render(sidebar, sidebarContainer);

        // Create buttons for the models
        for (let i = 0; i < modelOptions.length; i++) {
            //Traverse through the lists of models and position each one
            const modelName = modelOptions[i];
            const modelButton = p5.createP(modelName);
            modelButton.position(50, 50 + i * 30);

            //Set Color to black
            modelButton.style('color', 'black');


            //Create Hover effect for the models
            modelButton.mouseOver(() => {
                //Change Color to red on hover
                modelButton.style('color', 'red');
            });

            modelButton.mouseOut(() => {
                //Return color to black after hover out
                modelButton.style('color', 'black');
            });

            //Handles the function for when the model is clicked
            modelButton.mousePressed(() => {
                console.log(`Clicked model button: ${modelName}`);
                handleClickModel(modelName, p5);
            });
        }
    }

    //Returns Sketch 
    return <Sketch setup={setup} draw={draw} windowResized={windowResized} />

}

export default Screen;
