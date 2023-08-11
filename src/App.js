import React from 'react';
import styled from 'styled-components';

import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import MobileFooter from './components/Footer/MobileFooter';
import GlobalStyles from './styles/GlobalStyle';
import Navbar from './components/Navbar/Navbar';
import { useUser } from './hooks/queries/Auth/useUser';

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
  const isMobile = window.innerWidth <= 450;
  console.log(isMobile);
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
