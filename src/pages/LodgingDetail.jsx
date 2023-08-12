import React from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import {
  LodgingDetailHeader,
  LodgingDetailContent,
  LodgingDetailReview,
} from '../components/LodgingDetail/index';
import useLodgingDetail from '../hooks/queries/Lodging/useLodgingDetail';
import ErrorPage from './Error';
import Loading from './Loading';

const LodgingLayout = styled.div`
  max-width: 1280px;
  margin: auto;
`;

const LodgingDetail = () => {
  const { lodgingId } = useParams();
  const {
    lodgingDetailQuery: { isLoading, error, data: lodgingDetail },
  } = useLodgingDetail(lodgingId);

  return (
    <LodgingLayout>
      {isLoading && <Loading />}
      {error && <ErrorPage />}
      {lodgingDetail && (
        <>
          <LodgingDetailHeader lodging={lodgingDetail} />
          <LodgingDetailContent lodging={lodgingDetail} />
          <LodgingDetailReview lodging={lodgingDetail} />
        </>
      )}
    </LodgingLayout>
  );
};

export default LodgingDetail;
