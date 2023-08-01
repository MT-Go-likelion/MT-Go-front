import React from 'react';
import styled from 'styled-components';
import COLOR from '../../constants/color';

const FooterLayout = styled.footer`
  height: 8.75rem;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 10rem;
`;

const FooterMenuList = styled.ul`
  display: flex;
  gap: 2rem;
`;

const FooterMenu = styled.li`
  color: ${COLOR.gray};
`;

const Footerinquiry = styled.div`
  color: ${COLOR.gray};
`;

const Copyright = styled.div`
  color: ${COLOR.primary.lightBlue};
  font-size: 1.2rem;
  margin-top: 0.5rem;
`;

const Footer = () => {
  return (
    <FooterLayout>
      <FooterMenuList>
        <FooterMenu>이용약관</FooterMenu>
        <FooterMenu>개인정보처리방침</FooterMenu>
        <FooterMenu>회사정보</FooterMenu>
      </FooterMenuList>
      <Footerinquiry>광고 문의 : kookmin@kookmin.ac.kr</Footerinquiry>
      <Copyright>Copyright © 2023 멋쟁이사자처럼 | All Rights Reserved</Copyright>
    </FooterLayout>
  );
};

export default Footer;
