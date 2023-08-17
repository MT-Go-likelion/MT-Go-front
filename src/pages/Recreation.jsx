import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import Pagination from 'react-js-pagination';
import RecreationCard from '../components/Card/RecreationCard';
import CustomRecreationCard from '../components/Mobile/RecreationMobileCard';
import useRecreation from '../hooks/queries/Recreation/useRecreation';
import Error from './Error';
import Loading from './Loading';
import { mobileSize } from '../utils/MediaSize';

const RecreationLayout = styled.div`
  max-width: 1280px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 4rem 0;
  @media (max-width: ${mobileSize}px) {
    font-size: 1rem;
    margin: 4rem 2rem 1rem 2rem;
    font-style: normal;
    font-weight: 900;
    line-height: 180%;
  }
`;

const RecreationList = styled.ul`
  width: 100%;
  display: grid;
  gap: 1.5rem;
  padding: 0 2rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media (max-width: ${mobileSize}px) {
    margin-bottom: 7rem;
  }
`;

const RecreationItem = styled.li`
  display: flex;
  justify-content: center;
`;

const Recreation = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize);

  const [page, setPage] = useState(1);

  const {
    recreationsQuery: { isLoading, error, data: recreations },
  } = useRecreation(user ? user.token : '', page);
  console.log(recreations);

  const handlePageChange = (page) => {
    setPage(page);
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
  return (
    <RecreationLayout>
      {error && <Error />}
      {isLoading && <Loading />}
      <Title>레크레이션</Title>
      <RecreationList>
        {recreations &&
          recreations.results.map((recreation) => (
            <RecreationItem key={recreation.pk}>
              {isMobile ? (
                <CustomRecreationCard
                  key={recreation.pk}
                  pk={recreation.pk}
                  name={recreation.name}
                  photo={recreation.photo}
                  headCountMin={recreation.headCountMin}
                  headCountMax={recreation.headCountMax}
                  isScrap={recreation.isScrap}
                  scrapCount={recreation.scrapCount}
                />
              ) : (
                <RecreationCard
                  key={recreation.pk}
                  pk={recreation.pk}
                  name={recreation.name}
                  photo={recreation.photo}
                  headCountMin={recreation.headCountMin}
                  headCountMax={recreation.headCountMax}
                  isScrap={recreation.isScrap}
                  scrapCount={recreation.scrapCount}
                />
              )}
            </RecreationItem>
          ))}
      </RecreationList>
      {recreations && (
        <Pagination
          activePage={page} // 현재 페이지
          itemsCountPerPage={8} // 한 페이지에 보여줄 아이템 개수
          totalItemsCount={recreations.count} // 총 아이템 개수
          pageRangeDisplayed={Math.floor(recreations.count / 2) + 1} // 페이지 범위
          prevPageText="‹"
          nextPageText="›"
          onChange={handlePageChange}
        />
      )}
    </RecreationLayout>
  );
};

export default Recreation;
