import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import GlobalStyles from './styles/GlobalStyle';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
