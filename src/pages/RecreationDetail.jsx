import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import COLOR from '../constants/color';
import useRecreationDetail from '../hooks/queries/Recreation/useRecreationDetail';
import Loading from './Loading';
import Error from './Error';
import { BASE_URL } from '../config/api';
import useRecreation from '../hooks/queries/Recreation/useRecreation';
import Backimg from '../assets/images/chevron-left.png';
import { mobileSize } from '../utils/MediaSize';
import RecreationPopup from '../components/Popup/Recreation/RecreationPopup';
import useRecreationScrap from '../hooks/queries/Recreation/useRecreationScrap';
import ApiCallSuccessPopup from '../components/Common/Popup/ApiCallSuccessPopup';
import Recreatbtn from '../assets/images/Recreat.png';
import SelectRecreat from '../assets/images/Select_recreat.png';

const RecreationDetailLayout = styled.div`
  max-width: 1280px;
  margin: auto;
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  @media (max-width: ${mobileSize}px) {
    width: 100%;
    margin-top: 0;
  }
`;

const RecreationContentContainer = styled.div`
  display: flex;
  gap: 8rem;
`;

const RecreationDetailLeftContiner = styled.div`
  width: 100%;
  flex-basis: 40%;
`;

const RecreationTitle = styled.h1`
  margin-bottom: 2rem;
`;

const RecreationImg = styled.img`
  width: 100%;
  height: 40rem;
  border-radius: 1rem;
  @media (max-width: ${mobileSize}px) {
    width: 100%;
    height: 350px;
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

const TeamspaceBtn = styled.button`
  padding: 0.2rem 0.8rem;
  border: 2px solid ${COLOR.lightGray};
  border-radius: 16px;
  color: ${COLOR.gray};
  width: 9.25rem;
  height: 2rem;

  &:hover {
    border: 2px solid ${COLOR.primary.blue};
    color: ${COLOR.primary.blue};
  }
`;

const RecreationDetailRightContainer = styled.div`
  flex-basis: 60%;
  display: flex;
  flex-direction: column;
`;

const RightContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 3rem;
`;

const ScrapContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ScrapCount = styled.div``;

const RecommendedNum = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.4rem;
  @media (max-width: ${mobileSize}px) {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
  }
`;

const RecreationDetailContent = styled.div`
  line-height: 1.5;
`;

// Mobile
const Header = styled.div`
  height: 4.5rem;
  background-color: ${COLOR.white};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.5rem 2rem;
  align-items: center;
`;

const Back = styled.img`
  width: 32px;
  height: 32px;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;

const TeamButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50px;
  background-color: ${COLOR.primary.blue};
`;

const ContentDiv = styled.div`
  width: 100%;
  border-radius: 32px 32px 0px 0px;
  background: ${COLOR.white};
  padding: 3rem 2rem;
  box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  animation: ${(props) => (props.isLifted ? liftAnimation : 'none')} 0.4s ease;
`;

const ButtonDiv = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 32px;
  transition: transform 0.3s ease;
  animation: ${(props) => (props.isLifted ? liftAnimation : 'none')} 0.4s ease;
`;
const SubButton = styled.button`
  width: 100%;
  text-align: center;
  border-radius: 12px 12px 0px 0px;
  background: ${(props) => (props.isActive ? COLOR.white : COLOR.lightGray)};
  box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.1);
`;

const liftAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;

