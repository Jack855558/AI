import Sketch from 'react-p5';
import * as ml5 from 'ml5';

function Screen() {

    // Variables 
    let shouldGenerate = false;
    let canvas;
    let clearButton;
    let saveButton;
    // let words;
    let choice = 'face';
    let model;
    let x;
    let y;
    let strokePath;
    let previousPen = 'down';
    let seedStrokes = [];
    let userStroke;
    let savedDrawings = [];

    //Model Options
    let modelOptions = ['face', 'dog', 'cat', 'pig', 'bus', 'bicycle', 'apple', 'eye', 'flower', 'pencil', 'crab', 'rabbit', 'penguin', 'dolphin', 'helicopter'];

    function setup(p5, canvasParentRef) {

        const canvasWidth = p5.windowWidth;
        const canvasHeight = p5.windowHeight;
        // Create canvas
        canvas = p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
        canvas.position(0, 0); // Position canvas at top-left corner


        // Background 
        p5.background(160);

        showModels(p5);

        loadModel(choice, p5);

        createButtons(p5);

        console.log(choice);
        createWords(p5);

        p5.fill(200);
        p5.rect(0, 0, p5.windowWidth * .13, p5.windowHeight);

        p5.textSize(28);
        p5.fill(0);
        p5.text('Models', p5.windowWidth * .027, p5.windowHeight * .07);
    }

    function draw(p5) {

        p5.fill(200);
        p5.rect(0, 0, p5.windowWidth * .13, p5.windowHeight);

        p5.textSize(28);
        p5.fill(0);
        p5.text('Models', p5.windowWidth * .027, p5.windowHeight * .07);

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

        // If something new to draw
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

    function loadModel(name, p5) {
        model = ml5.sketchRNN(name, () => modelReady(p5));
    }

    function startSketchRNN(p5) {
        // Start where mouse was last pressed
        x = p5.mouseX;
        y = p5.mouseY;

        // .generate(seed, callback)
        model.generate(seedStrokes, gotStroke);
    }

    // A new stroke path
    function gotStroke(err, s) {
        strokePath = s;
    }

    function modelReady(p5) {
        console.log('Model Ready');
        canvas.mouseReleased(() => {
            console.log('Model will Start');
            shouldGenerate = true; // Set flag to true when user starts drawing again
            startSketchRNN(p5);
        });
    }

    function setButtonStyles(button, styles) {
        const buttonElement = button.elt;
        Object.keys(styles).forEach(style => {
            buttonElement.style[style] = styles[style];
        });
    }

    function createButtons(p5) {
        const windowHeightRatio = p5.windowHeight / 100;
        const windowWidthRatio = p5.windowWidth / 100;

        const buttonHeight = 12 * windowHeightRatio; // Adjusted button height

        // Calculate button width based on available window width and desired spacing
        const availableWidth = p5.windowWidth - 10 * windowWidthRatio; // Total width minus margins
        const buttonWidth = availableWidth / 2 - 7 * windowWidthRatio; // Divide by 2 buttons and subtract spacing

        const buttonSpacing = 2 * windowWidthRatio;

        // Small offset to the right
        const xOffset = 15 * windowWidthRatio;

        // Function to handle hover effect
        function handleHover(button) {
            button.style('background-color', 'rgba(100, 100, 100, 0.75)'); // Change background color on hover
        }

        // Function to handle hover end
        function handleHoverEnd(button) {
            button.style('background-color', 'rgba(80, 80, 80, 0.7)'); // Revert background color after hover
        }

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
        clearButton.mousePressed(function () { clearDrawing(p5) });
        clearButton.mouseOver(function () { handleHover(clearButton); }); // Add hover effect
        clearButton.mouseOut(function () { handleHoverEnd(clearButton); }); // Revert hover effect

        saveButton = p5.createButton('Save');
        saveButton.mousePressed(function () { saveDrawing(p5) });
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
        saveButton.mouseOver(function () { handleHover(saveButton); }); // Add hover effect
        saveButton.mouseOut(function () { handleHoverEnd(saveButton); }); // Revert hover effect
    }


    function saveDrawing(p5) {
        const timestamp = Date.now();
        const filename = `drawing_${timestamp}.png`;
        p5.saveCanvas(canvas, filename, 'png');

        savedDrawings.push(filename);
    }

    function clearDrawing(p5) {
        p5.background(160);
        console.log('Cleared');
        createWords(p5);
        seedStrokes = [];
        model.reset();
        shouldGenerate = false; // Set flag to false when canvas is cleared
    }

    function createWords(p5) {
        p5.background(160); // Clear the canvas
        p5.textSize(50);
        if (choice === undefined) {
            p5.text('Choose something to draw, then let A.I. finish it', p5.windowWidth * .2, p5.windowHeight * .1)
        } else {
            p5.text(`Begin drawing a ${choice}, then let A.I. finish it`, p5.windowWidth * .2, p5.windowHeight * .1);
        }
    }


    function windowResized(p5) {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        createButtons(p5);
    }

    function handleClickModel(modelName, p5) {
        console.log(`A button has been clicked ${modelName}`);
        choice = modelName;
        loadModel(choice, p5);
    }

    function showModels(p5) {
        for (var i = 0; i < modelOptions.length; i++) {
            const modelName = modelOptions[i];
            let modelButton = p5.createP(modelName);
            modelButton.position(50, 50 + i * 30);
            modelButton.mousePressed(() => {
                console.log(`Clicked model button: ${modelName}`);
                handleClickModel(modelName, p5);
                createWords(p5); // Update the displayed text
            });
        }
    }

    return <Sketch setup={setup} draw={draw} windowResized={windowResized} />
}

export default Screen;
