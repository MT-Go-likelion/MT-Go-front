import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import COLOR from '../../constants/color';
import Recreatbtn from '../../assets/images/Recreat.png';
import SelectRecreat from '../../assets/images/Select_recreat.png';
import { BASE_URL } from '../../config/api';
import useRecreationScrap from '../../hooks/queries/Recreation/useRecreationScrap';
import RecreationPopup from '../Popup/Recreation/RecreationPopup';
import Folder from '../../assets/images/folder.png';

const mobileSize = 450;

const BestLoContainer = styled.div`
  width: 317px;
  height: 100px;
  margin-bottom: 0.3rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
`;

const BackContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0;
  cursor: pointer;
`;

const BackImg = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${COLOR.blue};
  border-radius: 6px;
  background-image: ${(props) => `url(${props.dataSrc})`};
`;

const BtnCotainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 75px;
  right: 5px;
`;

const RecreatButton = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const Title = styled.div`
  width: 100%;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  margin: 2px 0 0 0;
  color: ${COLOR.lightGray};
`;

const PeopleCount = styled.div`
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%;
  color: ${COLOR.darkGray};
`;

const TeamBtn = styled.button`
  height: 36px;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%;
  color: ${COLOR.gray};
  text-align: center;
  border: 2px solid ${COLOR.lightGray};
  border-radius: 16px;
  width: 130px;
  padding: 0 0 0.3rem 0.6rem;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;

  ${(props) =>
    props.$teamspace &&
    css`
      background-color: ${COLOR.primary.blue};
      border-color: ${COLOR.primary.blue};
      color: ${COLOR.white};
    `}
`;
const BtnDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const TeamImg = styled.img`
  width: 36px;
  height: 36px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 17px 10px 10px 10px;
  @media (max-width: ${mobileSize}px) {
    gap: 0;
    margin: 0;
  }
`;

// 레크리에이션 카드
// state : 팀페이스 담기 버튼 / 스크랩 후 사진 / 스크랩 수
const RecreationCard = ({ pk, name, photo, headCountMin, headCountMax, isScrap }) => {
  const [save, setSave] = useState(isScrap);
  const [IspopupVisivle, setIspopupVisivle] = useState(false);

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const { recreationScrapMutation } = useRecreationScrap();

  const handleSaveClick = (e) => {
    e.stopPropagation();

    if (user) {
      setSave((prevState) => !prevState);
      console.log(isScrap);
      recreationScrapMutation({
        isScrap: !save,
        recreationPk: pk,
        token: user.token,
      });
    } else {
      navigate('/signin');
    }
  };

  const handleCardClick = () => {
    navigate(`/recreation/${pk}`, { state: pk });
  };

  const handleTeamBtnClick = (e) => {
    e.stopPropagation();
    setIspopupVisivle(true);
  };

  const handlePopupClose = () => {
    setIspopupVisivle(false);
  };

  return (
    <>
      <BestLoContainer>
        <Flex>
          <div>
            <Title>{name}</Title>
            <PeopleCount>
              추천인원 : {headCountMin} ~ {headCountMax} 명
            </PeopleCount>
          </div>
          <TeamBtn onClick={handleTeamBtnClick}>
            <BtnDiv>
              팀스페이스에 담기 <TeamImg src={Folder} />
            </BtnDiv>
          </TeamBtn>
        </Flex>
        <BackContainer onClick={handleCardClick}>
          <BackImg src={BASE_URL + photo} />
          <BtnCotainer>
            <RecreatButton
              src={save ? SelectRecreat : Recreatbtn}
              alt="save"
              onClick={handleSaveClick}
            />
          </BtnCotainer>
        </BackContainer>
      </BestLoContainer>
      {IspopupVisivle && <RecreationPopup pk={pk} handlePopupClose={handlePopupClose} />}
    </>
  );
};
export default RecreationCard;
