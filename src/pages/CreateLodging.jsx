import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import COLOR from '../constants/color';
import useInput from '../hooks/useInput';
import useLoding from '../hooks/queries/Lodging/useLodging';

import camera from '../assets/images/camera.png';
import ApiCallSuccessPopup from '../components/Common/Popup/ApiCallSuccessPopup';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  margin: auto;
  padding: 2rem;
`;

const FormTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const Form = styled.form``;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;

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

const InputSubContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  margin-bottom: 5rem;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${COLOR.gray};
  border-radius: 4px;
  flex-basis: ${(props) => (props.fb ? `${props.fb}%` : '95%')};

  height: ${(props) => props.height && `${props.height}rem`};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${COLOR.gray};
  border-radius: 4px;
  flex-basis: ${(props) => (props.fb ? `${props.fb}%` : '95%')};

  height: ${(props) => props.height && `${props.height}rem`};
`;

const ImgInput = styled.input`
  display: none;
`;

const ImgBtn = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  cursor: pointer;
  margin-left: 1rem;
`;

const ImgText = styled.div`
  font-size: 0.8rem;
  color: ${COLOR.gray};
  margin-left: 0.7rem;
`;

const PreviewImgContainer = styled.div`
  width: 10rem;
  height: 10rem;
  display: flex;
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
`;

const PreviewImgList = styled.div`
  display: flex;
  gap: 1rem;
`;

const SubTitle = styled.div`
  font-size: 2rem;
  color: ${COLOR.gray};
  font-weight: bold;
`;

const SubmitButton = styled.button`
  width: 7.5rem;
  height: 2.2rem;
  background-color: ${COLOR.primary.blue};
  color: ${COLOR.white};
  border-radius: 1.5rem;
  margin-top: 2rem;
  float: right;
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

