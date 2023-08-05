import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { RoomAPI } from '../config/api';
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
  const [address, setAddress] = useState('');
  const [place, setPlace] = useState('');
  const [price, setPrice] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [homePageURL, setHomePageURL] = useState('');
  const [headCount, setHeadCount] = useState('');
  const [content, setContent] = useState('');
  const [precaution, setPrecaution] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [mainPhoto, setMainPhoto] = useState('');

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setMainPhoto(selectedFile);
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('address', address);
      formData.append('place', place);
      formData.append('price', price);
      formData.append('phoneNumber', phoneNumber);
      formData.append('homePageURL', homePageURL);
      formData.append('headCount', headCount);
      formData.append('content', content);
      formData.append('precaution', precaution);
      formData.append('checkInTime', checkInTime);
      formData.append('checkOutTime', checkOutTime);
      formData.append('mainPhoto', mainPhoto);

      const response = await axios.post(RoomAPI.CREATEROOM, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
          placeholder="숙소이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
        <FormInput
          type="text"
          placeholder="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <FormInput
          type="text"
          placeholder="homePageURL"
          value={homePageURL}
          onChange={(e) => setHomePageURL(e.target.value)}
        />
        <FormInput
          type="text"
          placeholder="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <FormInput
          type="text"
          placeholder="precaution"
          value={precaution}
          onChange={(e) => setPrecaution(e.target.value)}
        />
        <FormInput
          type="text"
          placeholder="checkintime"
          value={checkInTime}
          onChange={(e) => setCheckInTime(e.target.value)}
        />
        <FormInput
          type="text"
          placeholder="checkouttime"
          value={checkOutTime}
          onChange={(e) => setCheckOutTime(e.target.value)}
        />
        <input type="file" onChange={handleImageChange} />

        <SubmitButton type="submit">제출하기</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default CreateRoom;
