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
          <LodgingDetailHeader
            name={lodgingDetail.name}
            mainPhoto={lodgingDetail.mainPhoto}
            photos={lodgingDetail.photos}
          />
          <LodgingDetailContent
            address={lodgingDetail.address}
            price={lodgingDetail.price}
            homePageURL={lodgingDetail.homePageURL}
            amenities={lodgingDetail.amenities}
            phoneNumber={lodgingDetail.phoneNumber}
            headCount={lodgingDetail.headCount}
            content={lodgingDetail.content}
            precaution={lodgingDetail.precaution}
            checkInTime={lodgingDetail.checkInTime}
            checkOutTime={lodgingDetail.checkOutTime}
            place={lodgingDetail.place}
          />
          <LodgingDetailReview pk={lodgingDetail.pk} />
        </>
      )}
    </LodgingLayout>
  );
};

export default LodgingDetail;
