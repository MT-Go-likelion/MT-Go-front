import React from 'react';
import styled from 'styled-components';
import RecreationCard from '../components/Card/RecreationCard';

const RecreationLayout = styled.div``;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 4rem;
`;

const RecreationList = styled.ul`
  width: 100%;
  display: grid;
  gap: 1.5rem;
  padding: 0 2rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
`;

const Recreation = () => {
  return (
    <RecreationLayout>
      <Title>레크레이션</Title>
      <RecreationList>
        {Array.from(Array(100), () => (
          <RecreationCard />
        ))}
      </RecreationList>
    </RecreationLayout>
  );
};

export default Recreation;
