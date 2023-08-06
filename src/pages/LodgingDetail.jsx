import React from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import {
  LodgingDetailHeader,
  LodgingDetailContent,
  LodgingDetailReview,
} from '../components/LodgingDetail/index';

const LodgingLayout = styled.div`
  max-width: 1280px;
  margin: auto;
`;

const LodgingDetail = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <LodgingLayout>
      <LodgingDetailHeader />
      <LodgingDetailContent />
      <LodgingDetailReview />
    </LodgingLayout>
  );
};

export default LodgingDetail;