const CreateLodging = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const [name, onChangeName] = useInput('');
  const [address, onChangeAddress] = useInput('');
  const [place, onChangePlace] = useInput('');
  const [phoneNumber, onChangePhoneNumber] = useInput('');
  const [amenities, onChangeAmenities] = useInput('');
  const [homePageURL, onChangeHomePageURL] = useInput('');
  const [headCount, onChangeHeadCount] = useInput('');
  const [content, onChangeContent] = useInput('');
  const [precaution, onChangePrecaution] = useInput('');
  const [checkInTime, onChangeCheckInTime] = useInput('');
  const [checkOutTime, onChangeCheckOutTime] = useInput('');
  const [peakWeekendPrice, onChangePeakWeekendPrice] = useInput('');
  const [peakWeekdayPrice, onChangePeakWeekdayPrice] = useInput('');
  const [lowWeekendPrice, onChangeLowWeekendPrice] = useInput('');
  const [lowWeekdayPrice, onChangeLowWeekdayPrice] = useInput('');
  const [myImage, setMyImage] = useState([]);
  const [mainPhoto, setMainPhoto] = useState();
  const [previewMainImg, setPreviewMainImg] = useState('');
  const [photos, setPhotos] = useState([]);

  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const MainImgInputRef = useRef();
  const ImgInputRef = useRef();

  const { lodgingMutation } = useLoding();

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setPreviewMainImg(URL.createObjectURL(selectedFile));
    setMainPhoto(selectedFile);
  };

  const addImage = (e) => {
    const nowSelectImageList = e.target.files;

    const nowImgURLList = [...myImage];
    const nowFormImgList = [...photos];

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
    formData.append('phoneNumber', phoneNumber);
    formData.append('amenities', amenities);
    formData.append('homePageURL', homePageURL);
    formData.append('headCount', headCount);
    formData.append('content', content);
    formData.append('precaution', precaution);
    formData.append('checkInTime', checkInTime);
    formData.append('checkOutTime', checkOutTime);
    formData.append('mainPhoto', mainPhoto);
    formData.append('peakWeekendPrice', peakWeekendPrice);
    formData.append('peakWeekdayPrice', peakWeekdayPrice);
    formData.append('lowWeekendPrice', lowWeekendPrice);
    formData.append('lowWeekdayPrice', lowWeekdayPrice);
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

  const onClickMainImgInput = (e) => {
    e.preventDefault();
    MainImgInputRef.current.click();
  };

  const onClickImgInput = (e) => {
    e.preventDefault();
    ImgInputRef.current.click();
  };

  return (
    <FormContainer>
      <FormTitle>숙박업체 관리</FormTitle>
      <ApiCallSuccessPopup success={success} />
      <InputContainer>
        <FormLabel>제목:</FormLabel>
        <FormInput type="text" value={name} onChange={onChangeName} />
      </InputContainer>
      <Form onSubmit={handlesubmit} method="POST">
        <ImgContainer>
          {previewMainImg && (
            <PreviewImgContainer>
              <PreviewImg src={previewMainImg} alt="main" />
            </PreviewImgContainer>
          )}
          <ImgInput
            type="file"
            accept="image/*"
            ref={MainImgInputRef}
            onChange={handleImageChange}
          />
          <ImgBtn src={camera} onClick={onClickMainImgInput} />
          <ImgText>메인이미지(1장)</ImgText>
        </ImgContainer>
        <ImgContainer>
          <PreviewImgList>
            {myImage &&
              myImage.map((x) => {
                return (
                  <ThumbImgContainer>
                    <ThumbImg src={x} alt="lodging" />
                  </ThumbImgContainer>
                );
              })}
          </PreviewImgList>
          <ImgInput
            type="file"
            multiple="multiple"
            accept=".jpg,.jpeg,.png"
            ref={ImgInputRef}
            onChange={addImage}
          />
          <ImgBtn src={camera} onClick={onClickImgInput} />
          <ImgText>서브이미지(여러 장 가능)</ImgText>
        </ImgContainer>

        <InputContainer>
          <FormLabel>주소:</FormLabel>
          <FormInput type="text" value={address} onChange={onChangeAddress} />
        </InputContainer>
        <InputContainer>
          <FormLabel>홈페이지:</FormLabel>
          <FormInput type="text" value={homePageURL} onChange={onChangeHomePageURL} />
        </InputContainer>
        <InputSubContainer>
          <InputContainer>
            <FormLabel fb={10}>연락처:</FormLabel>
            <FormInput fb={90} type="text" value={phoneNumber} onChange={onChangePhoneNumber} />
          </InputContainer>
          <InputContainer>
            <FormLabel fb={13}>수용인원:</FormLabel>
            <FormInput fb={87} type="text" value={headCount} onChange={onChangeHeadCount} />
          </InputContainer>
        </InputSubContainer>

        <InputContainer>
          <FormLabel>장소:</FormLabel>
          <FormInput type="text" value={place} onChange={onChangePlace} />
        </InputContainer>
        <InputContainer mb={6}>
          <FormLabel>부대시설:</FormLabel>
          <FormInput type="text" value={amenities} onChange={onChangeAmenities} />
        </InputContainer>
        <InputContainer>
          <FormLabel>설명:</FormLabel>
          <FormTextarea type="text" value={content} onChange={onChangeContent} height={15} />
        </InputContainer>
        <InputContainer mb={6}>
          <FormLabel>주의사항:</FormLabel>
          <FormTextarea type="text" value={precaution} onChange={onChangePrecaution} height={15} />
        </InputContainer>
        <SubTitle>체크인 / 체크아웃</SubTitle>
        <InputContainer>
          <FormLabel>체크인:</FormLabel>
          <FormInput type="text" value={checkInTime} onChange={onChangeCheckInTime} />
        </InputContainer>
        <InputContainer mb={6}>
          <FormLabel>체크아웃:</FormLabel>
          <FormInput type="text" value={checkOutTime} onChange={onChangeCheckOutTime} />
        </InputContainer>
        <SubTitle>가격 등록</SubTitle>
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

        <SubmitButton type="submit">완료</SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default CreateLodging;
