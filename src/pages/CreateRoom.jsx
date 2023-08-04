import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import COLOR from '../constants/color';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  border: 1px solid ${COLOR.gray};
  border-radius: 8px;
`;

const FormInput = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid ${COLOR.gray};
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${COLOR.blue};
  color: ${COLOR.white};
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const CreateRoom = () => {
  // const [pk, setPK] = useState('');
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [price, setPrice] = useState('');
  const [headCount, setHeadCount] = useState('');
  // const [avg_score, setAvgScore] = useState('');

  const handlesubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://54.180.98.209:8000/lodging/main/', {
        name,
        place,
        price,
        headCount,
      });
      console.log('데이터 전송 성공', response.data);
    } catch (error) {
      console.error('에러 전송 실패', error);
    }
  };
  return (
    <FormContainer>
      <form onSubmit={handlesubmit} method="POST">
        <FormInput
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          type="text"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <FormInput
          type="text"
          placeholder="place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <FormInput
          type="text"
          placeholder="headCount"
          value={headCount}
          onChange={(e) => setHeadCount(e.target.value)}
        />
        {/* <FormInput
          type="text"
          placeholder="score"
          value={avg_score}
          onChange={(e) => setAvgScore(e.target.value)}
        /> */}
        <SubmitButton type="submit">제출하기</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default CreateRoom;
