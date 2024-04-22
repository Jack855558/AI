
import { Link } from 'react-router-dom';
import './Button.css';

function Button() {

    //Create Start Buton that links to the sketch
    return (<Link to="/draw" >
        <button className="Button">Start</button>
    </Link>)
}

export default Button; 