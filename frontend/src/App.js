import './App.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import VehicleOffer from './VehicleOffer';

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" exact element={<HomePage />} />
              <Route path="/nabidka-vozidel" exact element={<VehicleOffer />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
