import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import COLOR from '../constants/color';
import ShoppingTable from '../components/Common/Shopping/ShoppingTable';
import MainBanner from '../assets/images/ShoppingMain.png';
import useShopping from '../hooks/queries/Shopping/useShopping';
import ShoppingCard from '../components/Card/ShoppingCard';

const mediaSize = 1070;
const ShoppingLayout = styled.div`
  max-width: 1280px;
  margin: auto;
`;

const BannerImg = styled.div`
  height: 300px;
  background-image: url(${MainBanner});
  background-position: center;
  background-blend-mode: multiply, normal;
  background-size: cover;
  transition: 0.3s;
  @media (max-width: ${mediaSize}px) {
    background-position: 40% center;

    position: relative;
  }
  @media (max-width: ${mediaSize - 220}px) {
    background-position: 32% center;
  }
`;

const Container = styled.div`
  margin: 2rem 0;
  margin-right: 20rem;
  display: flex;
  justify-content: center;
  @media (max-width: ${mediaSize - 220}px) {
    margin: 2rem 4rem;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const CalDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8rem;
  margin-top: 3rem;
  width: 100%;
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 4rem;
  margin-top: 3rem;
  width: 100%;
`;

const Title = styled.span`
  font-size: 25px;
  font-weight: 900;
`;

const Subtitle = styled.span`
  color: var(--unnamed, #888);
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 180%; /* 43.2px */
  letter-spacing: 0.24px;
`;

const SelectName = styled.select`
  width: 160px;
  height: 33px;
  border-radius: 32px;
  padding-left: 2rem;
`;

const Notification = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${COLOR.primary.blue};
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 9999;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
`;

const Checklist = styled.div`
  height: 660px;
  position: fixed;
  right: 15rem;
  top: 180px;

  transition: opacity 0.2s ease-in-out;
  @media (max-width: 1348px) {
    right: 10rem;
  }
  @media (max-width: 1150px) {
    right: 4rem;
  }
  @media (max-width: 855px) {
    position: static;
  }
`;

const Shopping = () => {
  // 태그 데이터

  const TagOptions = [
    { TagId: 1, name: '소고기 등심 100g', price: '10000' },
    { TagId: 2, name: '소고기 안심 100g', price: '20000' },
    { TagId: 3, name: 'LA갈비 100g', price: '30000' },
    { TagId: 4, name: '소고기 모듬구이 100g', price: '10000' },
    { TagId: 5, name: '스테이크 100g', price: '50000' },
    { TagId: 6, name: '돼지고기 100g', price: '15000' },
    { TagId: 7, name: '돼지고기 100g', price: '15000' },
    { TagId: 8, name: '돼지고기 100g', price: '15000' },
  ];
  // 유저별 스페이스 데이터
  const spaceOptions = [
    { id: 1, name: '개인 스페이스' },
    { id: 2, name: '국민대 스페이스' },
    { id: 3, name: '동아리 스페이스' },
  ];

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const {
    shoppingQuery: { data: shoppingList },
  } = useShopping(user ? user.token : '');

  const [shoppingItems, setShoppingItems] = useState(shoppingList || []);
  const [showNotification, setShowNotification] = useState(false);

  const navigate = useNavigate();

  const handleComplete = (item, price, amount) => {
    if (amount && price) {
      const newItem = {
        item,
        amount: parseInt(amount, 10),
        price: parseInt(price, 10),
      };
      const isItemInList = shoppingItems.some((shoppingItem) => shoppingItem.item === item);
      if (user) {
        if (isItemInList) {
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
          }, 3000);
        } else {
          setShoppingItems((prevItems) => [...prevItems, newItem]);
        }
      } else {
        navigate('/signin');
      }
    }
  };
  const handleScroll = () => {
    const checklist = document.getElementById('checklist');
    if (checklist) {
      const scrollTop = window.scrollY || window.pageYOffset;
      console.log('scrollTop: ', scrollTop);
      const maxScrollTop = 500;
      if (scrollTop + 200 <= maxScrollTop) {
        checklist.style.position = 'absolute';
        checklist.style.top = `${maxScrollTop}px`;
      } else {
        checklist.style.position = 'fixed';
        checklist.style.top = '180px';
      }
    }
  };

  useEffect(() => {
    setShoppingItems(shoppingList || []);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [shoppingList]);

  return (
    <>
      <Notification visible={showNotification}>이미 장바구니에 담긴 품목입니다.</Notification>;
      <BannerImg> </BannerImg>
      <Flex>
        <ShoppingLayout>
          <TitleDiv>
            <CalDiv>
              <Title>장바구니 계산</Title>
              <SelectName>
                {spaceOptions.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </SelectName>
            </CalDiv>
            <Subtitle> 무엇을 사야할지 고민된다면? </Subtitle>
          </TitleDiv>
          <Container>
            <Flex>
              {TagOptions.map((options) => (
                <ShoppingCard
                  key={options.TagId}
                  name={options.name}
                  price={options.price}
                  onCardClick={handleComplete}
                />
              ))}
            </Flex>
          </Container>
        </ShoppingLayout>
        <Checklist id="checklist">
          <ShoppingTable data={shoppingItems} setShoppingItems={setShoppingItems} />
        </Checklist>
      </Flex>
    </>
  );
};

export default Shopping;
