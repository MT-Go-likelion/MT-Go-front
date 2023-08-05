import React from 'react';
import styled from 'styled-components';

import COLOR from '../constants/color';

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

const RecreationImg = styled.div`
  width: 100%;
  height: 40rem;
  background-color: ${COLOR.primary.lightBlue};
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
  return (
    <RecreationDetailLayout>
      <RecreationTitle>Title</RecreationTitle>
      <RecreationContentContainer>
        <RecreationDetailLeftContiner>
          <RecreationImg />
        </RecreationDetailLeftContiner>
        <RecreationDetailRightContainer>
          <RecommendedNum>추천인원: nn~nn명</RecommendedNum>
          <TeamspaceBtn>팀스페이스 담기</TeamspaceBtn>
          <RecreationDetailContent>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
            quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat. Duis Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
            enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
            aliquip ex ea commodo consequat. Duis <br /> <br />
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
            quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat. Duis Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
            enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
            aliquip ex ea commodo consequat. Duis
          </RecreationDetailContent>
        </RecreationDetailRightContainer>
      </RecreationContentContainer>
    </RecreationDetailLayout>
  );
};

export default RecreationDetail;
