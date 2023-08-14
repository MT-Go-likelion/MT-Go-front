import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import COLOR from '../../constants/color';

import FooterLodging from '../../assets/images/FooterLodging.png';
import FooterShopping from '../../assets/images/FooterShopping.png';
import FooterMypage from '../../assets/images/FooterMypage.png';
import FooterHome from '../../assets/images/FooterHome.png';
import FooterRecreation from '../../assets/images/FooterRecreation.png';

import homeFooter from '../../assets/images/homeFooter.png';
import lodgingFooter from '../../assets/images/lodgingFooter.png';
import MypageFooter from '../../assets/images/MypageFooter.png';
import recreationFooter from '../../assets/images/recreationFooter.png';
import ShoppingFooter from '../../assets/images/ShoppingFooter.png';

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
  z-index: 10;
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
  line-height: 160%;
  font-weight: 700;
  color: ${(props) => (props.active ? COLOR.primary.blue : 'var(--unnamed, black)')};
`;

const MobileFooter = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('');

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    if (menu === 'home') {
      navigate(`/`);
    } else {
      navigate(`/${menu}`);
    }
  };

  return (
    <FooterLayout>
      <FooterMenuList>
        <FooterMenu onClick={() => handleMenuClick('home')}>
          <FooterImg src={activeMenu === 'home' ? FooterHome : homeFooter} />
          <Footertitle active={activeMenu === 'home'}>홈</Footertitle>
        </FooterMenu>
        <FooterMenu onClick={() => handleMenuClick('Lodging')}>
          <FooterImg src={activeMenu === 'Lodging' ? lodgingFooter : FooterLodging} />
          <Footertitle active={activeMenu === 'Lodging'}>숙소</Footertitle>
        </FooterMenu>
        <FooterMenu onClick={() => handleMenuClick('Shopping')}>
          <FooterImg src={activeMenu === 'Shopping' ? ShoppingFooter : FooterShopping} />
          <Footertitle active={activeMenu === 'Shopping'}>장보기</Footertitle>
        </FooterMenu>
        <FooterMenu onClick={() => handleMenuClick('Recreation')}>
          <FooterImgDiv>
            <RecreationImg
              src={activeMenu === 'Recreation' ? recreationFooter : FooterRecreation}
            />
          </FooterImgDiv>
          <Footertitle active={activeMenu === 'Recreation'}>레크레이션</Footertitle>
        </FooterMenu>
        <FooterMenu onClick={() => handleMenuClick('Mypage')}>
          <FooterImg src={activeMenu === 'Mypage' ? MypageFooter : FooterMypage} />
          <Footertitle active={activeMenu === 'Mypage'}>Page</Footertitle>
        </FooterMenu>
      </FooterMenuList>
    </FooterLayout>
  );
};

export default MobileFooter;
