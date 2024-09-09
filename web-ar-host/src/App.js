import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HandGesture from './pages/handgesture';
import FaceLandmark from './pages/facelandmark';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/facelandmark' Component={FaceLandmark} />
        <Route exact path='/handgesture' Component={HandGesture} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
