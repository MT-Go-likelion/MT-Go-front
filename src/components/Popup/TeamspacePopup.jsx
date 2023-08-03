// TeamSpacePopup.js
import React from 'react';
import styled from 'styled-components';
import COLOR from '../../constants/color';

import close from '../../assets/images/close.png';

const PopupBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const PopupContainer = styled.div`
  width: 560px; /* Adjust the width as per your requirement */
  height: 650px; /* Adjust the height as per your requirement */
  background-color: white;
  padding: 1rem;
  border-radius: 48px;
`;

const PopupContent = styled.div`
  padding: 1.3rem 3.6rem;
`;

const CloseBtn = styled.img`
  position: fixed;
  width: 1rem;
  height: 1rem;
  color: black;
  cursor: pointer;
  position: relative;
  top: -1.5rem;
  right: -33.5rem;
  z-index: 1001;
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  margin-bottom: 2.6rem;
`;

const SubTitle = styled.div`
  font-size: 20px;
  margin: 1.5rem 0;
`;

const Minibox = styled.input`
  width: 100%;
  border: 1px solid ${COLOR.primary.blue};
  height: 45px;
  padding: 1rem;
  margin-bottom: 10px;
`;

const EmailDiv = styled.div`
  width: 100%;
  border: 1px solid ${COLOR.primary.blue};
  height: 45px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
`;

const EmailInput = styled.input`
  width: 100%;
  border: none;
  padding: 0 1rem 0 1rem;
`;

const EmailSubmitbutton = styled.button`
  width: 60px;
  height: 32px;
  margin: 5px 10px 0 0;
  border-radius: 16px;
  background-color: ${COLOR.primary.blue};
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.05));
  color: ${COLOR.white};
`;

const Maxbox = styled.input`
  width: 100%;
  border: 1px solid ${COLOR.primary.blue};
  min-height: 180px;
  padding: 1rem;
  margin-bottom: 1.4rem;
`;

const MarginDiv = styled.div`
  margin-top: 2rem;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Submitbutton = styled.button`
  width: 120px;
  height: 36px;
  border-radius: 16px;
  background-color: ${COLOR.primary.blue};
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.05));
  color: ${COLOR.white};
`;

const TeamSpacePopup = ({ handlePopupClose }) => {
  return (
    <PopupBackground>
      <PopupContainer>
        <CloseBtn src={close} onClick={handlePopupClose} />
        <PopupContent>
          <Title>팀스페이스 추가하기</Title>
          <SubTitle>팀스페이스 이름을 입력해주세요.</SubTitle>
          <Minibox placeholder="최대 N자까지 가능" />
          <MarginDiv>
            <SubTitle>여행 파트너의 이메일을 통해 초대하세요.</SubTitle>
            <EmailDiv>
              <EmailInput placeholder="Kookmin@kookmin.ac.kr" />
              <EmailSubmitbutton>+</EmailSubmitbutton>
            </EmailDiv>
            <Maxbox />
          </MarginDiv>
          <FlexDiv>
            <Submitbutton>Share link</Submitbutton>
            <Submitbutton>완료</Submitbutton>
          </FlexDiv>
        </PopupContent>
      </PopupContainer>
    </PopupBackground>
  );
};

export default TeamSpacePopup;
