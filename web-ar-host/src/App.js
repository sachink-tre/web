import { BrowserRouter, Route, Routes, HashRouter } from 'react-router-dom';
import './App.css';
import HandGesture from './pages/handgesture';
import FaceLandmark from './pages/facelandmark';
import Default from './pages/Default';
import CurrencyConverter from './pages/CurrencyConverter';
import TwoMb from './pages/TwoMb';
import FourMb from './pages/FourMb';
import SixMb from './pages/SixMb';
import EightMb from './pages/EightMb';
import TenMb from './pages/TenMb';
import TwentyMb from './pages/TwentyMb';


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' Component={Default} />
        <Route exact path='/facelandmark' Component={FaceLandmark} />
        <Route exact path='/handgesture' Component={HandGesture} />
        <Route exact path='/currency' Component={CurrencyConverter} />
        <Route exact path='/two' Component={TwoMb} />
        <Route exact path='/four' Component={FourMb} />
        <Route exact path='/six' Component={SixMb} />
        <Route exact path='/eight' Component={EightMb} />
        <Route exact path='/ten' Component={TenMb} />
        <Route exact path='/twenty' Component={TwentyMb} />
      </Routes>
    </HashRouter>
  );
}

export default App;
