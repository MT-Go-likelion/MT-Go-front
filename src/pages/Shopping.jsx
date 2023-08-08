import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import ShoppingTable from '../components/Common/Shopping/ShoppingTable';
import ShoppingTag from '../components/Button/ShoppingTag';
import MainBanner from '../assets/images/ShoppingMain.png';
import TagPopup from '../components/Popup/Shopping/TagPopup';
import useShopping from '../hooks/queries/Shopping/useShopping';

const ShoppingLayout = styled.div`
  max-width: 1280px;
  margin: auto;
`;

const BannerImg = styled.img`
  width: 100%;
`;

const Container = styled.div`
  margin: 4rem 8rem;
  display: flex;
  justify-content: center;
`;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  max-width: 40rem;
  justify-content: center;
`;

const CalDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  margin-left: 8rem;
  width: 100%;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 900;
`;

const SelectName = styled.select`
  width: 160px;
  height: 33px;
  border-radius: 32px;
  padding-left: 2rem;
`;

const Shopping = () => {
  // 태그 데이터
  const TagOptions = [
    { TagId: 1, name: '소고기 등심' },
    { TagId: 2, name: '소고기 안심' },
    { TagId: 3, name: 'LA갈비' },
    { TagId: 4, name: '소고기 모듬구이' },
    { TagId: 5, name: '스테이크' },
    { TagId: 6, name: '돼지고기' },
    { TagId: 7, name: '돼지고기' },
    { TagId: 8, name: '돼지고기' },
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

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const [shoppingItems, setShoppingItems] = useState(shoppingList || []); // State to store the shopping items

  const navigate = useNavigate();

  const handleTagClick = (item) => {
    if (user) {
      setIsPopupVisible(true);
      setSelectedItem(item);
    } else {
      navigate('/signin');
    }
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  const handleComplete = (amount, price) => {
    // Perform any actions with amount and price here.
    if (amount && price && selectedItem) {
      const newItem = {
        item: selectedItem.name,
        amount: parseInt(amount, 10),
        price: parseInt(price, 10),
      };
      setShoppingItems((prevItems) => [...prevItems, newItem]);
    }
    setIsPopupVisible(false);
  };

  useEffect(() => {
    setShoppingItems(shoppingList || []);
  }, [shoppingList]);

  return (
    <>
      <BannerImg src={MainBanner} />
      <ShoppingLayout>
        <Container>
          <Flex>
            {TagOptions.map((options) => (
              <ShoppingTag key={options.TagId} onClick={() => handleTagClick(options)}>
                {options.name}
              </ShoppingTag>
            ))}
          </Flex>
        </Container>
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
        <Container>
          <ShoppingTable data={shoppingItems} setShoppingItems={setShoppingItems} />
        </Container>
      </ShoppingLayout>
      <TagPopup
        isVisible={isPopupVisible}
        onClose={handlePopupClose}
        onComplete={(amount, price) => {
          handleComplete(amount, price);
          setIsPopupVisible(false);
        }}
      />
    </>
  );
};

export default Shopping;
