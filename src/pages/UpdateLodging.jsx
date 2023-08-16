import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import COLOR from '../constants/color';
import useInput from '../hooks/useInput';
import useLodgingUpdate from '../hooks/queries/Lodging/useLodgingUpdate';
import HorizonLine from '../components/Common/Line/HorizonLine';
import { BASE_URL } from '../config/api';
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
  display: flex;
`;

const ThumbImg = styled.img`
  width: 100%;
  height: 100%;
`;

const ImgText = styled.div`
  margin: 2rem 0;
`;

const ThumbDelteBtn = styled.div``;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;

  margin-bottom: ${(props) => props.mb && `${props.mb}rem`};
`;

const FormLabel = styled.label`
  flex-basis: ${(props) => (props.fb ? `${props.fb}%` : '5%')};
`;

const UpdateLodging = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);
  const location = useLocation();
  const [name, onChangeName] = useInput(location.state.lodging.name);
  const [address, onChangeAddress] = useInput(location.state.lodging.address);
  const [place, onChangePlace] = useInput(location.state.lodging.place);
  const [phoneNumber, onChangePhoneNumber] = useInput(location.state.lodging.phoneNumber);
  const [amenities, onChangeAmenities] = useInput(location.state.lodging.amenities);
  const [homePageURL, onChangeHomePageURL] = useInput(location.state.lodging.homePageURL);
  const [headCount, onChangeHeadCount] = useInput(location.state.lodging.headCount);
  const [content, onChangeContent] = useInput(location.state.lodging.content);
  const [precaution, onChangePrecaution] = useInput(location.state.lodging.precaution);
  const [checkInTime, onChangeCheckInTime] = useInput(location.state.lodging.checkInTime);
  const [checkOutTime, onChangeCheckOutTime] = useInput(location.state.lodging.checkOutTime);
  const [peakWeekendPrice, onChangePeakWeekendPrice] = useInput(
    location.state.lodging.peakWeekendPrice,
  );
  const [peakWeekdayPrice, onChangePeakWeekdayPrice] = useInput(
    location.state.lodging.peakWeekdayPrice,
  );
  const [lowWeekendPrice, onChangeLowWeekendPrice] = useInput(
    location.state.lodging.lowWeekendPrice,
  );
  const [lowWeekdayPrice, onChangeLowWeekdayPrice] = useInput(
    location.state.lodging.lowWeekdayPrice,
  );
  const [myImage, setMyImage] = useState([]);
  const [mainPhoto, setMainPhoto] = useState(location.state.lodging.mainPhoto);
  const [addedMainPhoto, setAddedMainPhoto] = useState('');
  const [photos, setPhotos] = useState(location.state.lodging.photos);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [success, setSuccess] = useState(location.state.lodging.success);
  const [deleteImage, setDeleteImage] = useState([]);

  const navigate = useNavigate();

  const { lodgingUpdateMutation } = useLodgingUpdate(location.state.lodging.pk);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setAddedMainPhoto(selectedFile);
    setMainPhoto(URL.createObjectURL(selectedFile));
  };

  const addImage = (e) => {
    const nowSelectImageList = e.target.files;

    const nowImgURLList = [...myImage];
    const nowFormImgList = [...addedPhotos];

    const nowImageUrl = URL.createObjectURL(nowSelectImageList[0]);
    const newFormImg = nowSelectImageList[0];

    nowImgURLList.push(nowImageUrl);
    nowFormImgList.push(newFormImg);

    setMyImage(nowImgURLList);
    setAddedPhotos(nowFormImgList);
  };

  const deleteImg = (pk) => {
    if (typeof pk === 'number') {
      setPhotos(photos.filter((photo) => photo.pk !== pk));
      setDeleteImage((prev) => [...prev, `${pk}`]);
    }
    if (typeof pk === 'string') {
      setMyImage(myImage.filter((image) => image !== pk));
      setAddedPhotos(
        addedPhotos.filter((image) => {
          return image !== pk;
        }),
      );
    }
  };

  const handlesubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('place', place);
    formData.append('phoneNumber', phoneNumber);
    formData.append('amenities', amenities);
    formData.append('homePageURL', homePageURL);
    formData.append('headCount', headCount);
    formData.append('content', content);
    formData.append('precaution', precaution);
    formData.append('checkInTime', checkInTime);
    formData.append('checkOutTime', checkOutTime);
    formData.append('peakWeekendPrice', peakWeekendPrice);
    formData.append('peakWeekdayPrice', peakWeekdayPrice);
    formData.append('lowWeekendPrice', lowWeekendPrice);
    formData.append('lowWeekdayPrice', lowWeekdayPrice);

    if (mainPhoto !== location.state.lodging.mainPhoto) {
      formData.append('mainPhoto', addedMainPhoto);
    }

    deleteImage.forEach((image) => {
      return formData.append('deleteImage', image);
    });
    addedPhotos.forEach((photo) => {
      return formData.append('photos', photo);
    });
    if (user) {
      lodgingUpdateMutation(formData, {
        onSuccess: () => {
          setSuccess('✅ 숙소가 성공적으로 업데이트 되었습니다!');
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

        <InputContainer>
          <FormLabel fb={20}>가격(성수기 주말 및 공휴일):</FormLabel>
          <FormInput
            fb={80}
            type="text"
            value={peakWeekendPrice}
            onChange={onChangePeakWeekendPrice}
          />
        </InputContainer>
        <InputContainer>
          <FormLabel fb={20}>가격(성수기 평일):</FormLabel>
          <FormInput
            fb={80}
            type="text"
            value={peakWeekdayPrice}
            onChange={onChangePeakWeekdayPrice}
          />
        </InputContainer>
        <InputContainer>
          <FormLabel fb={20}>가격(비성수기 주말 및 공휴일):</FormLabel>
          <FormInput
            fb={80}
            type="text"
            value={lowWeekendPrice}
            onChange={onChangeLowWeekendPrice}
          />
        </InputContainer>
        <InputContainer>
          <FormLabel fb={20}>가격(비성수기 평일):</FormLabel>
          <FormInput
            fb={80}
            type="text"
            value={lowWeekdayPrice}
            onChange={onChangeLowWeekdayPrice}
          />
        </InputContainer>

        <input type="file" onChange={handleImageChange} />
        <ImgText>메인사진</ImgText>

        {mainPhoto === location.state.lodging.mainPhoto && (
          <ThumbImgContainer>
            <ThumbImg src={BASE_URL + location.state.lodging.mainPhoto} alt="lodging" />
          </ThumbImgContainer>
        )}

        {mainPhoto !== location.state.lodging.mainPhoto && (
          <ThumbImgContainer>
            <ThumbImg src={mainPhoto} alt="lodging" />
          </ThumbImgContainer>
        )}

        <label onChange={addImage} htmlFor="input-file" className="input-file">
          <input type="file" multiple="multiple" accept=".jpg,.jpeg,.png" />
        </label>
        <HorizonLine />

        <ImgText>기존 서브사진들</ImgText>
        {photos &&
          photos.map((photo) => (
            <ThumbImgContainer>
              <ThumbImg src={photo.image} alt="lodging" />
              <ThumbDelteBtn onClick={() => deleteImg(photo.pk)}>삭제하기</ThumbDelteBtn>
            </ThumbImgContainer>
          ))}
        <ImgText>추가될 서브 사진들</ImgText>
        {myImage &&
          myImage.map((x) => {
            return (
              <ThumbImgContainer>
                <ThumbImg src={x} alt="lodging" />
                <ThumbDelteBtn onClick={() => deleteImg(x)}>삭제하기</ThumbDelteBtn>
              </ThumbImgContainer>
            );
          })}

        <SubmitButton type="submit">제출하기</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default UpdateLodging;
