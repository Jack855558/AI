import Screen from './sketch';
import Home from './Home';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router basename={"/AI"}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/draw' element={<Screen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
