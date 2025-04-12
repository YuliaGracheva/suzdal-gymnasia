import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HeaderRoutes from './Components/HeaderRoutes'; // 👈 добавим
import { useLocation } from 'react-router-dom'; // 👈 поправим тут

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
