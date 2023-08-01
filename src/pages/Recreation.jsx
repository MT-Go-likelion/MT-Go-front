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
  return (
    <RecreationLayout>
      <Title>레크레이션</Title>
      <RecreationList>
        {Array.from(Array(100), () => (
          <RecreationItem>
            <RecreationCard />
          </RecreationItem>
        ))}
      </RecreationList>
    </RecreationLayout>
  );
};

export default Recreation;
