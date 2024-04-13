import Screen from './sketch';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 

function App() {
  return (
    <div className="App">
      <Router>
        <Route path='/' Component={<Screen />} />
      </Router>
    </div>
  );
}

export default App;
