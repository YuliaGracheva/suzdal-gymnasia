import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import HeaderRoutes from './Components/HeaderRoutes.js'; 
import { useLocation } from 'react-router-dom'; 

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className='wrapper'>
      {!isAdminPage && <Header />}
      <HeaderRoutes /> 
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default App;
