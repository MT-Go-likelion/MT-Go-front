import React from 'react';
import styled from 'styled-components';
import MainBanner from '../assets/images/banner-main.png';
// import COLOR from '../constants/color';

const MainLayout = styled.div`
  width: 100%;
`;

const Banner = styled.div`
  width: 100%;
  height: 52.3rem;
  background-image: url(${MainBanner});
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const TmpList = styled.ul`
//   display: flex;
//   justify-content: space-between;
//   gap: 3rem;
// `;

// const TmpItem = styled.li`
//   width: 15.5rem;
//   height: 18rem;
//   background-color: ${COLOR.black};
//   opacity: 0.5;
// `;

const Main = () => {
  return (
    <MainLayout>
      <Banner>
        {/* <TmpList>
          <TmpItem />
          <TmpItem />
          <TmpItem />
        </TmpList> */}
      </Banner>
    </MainLayout>
  );
};

export default Main;
