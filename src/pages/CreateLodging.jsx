import React, { useState } from 'react';
import styled from 'styled-components';
import COLOR from '../constants/color';
import useInput from '../hooks/useInput';
import useLoding from '../hooks/queries/Lodging/useLodging';

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

const CreateLodging = () => {
  // const [pk, setPK] = useState('');
  const [name, onChangeName] = useInput('');
  const [address, onChangeAddress] = useInput('');
  const [place, onChangePlace] = useInput('');
  const [price, onChangePrice] = useInput('');
  const [phoneNumber, onChangePhoneNumber] = useInput('');
  const [amenities, onChangeAmenities] = useInput('');
  const [homePageURL, onChangeHomePageURL] = useInput('');
  const [headCount, onChangeHeadCount] = useInput('');
  const [content, onChangeContent] = useInput('');
  const [precaution, onChangePrecaution] = useInput('');
  const [checkInTime, onChangeCheckInTime] = useInput('');
  const [checkOutTime, onChangeCheckOutTime] = useInput('');
  const [mainPhoto, setMainPhoto] = useState('');

  const { lodgingMutation } = useLoding();

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setMainPhoto(selectedFile);
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('place', place);
    formData.append('price', price);
    formData.append('phoneNumber', phoneNumber);
    formData.append('amenities', amenities);
    formData.append('homePageURL', homePageURL);
    formData.append('headCount', headCount);
    formData.append('content', content);
    formData.append('precaution', precaution);
    formData.append('checkInTime', checkInTime);
    formData.append('checkOutTime', checkOutTime);
    formData.append('mainPhoto', mainPhoto);
    formData.append('photos', []);

    lodgingMutation(formData);
  };
  return (
    <FormContainer>
      <form onSubmit={handlesubmit} method="POST">
        <FormInput type="text" placeholder="숙소이름" value={name} onChange={onChangeName} />
        <FormInput type="text" placeholder="address" value={address} onChange={onChangeAddress} />
        <FormInput type="text" placeholder="price" value={price} onChange={onChangePrice} />
        <FormInput type="text" placeholder="place" value={place} onChange={onChangePlace} />
        <FormInput
          type="text"
          placeholder="headCount"
          value={headCount}
          onChange={onChangeHeadCount}
        />
        <FormInput
          type="text"
          placeholder="phoneNumber"
          value={phoneNumber}
          onChange={onChangePhoneNumber}
        />
        <FormInput
          type="text"
          placeholder="homePageURL"
          value={homePageURL}
          onChange={onChangeHomePageURL}
        />
        <FormInput
          type="text"
          placeholder="amenities"
          value={amenities}
          onChange={onChangeAmenities}
        />
        <FormInput type="text" placeholder="content" value={content} onChange={onChangeContent} />
        <FormInput
          type="text"
          placeholder="precaution"
          value={precaution}
          onChange={onChangePrecaution}
        />
        <FormInput
          type="text"
          placeholder="checkintime"
          value={checkInTime}
          onChange={onChangeCheckInTime}
        />
        <FormInput
          type="text"
          placeholder="checkouttime"
          value={checkOutTime}
          onChange={onChangeCheckOutTime}
        />
        <input type="file" onChange={handleImageChange} />

        <SubmitButton type="submit">제출하기</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default CreateLodging;
