import React from 'react';
import styled from 'styled-components';

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
  return (
    <LodgingLayout>
      <LodgingDetailHeader />
      <LodgingDetailContent />
      <LodgingDetailReview />
    </LodgingLayout>
  );
};

export default LodgingDetail;
