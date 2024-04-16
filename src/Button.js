
import { Link } from 'react-router-dom';
import './Button.css';

function Button() {
    // return {
    //     color: isHovered ? 'blue' : 'red',

    //     padding: '10px',
    //     fontSize: '30px',
    //     position: 'absolute',
    //     borderRadius: '15px',
    //     width: 200,
    //     height: 100,
    //     top: '50%',
    //     left: '35%', // middle of the screen
    // };


    return (<Link to="/draw" >
        <button>Start</button>
    </Link>)
}

export default Button; 