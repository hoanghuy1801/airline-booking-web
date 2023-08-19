import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './component/Home/HomePage';
import Admin from './component/Admin/Admin';
const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/homepage' element={<HomePage />} />
            </Routes>

        </>
    )
}
export default Layout;