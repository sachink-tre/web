import { BrowserRouter, Route, Routes, HashRouter } from 'react-router-dom';
import './App.css';
import HandGesture from './pages/handgesture';
import FaceLandmark from './pages/facelandmark';
import Default from './pages/Default';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' Component={Default} />
        <Route exact path='/facelandmark' Component={FaceLandmark} />
        <Route exact path='/handgesture' Component={HandGesture} />
      </Routes>
    </HashRouter>
  );
}

export default App;
