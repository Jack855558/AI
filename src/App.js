import Screen from './sketch';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Route path='/' Component={<Screen />} />
      </Router>
    </div>
  );
}

export default App;
