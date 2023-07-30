import React from 'react';
import styled from 'styled-components';

import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import GlobalStyles from './styles/GlobalStyle';
import Navbar from './components/Navbar/Navbar';

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const AppContainer = styled.div`
  flex: 1;
`;

const AppContent = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: auto;
  padding: 2rem;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <AppLayout>
        <AppContainer>
          <Navbar />
          <AppContent>
            <Outlet />
          </AppContent>
        </AppContainer>
        <Footer />
      </AppLayout>
    </>
  );
}

export default App;
