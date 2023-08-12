import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import COLOR from '../constants/color';
import useInput from '../hooks/useInput';
import useLodgingUpdate from '../hooks/queries/Lodging/useLodgingUpdate';

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

const SuccessText = styled.div`
  font-size: 1.75rem;
  font-size: bold;
`;

const UpdateLodging = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const location = useLocation();

  const [name, onChangeName] = useInput(location.state.lodging.name);
  const [address, onChangeAddress] = useInput(location.state.lodging.address);
  const [place, onChangePlace] = useInput(location.state.lodging.place);
  const [price, onChangePrice] = useInput(location.state.lodging.price);
  const [phoneNumber, onChangePhoneNumber] = useInput(location.state.lodging.phoneNumber);
  const [amenities, onChangeAmenities] = useInput(location.state.lodging.amenities);
  const [homePageURL, onChangeHomePageURL] = useInput(location.state.lodging.homePageURL);
  const [headCount, onChangeHeadCount] = useInput(location.state.lodging.headCount);
  const [content, onChangeContent] = useInput(location.state.lodging.content);
  const [precaution, onChangePrecaution] = useInput(location.state.lodging.precaution);
  const [checkInTime, onChangeCheckInTime] = useInput(location.state.lodging.checkInTime);
  const [checkOutTime, onChangeCheckOutTime] = useInput(location.state.lodging.checkOutTime);
  const [mainPhoto, setMainPhoto] = useState('');
  const [success, setSuccess] = useState(location.state.lodging.success);

  const navigate = useNavigate();

  const { lodgingUpdateMutation } = useLodgingUpdate(location.state.lodging.pk);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    setMainPhoto(selectedFile);
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    console.log(
      name,
      address,
      place,
      price,
      phoneNumber,
      amenities,
      homePageURL,
      headCount,
      content,
      precaution,
      checkInTime,
      checkOutTime,
      mainPhoto,
    );
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
    // formData.append('mainPhoto', mainPhoto);
    // formData.append('deleteImage', []);
    // formData.append('photos', []);

    if (user) {
      lodgingUpdateMutation(formData, {
        onSuccess: (data) => {
          console.log(data);
          setSuccess('✅ 제품이 성공적으로 업데이트 되었습니다!');
          setTimeout(() => setSuccess(null), 3000);
        },
      });
    } else {
      navigate('/signin');
    }
  };
  return (
    <FormContainer>
      {success && <SuccessText className="text-2xl font-semibold">{success}</SuccessText>}
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

export default UpdateLodging;
