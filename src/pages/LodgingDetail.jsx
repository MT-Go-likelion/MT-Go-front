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
          <LodgingDetailHeader name={lodgingDetail.lodging.name} />
          <LodgingDetailContent
            mainPhoto={lodgingDetail.lodging.mainPhoto}
            photos={lodgingDetail.lodging.photos}
            address={lodgingDetail.lodging.address}
            price={lodgingDetail.lodging.price}
            homePageURL={lodgingDetail.lodging.homePageURL}
            amenities={lodgingDetail.lodging.amenities}
            phoneNumber={lodgingDetail.lodging.phoneNumber}
            headCount={lodgingDetail.lodging.headCount}
            content={lodgingDetail.lodging.content}
            precaution={lodgingDetail.lodging.precaution}
            checkInTime={lodgingDetail.lodging.checkInTime}
            checkOutTime={lodgingDetail.lodging.checkOutTime}
            place={lodgingDetail.lodging.place}
          />
          <LodgingDetailReview />
        </>
      )}
    </LodgingLayout>
  );
};

export default LodgingDetail;
