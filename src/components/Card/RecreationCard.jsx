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
import ApiCallSuccessPopup from '../Common/Popup/ApiCallSuccessPopup';

const mobileSize = 450;

const BestLoContainer = styled.div`
  width: 280px;
  height: 480px;
  padding: 19px 20px;
  border-radius: 16px;
  transition: 0.3s;

  &:hover {
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: ${mobileSize}px) {
    width: 120px;
    height: 154px;
    padding: 0;
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
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  background-image: ${(props) => `url(${props.$datasrc})`};

  @media (max-width: ${mobileSize}px) {
    width: 120px;
    height: 120px;
    border-radius: 6px;
  }
`;

const BtnCotainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 20px;
  right: 20px;
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

const TeamBtn = styled.button`
  padding: 4px 10px;
  border: 2px solid ${COLOR.lightGray};
  border-radius: 16px;
  width: 148px;
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

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 17px 0 0 15px;
  @media (max-width: ${mobileSize}px) {
    gap: 0;
    margin: 0;
  }
`;

// 레크리에이션 카드
// state : 팀페이스 담기 버튼 / 스크랩 후 사진 / 스크랩 수
const RecreationCard = ({ pk, name, photo, headCountMin, headCountMax, isScrap, scrapCount }) => {
  const [save, setSave] = useState(isScrap);
  const [IspopupVisivle, setIspopupVisivle] = useState(false);
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const { recreationScrapMutation } = useRecreationScrap();

  const handleSaveClick = (e) => {
    e.stopPropagation();

    if (user) {
      setSave((prevState) => !prevState);
      recreationScrapMutation(
        {
          isScrap: !save,
          recreationPk: pk,
          token: user.token,
        },
        {
          onSuccess: (data) => {
            if (data.isScrap) setSuccess('✅ 개인스페이스 스크랩 목록에 추가되었습니다');
            if (!data.isScrap) setSuccess('스크랩이 취소되었습니다');
            setTimeout(() => setSuccess(null), 1500);
          },
        },
      );
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

  const isMobile = window.innerWidth <= mobileSize;
  return (
    <>
      <ApiCallSuccessPopup success={success} />
      <BestLoContainer onClick={handleCardClick}>
        <BackContainer>
          <BackImg $datasrc={BASE_URL + photo} />
          <BtnCotainer>
            <RecreatButton
              src={save ? SelectRecreat : Recreatbtn}
              alt="save"
              onClick={handleSaveClick}
            />
            {isMobile ? ' ' : <SaveCount>{scrapCount}</SaveCount>}
          </BtnCotainer>
        </BackContainer>
        <Flex>
          <Title>{name}</Title>
          <PeopleCount>
            추천인원 : {headCountMin} ~ {headCountMax} 명
          </PeopleCount>
          {isMobile ? ' ' : <TeamBtn onClick={handleTeamBtnClick}>팀스페이스에 담기</TeamBtn>}
        </Flex>
      </BestLoContainer>
      {IspopupVisivle && <RecreationPopup pk={pk} handlePopupClose={handlePopupClose} />}
    </>
  );
};
export default RecreationCard;
