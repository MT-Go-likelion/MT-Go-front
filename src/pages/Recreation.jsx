import React from 'react';
import styled from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import RecreationCard from '../components/Card/RecreationCard';
import useRecreation from '../hooks/queries/Recreation/useRecreation';
import Error from './Error';
import Loading from './Loading';

const RecreationLayout = styled.div`
  max-width: 1280px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 4rem 0;
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
`;

const RecreationItem = styled.li`
  display: flex;
  justify-content: center;
`;

const Recreation = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const {
    recreationsQuery: { isLoading, error, data: recreations },
  } = useRecreation(user ? user.token : '');

  return (
    <RecreationLayout>
      {error && <Error />}
      {isLoading && <Loading />}
      <Title>레크레이션</Title>
      <RecreationList>
        {recreations &&
          recreations.map((recreation) => (
            <RecreationItem key={recreation.pk}>
              <RecreationCard
                pk={recreation.pk}
                name={recreation.name}
                photo={recreation.photo}
                headCountMin={recreation.headCountMin}
                headCountMax={recreation.headCountMax}
                isScrap={recreation.isScrap}
              />
            </RecreationItem>
          ))}
      </RecreationList>
    </RecreationLayout>
  );
};

export default Recreation;
