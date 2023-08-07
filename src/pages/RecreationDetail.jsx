import React from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import COLOR from '../constants/color';
import useRecreationDetail from '../hooks/queries/Recreation/useRecreationDetail';
import Loading from './Loading';
import Error from './Error';
import { BASE_URL } from '../config/api';

const RecreationDetailLayout = styled.div`
  max-width: 1280px;
  margin: auto;
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
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
`;
const TeamspaceBtn = styled.button`
  padding: 0.2rem 0.8rem;
  border: 2px solid ${COLOR.lightGray};
  border-radius: 16px;
  color: ${COLOR.gray};
  width: 9.25rem;
  height: 2rem;
  margin-bottom: 3rem;

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
`;

const RecommendedNum = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.4rem;
`;

const RecreationDetailContent = styled.div`
  line-height: 1.5;
`;

const RecreationDetail = () => {
  const { recreationId } = useParams();
  const {
    lodgingDetailQuery: { isLoading, error, data: recreationDetail },
  } = useRecreationDetail(recreationId);
  return (
    <RecreationDetailLayout>
      {isLoading && <Loading />}
      {error && <Error />}

      {recreationDetail && (
        <>
          <RecreationTitle>{recreationDetail.name}</RecreationTitle>
          <RecreationContentContainer>
            <RecreationDetailLeftContiner>
              <RecreationImg src={BASE_URL + recreationDetail.photo} />
            </RecreationDetailLeftContiner>
            <RecreationDetailRightContainer>
              <RightContainerHeader>
                <RecommendedNum>
                  추천인원: {recreationDetail.headCountMin} ~ {recreationDetail.headCountMax}명
                </RecommendedNum>
                <TeamspaceBtn>팀스페이스 담기</TeamspaceBtn>
              </RightContainerHeader>
              <RecreationDetailContent
                dangerouslySetInnerHTML={{ __html: recreationDetail.content }}
              >
                {}
              </RecreationDetailContent>
            </RecreationDetailRightContainer>
          </RecreationContentContainer>
        </>
      )}
    </RecreationDetailLayout>
  );
};

export default RecreationDetail;
