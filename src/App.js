import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import GlobalStyles from './styles/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
