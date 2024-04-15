import Screen from './sketch';
import './App.css';
import { BrowserRouter as Router, Routes,  Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router basename={"/A.I."}>
        <Routes>
          <Route path='/' element={<Screen />} />
          {/* Add more routes here */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
