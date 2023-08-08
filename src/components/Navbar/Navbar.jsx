import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import menu from '../../assets/images/bag-outline.png';
import { useSignOut } from '../../hooks/queries/Auth/useSignOut';

const NavLayout = styled.header`
  width: 100%;
  height: 5rem;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8rem 0 1rem;
`;

const NavLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 7rem;
`;

const NavLogo = styled.div`
  font-size: 2rem;
  cursor: pointer;
`;

const NavMenuList = styled.ul`
  display: flex;
  justify-content: space-between;
  gap: 5rem;
`;

const NavMenu = styled.li`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

const NavMenuIcon = styled.img`
  width: 1.5rem;
  margin-right: 0.3rem;
`;

const NavMenuText = styled.div``;

const NavRight = styled.div`
  display: flex;
  gap: 2rem;
`;

const SignBtn = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
`;

const MypageBtn = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
`;

const Navbar = ({ auth }) => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  return (
    <NavLayout>
      <NavLeft>
        <NavLogo onClick={() => navigate('/')}>MTLOGO</NavLogo>
        <NavMenuList>
          <NavMenu onClick={() => navigate('/lodging')}>
            <NavMenuIcon src={menu} />
            <NavMenuText>숙소예약</NavMenuText>
          </NavMenu>
          <NavMenu onClick={() => navigate('/shopping')}>
            <NavMenuIcon src={menu} />
            <NavMenuText>장보기</NavMenuText>
          </NavMenu>
          <NavMenu onClick={() => navigate('/recreation')}>
            <NavMenuIcon src={menu} />
            <NavMenuText>레크레이션</NavMenuText>
          </NavMenu>
        </NavMenuList>
      </NavLeft>
      <NavRight>
        {!auth && <SignBtn onClick={() => navigate('/signin')}>로그인</SignBtn>}
        {auth && (
          <>
            <MypageBtn onClick={() => navigate('/mypage')}>마이페이지</MypageBtn>
            <SignBtn onClick={signOut}>로그아웃</SignBtn>
          </>
        )}
      </NavRight>
    </NavLayout>
  );
};

export default Navbar;
