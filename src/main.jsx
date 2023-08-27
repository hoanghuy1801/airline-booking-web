import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './component/Home/HomePage';
import Admin from './component/Admin/Admin';
import Login from './component/Auth/Login.jsx';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import Register from './component/Auth/Register.jsx';
import SelectFlight from './component/SelectFlight/SelectFlight.jsx';
import SelectFlightInfor from './component/SelectFlightInfor/SelectFlightInfor.jsx';
import Passengers from './component/Passengers/Passengers.jsx';
import SelectService from './component/SelectService/SelectService.jsx';
import CheckIn from './component/CheckIn/CheckIn.jsx';
import SearchBookingMy from './component/SearchBookingMy/SearchBookingMy.jsx';
import BookingDetail from './component/BookingDetail/BookingDetail.jsx';
import SelectFight from './component/CheckIn/SelectFight/SelectFight.jsx';
import SelectSeat from './component/CheckIn/SelectSeats/SelectSeat.jsx';
import RestrictedBaggage from './component/CheckIn/RestrictedBaggage/RestrictedBaggage.jsx';
import Success from './component/CheckIn/Success/Success.jsx';
import ImageDownloader from './component/CheckIn/Success/BoardingPass.jsx';




ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} >
            <Route index element={<HomePage />} />
            <Route path='/select-fight' element={<SelectFlight />} />
            <Route path='/select-fight-infor' element={<SelectFlightInfor />} />
            <Route path='/passengers' element={<Passengers />} />
            <Route path='/select-service' element={<SelectService />} />
            <Route path='/checkin' element={<CheckIn />} />
            <Route path='/my/search-booking' element={<SearchBookingMy />} />
            <Route path='/my/select-fight' element={<SelectFight />} />
            <Route path='/my/select-seat' element={<SelectSeat />} />
            <Route path='/my/restricted-baggage' element={<RestrictedBaggage />} />
            <Route path='/my/success' element={<Success />} />
            <Route path='/my/booking-detail' element={<BookingDetail />} />
          </Route>
          <Route path='/admin' element={<Admin />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
