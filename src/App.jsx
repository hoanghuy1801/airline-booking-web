import './App.css';
import { Outlet, Link } from "react-router-dom";
import Header from './component/Header/Header';

const App = () => {
  return (
    <div className="app-container">
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;