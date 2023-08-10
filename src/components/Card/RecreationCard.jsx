import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import COLOR from '../../constants/color';
import Recreatbtn from '../../assets/images/Recreat.png';
import SelectRecreat from '../../assets/images/Select_recreat.png';
import { BASE_URL } from '../../config/api';
import useRecreationScrap from '../../hooks/queries/Recreation/useRecreationScrap';

const mobileSize = 450;

const BestLoContainer = styled.div`
  width: 240px;
  height: 450px;
  @media (max-width: ${mobileSize}px) {
    width: 120px;
    height: 154px;
  }
`;

const BackContainer = styled.div`
  width: 240px;
  height: 320px;
  border-radius: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px;
  cursor: pointer;
  @media (max-width: ${mobileSize}px) {
    width: 120px;
    height: 120px;
    padding: 0;
  }
`;

const BackImg = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${COLOR.blue};
  border-radius: 20px;
  background-image: ${(props) => `url(${props.dataSrc})`};
  @media (max-width: ${mobileSize}px) {
    width: 120px;
    height: 120px;
    border-radius: 6px;
  }
`;

const BtnCotainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10px;
  right: 10px;
  @media (max-width: ${mobileSize}px) {
    top: 95px;
    right: 5px;
  }
`;

const RecreatButton = styled.img`
  width: 36px;
  height: 36px;
  cursor: pointer;
  @media (max-width: ${mobileSize}px) {
    width: 18px;
    height: 18px;
  }
`;

const SaveCount = styled.span`
  font-size: 16px;
  color: ${COLOR.gray};
  margin-top: 4px;
  padding: 0 7px;
`;

const Title = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  @media (max-width: ${mobileSize}px) {
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
    margin: 2px 0 0 0;
    color: ${COLOR.gary};
  }
`;

const PeopleCount = styled.div`
  font-size: 20px;
  color: ${COLOR.lightGray};
  @media (max-width: ${mobileSize}px) {
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%;
    margin-bottom: 0.5rem;
    color: ${COLOR.black};
  }
`;

const Teamspace = styled.button`
  padding: 4px 10px;
  border: 2px solid ${COLOR.lightGray};
  border-radius: 16px;
  width: 148px;
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

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 17px 10px 10px 10px;
  @media (max-width: ${mobileSize}px) {
    gap: 0;
    margin: 0;
  }
`;

// 레크리에이션 카드
// state : 팀페이스 담기 버튼 / 스크랩 후 사진 / 스크랩 수
const RecreationCard = ({ pk, name, photo, headCountMin, headCountMax, isScrap }) => {
  const [teamspace] = useState(false);
  const [save, setSave] = useState(isScrap);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const { recreationScrapMutation } = useRecreationScrap();

  const handleSaveClick = (e) => {
    e.stopPropagation();

    if (user) {
      setSave((prevState) => !prevState);
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
  const isMobile = window.innerWidth <= mobileSize;
  return (
    <BestLoContainer>
      <BackContainer onClick={handleCardClick}>
        <BackImg dataSrc={BASE_URL + photo} />
        <BtnCotainer>
          <RecreatButton
            src={save ? SelectRecreat : Recreatbtn}
            alt="save"
            onClick={handleSaveClick}
          />
          {isMobile ? ' ' : <SaveCount>NN</SaveCount>}
        </BtnCotainer>
      </BackContainer>
      <Flex>
        <Title>{name}name</Title>
        <PeopleCount>
          추천인원 : {headCountMin} ~ {headCountMax} 명
        </PeopleCount>
        {isMobile ? (
          ' '
        ) : (
          <Teamspace $teamspace={teamspace} onClick={handleSaveClick}>
            팀스페이스 담기
          </Teamspace>
        )}
      </Flex>
    </BestLoContainer>
  );
};
export default RecreationCard;
