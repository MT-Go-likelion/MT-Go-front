import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import COLOR from '../../constants/color';

import FooterLodging from '../../assets/images/FooterLodging.png';
import FooterShopping from '../../assets/images/FooterShopping.png';
import FooterMypage from '../../assets/images/FooterMypage.png';
import FooterHome from '../../assets/images/FooterHome.png';
import FooterRecreation from '../../assets/images/FooterRecreation.png';

const FooterLayout = styled.footer`
  width: 100%;
  height: 5.5rem;
  position: fixed;
  bottom: 0;
  border-radius: 16px 16px 0px 0px;
  border-top: 0.5px solid var(--unnamed, #c7c7c7);
  border-right: 0.5px solid var(--unnamed, #c7c7c7);
  border-left: 0.5px solid var(--unnamed, #c7c7c7);
  background: ${COLOR.white};
  display: flex;
  gap: 0.5em;
  flex-direction: column;
`;

const FooterMenuList = styled.ul`
  display: flex;
  gap: 1.1rem;
  justify-content: center;
  padding: 1rem 1.5rem;
`;

const FooterMenu = styled.a`
  width: 3.25rem;
  color: ${COLOR.gray};
  display: flex;
  gap: 7px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FooterImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  text-align: center;
`;
const FooterImgDiv = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  padding-top: 3px;
`;
const RecreationImg = styled.img`
  width: 24px;
  height: 16.465px;
`;

const Footertitle = styled.div`
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
`;

const HomeTitle = styled.span`
  color: var(--unnamed, linear-gradient(135deg, #4987ff 0%, #5dffe2 100%));
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
`;

const MobileFooter = () => {
  const navigate = useNavigate();

  return (
    <FooterLayout>
      <FooterMenuList>
        <FooterMenu onClick={() => navigate(`/`)}>
          <FooterImg src={FooterHome} />
          <HomeTitle>홈</HomeTitle>
        </FooterMenu>
        <FooterMenu onClick={() => navigate(`/Lodging`)}>
          <FooterImg src={FooterLodging} />
          <Footertitle>숙소</Footertitle>
        </FooterMenu>
        <FooterMenu onClick={() => navigate(`/Shopping`)}>
          <FooterImg src={FooterShopping} />
          <Footertitle>장보기</Footertitle>
        </FooterMenu>
        <FooterMenu onClick={() => navigate(`/Recreation`)}>
          <FooterImgDiv>
            <RecreationImg src={FooterRecreation} />
          </FooterImgDiv>
          <Footertitle>레크레이션</Footertitle>
        </FooterMenu>
        <FooterMenu onClick={() => navigate(`/Mypage`)}>
          <FooterImg src={FooterMypage} />
          <Footertitle>Page</Footertitle>
        </FooterMenu>
      </FooterMenuList>
    </FooterLayout>
  );
};

export default MobileFooter;
