import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import COLOR from '../../../constants/color';

// import Submitbutton from '../../Button/SubmitButton';
import useShopping from '../../../hooks/queries/Shopping/useShopping';
import CreatePopup from '../../Popup/Shopping/CreatePopup';
import useTeam from '../../../hooks/queries/Team/useTeam';
import Loading from '../../../pages/Loading';
import Error from '../../../pages/Error';
import useTeamShoppingCreation from '../../../hooks/queries/Team/useTeamShoppingCreation';
import { TEAMAPI } from '../../../config/api';
import { mobileSize } from '../../../utils/MediaSize';
import { formatPrice } from '../../../utils/formatPrice';
import ApiCallSuccessPopup from '../Popup/ApiCallSuccessPopup';

const Container = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  padding: 1rem 0;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  @media (max-width: ${mobileSize}px) {
    width: 342px;
    background-color: ${COLOR.white};
  }
`;

const Title = styled.div`
  width: 80%;
  text-align: center;
  font-size: 28px;
  color: ${COLOR.gray};
  font-weight: 700;

  padding-bottom: 0.5rem;
  border-bottom: 2.5px solid ${COLOR.gray};
  @media (max-width: ${mobileSize}px) {
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  border-top: 2.5px solid ${COLOR.gray};
  width: 80%;
  // min-height: 400px;
`;

const Th = styled.th`
  color: ${COLOR.gray};
  width: 100%;
  padding: 6px;
  font-size: 12px;
  font-weight: 400;
  min-width: 45px;
`;

const Thamount = styled.th`
  color: ${COLOR.gray};
  min-width: 40px;
  padding: 6px;
  font-size: 12px;
  font-weight: 400;
  writing-mode: horizontal-tb; /* This ensures horizontal writing mode */
  text-orientation: mixed;
`;

const Td = styled.td`
  padding: 1px 1px;
  text-align: center;
  max-width: 40px;
  min-width: 40px;
`;
const Tdcancle = styled.td`
  padding: 1px 1px;
  text-align: center;
`;

const Tbody = styled.tbody``;

const SumPrice = styled.div`
  padding: 0.6rem;
  border-bottom: 2.5px solid ${COLOR.gray};
  border-top: 2.5px solid ${COLOR.gray};
  width: 80%;
  font-size: 12px;
  text-align: right;
`;

const EditableTd = styled(Td)`
  position: relative;
`;

const EditInput = styled.input`
  width: 100%;
  padding: 0.3rem;
  border: none;
  border-bottom: 1px solid ${COLOR.lightGray};
  background-color: transparent;
`;

const EditButton = styled.button`
  width: 3.5rem;
  height: 1.5rem;
  border-radius: 16px;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.05));
  background-color: ${COLOR.lightGray};
  transition: 0.2s;
  &:hover {
    background-color: ${COLOR.gray};
    color: ${COLOR.white};
  }
  @media (max-width: ${mobileSize}px) {
    height: 1.8rem;
    width: 6.45rem;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  gap: 1rem;
  height: 100%;
`;

const DeleteButton = styled.button`
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 10px;
  background-color: ${COLOR.lightGray};
  text-align: center;
  color: ${COLOR.white};
  transition: 0.3s;
  &:hover {
    background-color: ${COLOR.gray};
  }
`;
const TrPlusRow = styled.tr`
  text-align: center;
`;

const TrPlus = styled.button`
  width: 3rem;
  height: 1rem;

  border-radius: 14px;
  background-color: ${COLOR.lightGray};
  text-align: center;
  color: ${COLOR.white};
  transition: 0.3s;
  &:hover {
    background-color: ${COLOR.gray};
  }
  margin-bottom: 3rem;
`;

const Item = styled.span`
  font-size: 12px;
`;

const SelectName = styled.select`
  width: 120px;
  height: 25px;
  border-radius: 32px;
  border: 1px solid ${COLOR.lightGray};
  color: ${COLOR.gray};
  padding-left: 5px;
  @media (max-width: ${mobileSize}px) {
    width: 160px;
    height: 32px;
    background: #f7f9fa;
    border: none;
  }
`;

const Submitbtn = styled.button`
  @media (max-width: ${mobileSize}px) {
    padding: 0 2.5rem;
    height: 30px;
    background-color: ${COLOR.primary.blue};
    border-radius: 16px;
  }
`;

const SelectOption = styled.option``;

const ShoppingTable = ({ data, setShoppingItems, selectedSpace, setSelectedSpace }) => {
  const [editHandle, setEditHandle] = useState(false);
  const [CreatePopupVisible, setCreatePopupVisible] = useState(false);
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize); // 모바일 여부
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const {
    teamQuery: { isLoading, error, data: teams },
  } = useTeam(user ? user.token : '');

  const {
    shoppingQuery: { data: shoppingList },
  } = useShopping(user ? user.token : '');

  const { shoppingMutation } = useShopping(user ? user.token : '');
  const { teamShoppingMutation } = useTeamShoppingCreation(user ? user.token : '');

  const totalSum = data.reduce((acc, item) => acc + item.price * item.amount, 0);

  const handleEditClick = () => {
    if (user) {
      setEditHandle(true);
    } else {
      navigate('/signin');
    }
  };

  const handleEditComplete = (item, amount, price) => {
    setEditHandle(false);
    if (amount && price && item) {
      const newItem = {
        item,
        amount: parseInt(amount, 10),
        price: parseInt(price, 10),
      };
      setShoppingItems((prevItems) => [...prevItems, newItem]);
      console.log(item, amount, price);
    }
    setCreatePopupVisible(false);
  };

  const handleInputChange = (e, item) => {
    const { name, value } = e.target;
    const itemIndex = data.findIndex((i) => i.item === item.item);
    const updatedData = data.map((dataItem, index) => {
      if (index === itemIndex) {
        const updatedItem = { ...dataItem };

        if (name === 'amount') {
          updatedItem.amount = parseInt(value, 10);
          updatedItem.totalPrice = updatedItem.amount * updatedItem.price;
        } else if (name === 'price') {
          updatedItem.price = parseFloat(value);
          updatedItem.totalPrice = updatedItem.amount * updatedItem.price;
        } else if (name === 'totalPrice') {
          updatedItem.totalPrice = parseFloat(value);
        }

        return updatedItem;
      }
      return dataItem;
    });
    setShoppingItems(updatedData);
  };

  const hanelSelectChange = (e) => {
    const teamToken = e.target.value;
    setSelectedSpace(teamToken);

    if (teamToken !== 'private') {
      axios
        .get(TEAMAPI.TEAMSHOPPING, {
          params: { teamToken: e.target.value },
          headers: { Authorization: `Token ${user.token}` },
        })
        .then((res) => setShoppingItems(res.data));
    } else {
      setShoppingItems(shoppingList);
    }
  };

  const handleDeleteClick = (e, item) => {
    e.stopPropagation();

    const updatedData = data.filter((dataItem) => dataItem.item !== item.item);
    setShoppingItems(updatedData);
  };

  const handleCreateClick = () => {
    setCreatePopupVisible(true);
  };

  const handleCreateClose = () => {
    setCreatePopupVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user) {
      if (selectedSpace === 'private') {
        shoppingMutation(data, {
          onSuccess: () => {
            setSuccess('✅ 개인스페이스에 장보기 목록이 추가되었습니다');
            setTimeout(() => setSuccess(null), 1500);
          },
        });
      } else {
        teamShoppingMutation(
          data.map((dataItem) => {
            return { ...dataItem, teamToken: selectedSpace };
          }),
          {
            onSuccess: () => {
              setSuccess('✅ 해당 팀스페이스에 장보기 목록이 추가되었습니다');
              setTimeout(() => setSuccess(null), 1500);
            },
          },
        );
      }
    } else {
      navigate('/signin');
    }
  };
  const handleResize = () => {
    setIsMobile(window.innerWidth <= mobileSize);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container>
      <ApiCallSuccessPopup success={success} />

      {isMobile ? '' : <Title>Check List</Title>}

      <SelectName onChange={hanelSelectChange}>
        {isLoading && <Loading />}
        {error && <Error />}
        <SelectOption value="private">개인 스페이스</SelectOption>
        {teams &&
          teams.map((team) => (
            <SelectOption key={team.teamToken} value={team.teamToken}>
              {team.teamName}
            </SelectOption>
          ))}
      </SelectName>
      <Table>
        <thead>
          <tr>
            <Th>상품명</Th>
            <Thamount>수량</Thamount>
            <Th>단가</Th>
            <Th>총금액</Th>
            {editHandle === true ? <Th>삭제</Th> : ''}
          </tr>
        </thead>
        <Tbody>
          {data.map((item) => (
            <tr key={item.item}>
              <Td>
                {editHandle === true ? (
                  <EditInput
                    name="item"
                    value={item.item}
                    onChange={(e) => handleInputChange(e, item)}
                  />
                ) : (
                  <Item>{item.item}</Item>
                )}
              </Td>
              <EditableTd>
                {editHandle === true ? (
                  <EditInput
                    name="amount"
                    value={item.amount}
                    onChange={(e) => handleInputChange(e, item)}
                  />
                ) : (
                  <Item>{item.amount}</Item>
                )}
              </EditableTd>
              <EditableTd>
                {editHandle === true ? (
                  <EditInput
                    name="price"
                    value={item.price}
                    onChange={(e) => handleInputChange(e, item)}
                  />
                ) : (
                  <Item>{formatPrice(item.price)}</Item>
                )}
              </EditableTd>
              <Td>
                <Item>{formatPrice(item.amount * item.price)}</Item>
              </Td>
              <Tdcancle>
                {editHandle === true ? (
                  <DeleteButton onClick={(e) => handleDeleteClick(e, item)}>X</DeleteButton>
                ) : (
                  ''
                )}
              </Tdcancle>
            </tr>
          ))}
          {editHandle !== true ? (
            <TrPlusRow>
              <Td colSpan="5">
                <TrPlus onClick={() => handleCreateClick()}>+</TrPlus>
              </Td>
            </TrPlusRow>
          ) : (
            ''
          )}
          <CreatePopup
            isVisible={CreatePopupVisible}
            onClose={handleCreateClose}
            onComplete={(item, amount, price) => {
              handleEditComplete(item, amount, price);
              setCreatePopupVisible(false);
            }}
          />
        </Tbody>
      </Table>
      <SumPrice>총 금액 : {formatPrice(totalSum)} 원 </SumPrice>

      {CreatePopupVisible !== true ? (
        <ButtonDiv>
          {editHandle !== true ? (
            <EditButton onClick={handleEditClick}>수정</EditButton>
          ) : (
            <EditButton onClick={handleEditComplete}>완료</EditButton>
          )}
          {editHandle !== true ? <Submitbtn onClick={handleSubmit}>제출</Submitbtn> : ''}
        </ButtonDiv>
      ) : (
        ''
      )}
    </Container>
  );
};

export default ShoppingTable;