const RecreationDetail = () => {
  const [IspopupVisivle, setIspopupVisivle] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize);
  const [activeButton, setActiveButton] = useState('rule');
  const [isLifted, setIsLifted] = useState(false);
  const [success, setSuccess] = useState('');

  const { recreationId } = useParams();

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const {
    lodgingDetailQuery: { isLoading, error, data: recreationDetail },
  } = useRecreationDetail(recreationId, user ? user.token : '');

  const [save, setSave] = useState(recreationDetail && recreationDetail.isScrap);

  const { recreationScrapMutation } = useRecreationScrap();

  const handleSaveClick = (e) => {
    e.stopPropagation();

    if (user) {
      setSave((prevState) => !prevState);
      recreationScrapMutation(
        {
          isScrap: !save,
          recreationPk: recreationDetail.pk,
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

  const { recreationDeleteMutation } = useRecreation();
  const navigate = useNavigate();

  const handleTeamBtnClick = (e) => {
    e.stopPropagation();
    setIspopupVisivle(true);
  };

  const handlePopupClose = () => {
    setIspopupVisivle(false);
  };

  const onClickUpdateBtn = () => {
    navigate('/recreation/update', { state: { recreationDetail } });
  };

  const onClickDeleteBtn = () => {
    recreationDeleteMutation(recreationDetail.pk);
    navigate('/');
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= mobileSize);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setSave(recreationDetail && recreationDetail.isScrap);
  }, [recreationDetail]);

  return (
    <RecreationDetailLayout>
      <ApiCallSuccessPopup success={success} />

      {isLoading && <Loading />}
      {error && <Error />}
      {recreationDetail && (
        <div>
          {isMobile ? (
            <>
              <Header>
                <Back src={Backimg} onClick={() => navigate('/Recreation')} />
                <FlexDiv>
                  <TeamButton>담기</TeamButton>
                  <TeamButton onClick={onClickDeleteBtn}>삭제</TeamButton>
                  <TeamButton onClick={onClickUpdateBtn}>삭제</TeamButton>
                </FlexDiv>
              </Header>
              <RecreationImg src={BASE_URL + recreationDetail.photo} />

              <ButtonDiv isLifted={isLifted}>
                <SubButton
                  onClick={() => {
                    setActiveButton('rule');
                    setIsLifted(true);
                    setTimeout(() => {
                      setIsLifted(false);
                    }, 300);
                  }}
                  isActive={activeButton === 'rule'}
                >
                  규칙
                </SubButton>
                <SubButton
                  onClick={() => {
                    setActiveButton('keyWord');
                    setIsLifted(true);
                    setTimeout(() => {
                      setIsLifted(false);
                    }, 300);
                  }}
                  isActive={activeButton === 'keyWord'}
                >
                  키워드
                </SubButton>
              </ButtonDiv>
              <ContentDiv isLifted={isLifted}>
                {activeButton === 'rule' && (
                  <div>
                    {recreationDetail.name}{' '}
                    <RecommendedNum>
                      추천인원: {recreationDetail.headCountMin} ~ {recreationDetail.headCountMax}명
                    </RecommendedNum>
                    <RecreationDetailContent
                      dangerouslySetInnerHTML={{ __html: recreationDetail.content }}
                    >
                      {}
                    </RecreationDetailContent>
                  </div>
                )}
                {activeButton === 'keyWord' && <div>키워드 내용</div>}
              </ContentDiv>
            </>
          ) : (
            <>
              <RecreationTitle>{recreationDetail.name}</RecreationTitle>
              <RecreationContentContainer>
                <RecreationDetailLeftContiner>
                  <RecreationImg src={BASE_URL + recreationDetail.photo} />
                </RecreationDetailLeftContiner>
                <RecreationDetailRightContainer>
                  <RightContainerHeader>
                    <ScrapContainer>
                      <ScrapCount>스크랩 수: {recreationDetail.scrapCount}</ScrapCount>
                      <RecreatButton
                        src={save ? SelectRecreat : Recreatbtn}
                        alt="save"
                        onClick={handleSaveClick}
                      />
                    </ScrapContainer>
                    <RecommendedNum>
                      추천인원: {recreationDetail.headCountMin} ~ {recreationDetail.headCountMax}명
                    </RecommendedNum>
                    <TeamspaceBtn onClick={handleTeamBtnClick}>팀스페이스 담기</TeamspaceBtn>
                    {user && user.isStaff && (
                      <>
                        <TeamspaceBtn onClick={onClickUpdateBtn}>수정하기</TeamspaceBtn>
                        <TeamspaceBtn onClick={onClickDeleteBtn}>삭제하기</TeamspaceBtn>
                      </>
                    )}
                  </RightContainerHeader>
                  <RecreationDetailContent
                    dangerouslySetInnerHTML={{ __html: recreationDetail.content }}
                  >
                    {}
                  </RecreationDetailContent>
                </RecreationDetailRightContainer>
              </RecreationContentContainer>
              {IspopupVisivle && (
                <RecreationPopup pk={recreationDetail.pk} handlePopupClose={handlePopupClose} />
              )}
            </>
          )}
        </div>
      )}
    </RecreationDetailLayout>
  );
};

export default RecreationDetail;
