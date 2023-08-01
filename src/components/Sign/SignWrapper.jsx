import React from 'react';
import styled from 'styled-components';
import COLOR from '../../constants/color';

const LoginLayout = styled.div`
  width: 40rem;
  height: auto;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  padding-top: 3rem;
  padding-bottom: 3rem;
  margin-top: 4rem;
`;

const Title = styled.div`
  font-size: 2.6rem;
  font-weight: 900;
  color: ${COLOR.black};
  margin-bottom: 3rem;
`;

const SignWrapper = ({ title, children }) => (
  <LoginLayout>
    <Title>{title}</Title>
    {children}
  </LoginLayout>
);

export default SignWrapper;
