import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import COLOR from '../../constants/color';
import Recreatbtn from '../../assets/images/Recreat.png';
import SelectRecreat from '../../assets/images/Select_recreat.png';
import { BASE_URL } from '../../config/api';
import useRecreation from '../../hooks/queries/Recreation/useRecreation';

const BestLoContainer = styled.div`
  width: 240px;
  height: 450px;
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
`;

const BackImg = styled.img`
  width: 100%;
  height: 100%;
`;

const BtnCotainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const RecreatButton = styled.img`
  width: 36px;
  height: 36px;
  cursor: pointer;
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
`;

const PeopleCount = styled.div`
  font-size: 20px;
  color: ${COLOR.lightGray};
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
    props.teamspace &&
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
`;

// 레크리에이션 카드
// state : 팀페이스 담기 버튼 / 스크랩 후 사진 / 스크랩 수
const RecreationCard = ({ pk, name, photo, headCountMin, headCountMax, isScrap }) => {
  const [teamspace] = useState(false);
  const [save, setSave] = useState(isScrap);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const { recreationReviewMutation } = useRecreation();

  const handleSaveClick = (e) => {
    e.stopPropagation();

    if (user) {
      setSave((prevState) => !prevState);
      recreationReviewMutation({
        isScrap: !save,
        recreationPk: pk,
        token: user.token,
      });
    } else {
      navigate('/signin');
    }
  };

  return (
    <BestLoContainer>
      <BackContainer>
        <BackImg src={BASE_URL + photo} />
        <BtnCotainer>
          <RecreatButton
            src={save ? SelectRecreat : Recreatbtn}
            alt="save"
            onClick={handleSaveClick}
          />
          <SaveCount>NN</SaveCount>
        </BtnCotainer>
      </BackContainer>
      <Flex>
        <Title>{name}</Title>
        <PeopleCount>
          추천인원 : {headCountMin} ~ {headCountMax} 명
        </PeopleCount>
        <Teamspace teamspace={teamspace} onClick={handleSaveClick}>
          팀스페이스 담기
        </Teamspace>
      </Flex>
    </BestLoContainer>
  );
};
export default RecreationCard;
