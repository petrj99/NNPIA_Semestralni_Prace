import './App.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import VehicleOffer from './VehicleOffer';
import Login from "./Login";
import Registration from "./Registration";
import Profile from "./Profile";
import Controls from "./Controls";
import AddNewCar from "./AddNewCar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './VehicleOffer.css';
import ReservationForm from "./ReservationForm";
import AdminVehicleList from "./AdminVehicleList";
import EditCar from "./EditCar";
import ReservationConfirmed from "./ReservationConfirmed";
import AdminReservationList from "./AdminPanel/AdminReservationList";
import EditReservation from "./EditReservation";

function App() {
  return (
      <div>
          <ToastContainer/>
          <BrowserRouter>
              <Routes>
                  <Route path="/" exact element={<HomePage/>} />
                  <Route path="/nabidka-vozidel" exact element={<VehicleOffer />} />
                  <Route path="/prihlaseni" element={<Login />} />
                  <Route path="/registrace" element={<Registration />} />
                  <Route path="/muj-profil" element={<Profile />} />
                  <Route path="/rezervace/:carId" element={<ReservationForm />} />
                  <Route path="/sprava" element={<Controls />} />
                  <Route path="/sprava/pridani-vozu" element={<AddNewCar />} />
                  <Route path="/sprava/seznam-vozu" element={<AdminVehicleList />} />
                  <Route path="/sprava/seznam-vozu/edit/:carId" element={<EditCar />} />
                  <Route path="/sprava/seznam-rezervaci/edit/:reservationId" element={<EditReservation />} />
                  <Route path="/potvrzeni-rezervace" element={<ReservationConfirmed />} />
                  <Route path="/sprava/seznam-rezervaci" element={<AdminReservationList />} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
