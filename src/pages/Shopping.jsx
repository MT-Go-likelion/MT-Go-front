import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import COLOR from '../constants/color';

import ShoppingTable from '../components/Common/Shopping/ShoppingTable';
import MainBanner from '../assets/images/ShoppingMain.png';
import ShoppingMobileBack from '../assets/images/ShoppingMobileBack.png';
import useShopping from '../hooks/queries/Shopping/useShopping';
import ShoppingCard from '../components/Card/ShoppingCard';
import { mobileSize } from '../utils/MediaSize';
import { shoppingOptions } from '../constants/shopping';

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
  @media (max-width: ${mobileSize}px) {
    width: 100%;
    height: 261.524px;
    background-image: url(${ShoppingMobileBack});
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
  @media (max-width: ${mobileSize}px) {
    margin: 0;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  @media (max-width: ${mobileSize}px) {
    margin-top: 1rem;
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-behavior: smooth;
    width: 342px;
    height: 150px;
    justify-content: left;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: center;
  @media (max-width: ${mobileSize}px) {
    gap: 2rem;
  }
`;

const CalDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 3rem;
  width: 100%;
  @media (max-width: ${mobileSize}px) {
    margin: 0;
    gap: 0;
    width: 342px;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  margin-left: 4rem;
  margin-top: 3rem;
  width: 100%;
  @media (max-width: ${mobileSize}px) {
    margin-left: 0;
    margin-top: 0;
  }
`;

const Title = styled.span`
  font-size: 25px;
  font-weight: 900;
  @media (max-width: ${mobileSize}px) {
    font-size: 16px;
    font-style: normal;
    font-weight: 900;
    line-height: 180%;
  }
`;

const Subtitle = styled.span`
  color: var(--unnamed, #888);
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 180%; /* 43.2px */
  letter-spacing: 0.24px;
  @media (max-width: ${mobileSize}px) {
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 180%;
  }
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
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  display: ${(props) => (props.$visible ? 'block' : 'none')};
  transition: opacity 0.2s ease-in-out;
`;

const Checklist = styled.div`
  height: 660px;
  position: fixed;
  right: 15%;
  top: 500px;

  transition: opacity 0.2s ease-in-out;
  @media (max-width: 1380px) {
    right: 10%;
  }
  @media (max-width: 1210px) {
    right: 4%;
  }
  @media (max-width: 855px) {
    position: static !important;
  }
`;

const DivMobileBack = styled.div`
  width: 100%;
  background: #f7f9fa;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.1) inset;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1.4rem;
  padding-top: 1.4rem;
`;

const Shopping = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize); // 모마일여부
  const [selectedSpace, setSelectedSpace] = useState('private');

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
          console.log(showNotification);
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
  const handleResize = () => {
    setIsMobile(window.innerWidth <= mobileSize);
  };

  useEffect(() => {
    setShoppingItems(shoppingList || []);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [shoppingList]);

  return (
    <>
      <Notification visible={showNotification}>이미 장바구니에 담긴 품목입니다.</Notification>
      <BannerImg> </BannerImg>
      <FlexDiv>
        <ShoppingLayout>
          <TitleDiv>
            <CalDiv>
              <Title>장바구니</Title>
              <Subtitle> 무엇을 사야할지 고민된다면? </Subtitle>
            </CalDiv>
          </TitleDiv>
          <Container>
            <Flex>
              {shoppingOptions.map((options) => (
                <div>
                  {isMobile ? (
                    <ShoppingCard
                      key={options.TagId}
                      name={options.name}
                      price={options.price}
                      onCardClick={handleComplete}
                      img={options.img}
                    />
                  ) : (
                    <ShoppingCard
                      key={options.TagId}
                      name={options.name}
                      price={options.price}
                      onCardClick={handleComplete}
                      img={options.img}
                    />
                  )}
                </div>
              ))}
            </Flex>
          </Container>
        </ShoppingLayout>
        {!isMobile ? (
          <Checklist id="checklist">
            <ShoppingTable
              data={shoppingItems}
              setShoppingItems={setShoppingItems}
              selectedSpace={selectedSpace}
              setSelectedSpace={setSelectedSpace}
            />
          </Checklist>
        ) : (
          <DivMobileBack>
            <CalDiv>
              <Title>Check List</Title>
              <Subtitle> 필요한 물품들을 손쉽게 체크해보세요. </Subtitle>
            </CalDiv>
            <Checklist id="checklist">
              <ShoppingTable
                data={shoppingItems}
                setShoppingItems={setShoppingItems}
                selectedSpace={selectedSpace}
                setSelectedSpace={setSelectedSpace}
              />
            </Checklist>{' '}
          </DivMobileBack>
        )}
      </FlexDiv>
    </>
  );
};

export default Shopping;
