import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import COLOR from '../constants/color';
import useInput from '../hooks/useInput';
import useLoding from '../hooks/queries/Lodging/useLodging';
import ApiCallSuccessPopup from '../components/Common/Popup/ApiCallSuccessPopup';

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

const ThumbImgContainer = styled.div`
  width: 10rem;
  height: 10rem;
`;

const ThumbImg = styled.img`
  width: 100%;
  height: 100%;
`;

const CreateLodging = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

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
  const [myImage, setMyImage] = useState([]);
  const [mainPhoto, setMainPhoto] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const { lodgingMutation } = useLoding();

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setMainPhoto(selectedFile);
  };

  const addImage = (e) => {
    const nowSelectImageList = e.target.files;

    const nowImgURLList = [...myImage];
    const nowFormImgList = [...photos];

    console.log(nowImgURLList, '미리보기 파일 배열');

    const nowImageUrl = URL.createObjectURL(nowSelectImageList[0]);
    const newFormImg = nowSelectImageList[0];

    nowImgURLList.push(nowImageUrl);
    nowFormImgList.push(newFormImg);

    setMyImage(nowImgURLList);
    setPhotos(nowFormImgList);
  };

  const handlesubmit = (event) => {
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
    photos.forEach((photo) => {
      return formData.append('photos', photo);
    });

    if (user) {
      lodgingMutation(formData, {
        onSuccess: () => {
          setSuccess('✅ 숙소가 성공적으로 추가되었습니다!');
          setTimeout(() => setSuccess(null), 3000);
        },
      });
    } else {
      navigate('/signin');
    }
  };
  return (
    <FormContainer>
      <ApiCallSuccessPopup success={success} />
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
        <label onChange={addImage} htmlFor="input-file" className="input-file">
          <input
            type="file"
            multiple="multiple"
            accept=".jpg,.jpeg,.png"
            /* style={{ display: "none" }} */
          />
        </label>
        <div>
          {myImage &&
            myImage.map((x) => {
              return (
                <ThumbImgContainer>
                  <ThumbImg src={x} alt="lodging" />
                </ThumbImgContainer>
              );
            })}
        </div>

        <SubmitButton type="submit">제출하기</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default CreateLodging;
