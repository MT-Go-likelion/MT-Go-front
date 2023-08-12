import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import MobileFooter from './components/Footer/MobileFooter';
import GlobalStyles from './styles/GlobalStyle';
import Navbar from './components/Navbar/Navbar';
import { useUser } from './hooks/queries/Auth/useUser';
import { mobileSize } from './utils/MediaSize';

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const AppContainer = styled.div`
  flex: 1;
`;

const AppContent = styled.div`
  width: 100%;
  margin: auto;
`;

function App() {
  const { user } = useUser();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize);
  const handleResize = () => {
    setIsMobile(window.innerWidth <= mobileSize);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <GlobalStyles />
      <AppLayout>
        <AppContainer>
          {!isMobile && <Navbar auth={!!user} />}
          <AppContent>
            <Outlet />
          </AppContent>
        </AppContainer>
        {isMobile ? <MobileFooter /> : <Footer />}
      </AppLayout>
    </>
  );
}

export default App;
