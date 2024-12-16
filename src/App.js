import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import VisualizerMoviePage from "./pages/VisualizerMoviePage/VisualizerMoviePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage/>}/>
          <Route path='/content/:id' element={<VisualizerMoviePage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
