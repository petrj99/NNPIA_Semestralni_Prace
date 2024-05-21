import { BrowserRouter , Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Information/HomePage';
import VehicleOffer from './Pages/User/VehicleOffer';
import Login from "./Pages/Authentication/Login";
import Registration from "./Pages/Registration/Registration";
import Profile from "./Pages/User/Profile";
import Controls from "./Pages/Admin/Controls";
import AddNewCar from "./Pages/Forms/AddNewCar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Pages/User/Styles/VehicleOffer.css';
import ReservationForm from "./Pages/Forms/ReservationForm";
import AdminVehicleList from "./Pages/Admin/AdminVehicleList";
import EditCar from "./Pages/Forms/EditCar";
import ReservationConfirmed from "./Pages/Information/ReservationConfirmed";
import AdminReservationList from "./AdminPanel/AdminReservationList";
import EditReservation from "./Pages/Forms/EditReservation";

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
