import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
// import menu from '../../assets/images/bag-outline.png';
import { useSignOut } from '../../hooks/queries/Auth/useSignOut';
import MTGOLOGO from '../../assets/images/MTLOGO.png';
import NavLodging from '../../assets/images/NavLodging.png';
import NavRecreation from '../../assets/images/NavRecreation.png';
import NavShopping from '../../assets/images/NavShopping.png';

const mediaSize = 1150;

const NavLayout = styled.div`
  width: 100%;
  height: 3.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12rem;
  @media (max-width: ${mediaSize}px) {
    padding: 0 9rem 0 6rem;
  }
`;

const NavLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 7rem;
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const NavMenuList = styled.ul`
  display: flex;
  justify-content: space-between;
  gap: 3.5rem;
  @media (max-width: ${mediaSize}px) {
    display: none;
  }
`;

const NavMenu = styled.li`
  display: flex;
  align-items: flex-start;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

const NavMenuIcon = styled.img`
  width: 1.2rem;
  margin-right: 0.3rem;
`;

const NavMenuText = styled.div``;

const NavRight = styled.div`
  display: flex;
  gap: 2rem;
`;

const CreateBtn = styled.div`
  font-size: 19px;
  font-weight: 600;
  cursor: pointer;
`;

const SignBtn = styled.div`
  font-size: 19px;
  font-weight: 600;
  cursor: pointer;
`;

const MypageBtn = styled.div`
  font-size: 19px;
  font-weight: 600;
  cursor: pointer;
`;

const NavLogoImg = styled.img`
  width: 7rem;
  height: 3rem;
  cursor: pointer;
`;

const Navbar = ({ auth }) => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const handleShopping = () => {
    if (user) {
      navigate('/shopping');
    } else {
      navigate('/signin');
    }
  };

  const handleLogout = () => {
    signOut();
    navigate('/signin');
  };

  return (
    <NavLayout>
      <NavLeft>
        <NavLogo onClick={() => navigate('/')}>
          <NavLogoImg src={MTGOLOGO} />
        </NavLogo>
        <NavMenuList>
          <NavMenu onClick={() => navigate('/lodging')}>
            <NavMenuIcon src={NavLodging} />
            <NavMenuText>숙소예약</NavMenuText>
          </NavMenu>
          <NavMenu onClick={handleShopping}>
            <NavMenuIcon src={NavShopping} />
            <NavMenuText>장보기</NavMenuText>
          </NavMenu>
          <NavMenu onClick={() => navigate('/recreation')}>
            <NavMenuIcon src={NavRecreation} />
            <NavMenuText>레크레이션</NavMenuText>
          </NavMenu>
        </NavMenuList>
      </NavLeft>
      <NavRight>
        {!auth && <SignBtn onClick={() => navigate('/signin')}>로그인</SignBtn>}
        {auth && (
          <>
            {user && user.isStaff && (
              <>
                <CreateBtn onClick={() => navigate('/lodging/create')}>숙소 생성</CreateBtn>
                <CreateBtn onClick={() => navigate('/recreation/register')}>
                  레크레이션 생성
                </CreateBtn>
              </>
            )}
            <MypageBtn onClick={() => navigate('/mypage')}>MYPAGE</MypageBtn>
            <SignBtn onClick={handleLogout}>로그아웃</SignBtn>
          </>
        )}
      </NavRight>
    </NavLayout>
  );
};

export default Navbar;
