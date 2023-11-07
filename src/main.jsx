import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './component/Home/HomePage'
import Admin from './component/Admin/Admin'
import Login from './component/Auth/Login.jsx'
import { store, persistor } from './redux/store'
import { Provider } from 'react-redux'
import Register from './component/Auth/Register.jsx'
import SelectFlight from './component/SelectFlight/SelectFlight.jsx'
import SelectFlightInfor from './component/SelectFlightInfor/SelectFlightInfor.jsx'
import Passengers from './component/Passengers/Passengers.jsx'
import SelectService from './component/SelectService/SelectService.jsx'
import CheckIn from './component/CheckIn/CheckIn.jsx'
import SearchBookingMy from './component/SearchBookingMy/SearchBookingMy.jsx'
import BookingDetail from './component/BookingDetail/BookingDetail.jsx'
import SelectFight from './component/CheckIn/SelectFight/SelectFight.jsx'
import SelectSeat from './component/CheckIn/SelectSeats/SelectSeat.jsx'
import RestrictedBaggage from './component/CheckIn/RestrictedBaggage/RestrictedBaggage.jsx'
import Success from './component/CheckIn/Success/Success.jsx'
import OtpChange from './component/BookingDetail/FlightScheduleChange/OtpChange.jsx'
import SelectFlyChange from './component/BookingDetail/FlightScheduleChange/SelectFlyChange.jsx'
import SelectFlightChange from './component/BookingDetail/FlightScheduleChange/SelectFlightChange.jsx'
import SearchFightChange from './component/BookingDetail/FlightScheduleChange/SearchFightChange.jsx'
import ManagerAdmin from './component/Admin/ManagerAdmin/ManagerAdmin.jsx'
import CreateAdmin from './component/Admin/ManagerAdmin/CreateAdmin.jsx'
import EditAdmin from './component/Admin/ManagerAdmin/EditAdmin.jsx'
import Account from './component/Profile/Account/Account.jsx'
import Personal from './component/Profile/Personal/Personal.jsx'
import TransactionHistory from './component/Profile/TransactionHistory/TransactionHistory.jsx'
import { LanguageProvider } from './LanguageProvider/LanguageProvider.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import MyForm from './component/Home/MyForm.jsx'
import Otp from './component/Auth/Otp.jsx'
import Payment from './component/Payment/Payment.jsx'
import PaymentChange from './component/BookingDetail/PaymentChange/PaymentChange.jsx'

import PaymentReturn from './component/Payment/PaymentReturn.jsx'
import PaymentChangeReturn from './component/BookingDetail/PaymentChange/PaymentChangeReturn.jsx'
import SelectFlyService from './component/BookingDetail/Service/SelectFlyService.jsx'
import ServiceDetail from './component/BookingDetail/Service/ServiceDetail.jsx'
import FlyCancel from './component/Admin/FlyCancel/FlyCancel.jsx'
import ListFlight from './component/Admin/ListFlight/ListFlight.jsx'
import SelectPassengers from './component/CheckIn/SelectPassengers/SelectPassengers.jsx'
import CustomerInfo from './component/Admin/Customer-info/CustomerInfo.jsx'
import CreateFlight from './component/Admin/ListFlight/CreateFlight.jsx'
import EditFlight from './component/Admin/ListFlight/EditFlight.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <LanguageProvider>
                    <Routes>
                        <Route path='/' element={<App />}>
                            <Route index element={<HomePage />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/register/otp' element={<Otp />} />
                            <Route path='/profile/account' element={<Account />} />
                            <Route path='/profile/personal' element={<Personal />} />
                            <Route path='/profile/transaction-history' element={<TransactionHistory />} />
                            <Route path='/select-fight' element={<SelectFlight />} />
                            <Route path='/select-fight-infor' element={<SelectFlightInfor />} />
                            <Route path='/passengers' element={<Passengers />} />
                            <Route path='/select-service' element={<SelectService />} />
                            <Route path='/payment-methods' element={<Payment />} />
                            <Route path='/payment-return' element={<PaymentReturn />} />
                            <Route path='/checkin' element={<CheckIn />} />
                            <Route path='/my/search-booking' element={<SearchBookingMy />} />
                            <Route path='/my/select-fight' element={<SelectFight />} />
                            <Route path='/my/select-passengers' element={<SelectPassengers />} />
                            <Route path='/my/select-seat' element={<SelectSeat />} />
                            <Route path='/my/restricted-baggage' element={<RestrictedBaggage />} />
                            <Route path='/my/success' element={<Success />} />
                            <Route path='/my/booking-detail' element={<BookingDetail />} />
                            <Route path='/my/select-fly-change' element={<SelectFlyChange />} />
                            <Route path='/my/select-fly-service' element={<SelectFlyService />} />
                            <Route path='/my/opt-change' element={<OtpChange />} />
                            <Route path='/payment-change-methods' element={<PaymentChange />} />
                            <Route path='/payment-change-return' element={<PaymentChangeReturn />} />
                            <Route path='/my/sevice-detail' element={<ServiceDetail />} />
                            <Route path='/my/select-flight-change' element={<SelectFlightChange />} />
                            <Route path='/my/search-flight-change' element={<SearchFightChange />} />
                        </Route>
                        <Route path='/admins' element={<Admin />}>
                            <Route path='/admins/employee' element={<ManagerAdmin />} />
                            <Route path='/admins/employee/create' element={<CreateAdmin />} />
                            <Route path='/admins/employee/edit' element={<EditAdmin />} />
                            <Route path='/admins/flyCancel' element={<FlyCancel />} />
                            <Route path='/admins/flight/listflight' element={<ListFlight />} />
                            <Route path='/admins/flight/create' element={<CreateFlight />} />
                            <Route path='/admins/flight/edit' element={<EditFlight />} />
                            <Route path='/admins/customer-info' element={<CustomerInfo />} />
                        </Route>
                    </Routes>
                </LanguageProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>
)
