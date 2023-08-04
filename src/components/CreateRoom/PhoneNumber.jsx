import React, { useState } from 'react';
import FormInput from '../../pages/CreateRoom';

const FormInput = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid ${COLOR.gray};
  border-radius: 4px;
`;

const AddressInput = ({ onChange }) => {
  const [address, setAddress] = useState('');

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    onChange(e.target.value);
  };

  return (
    <FormInput type="text" placeholder="Address" value={address} onChange={handleAddressChange} />
  );
};

export default AddressInput;
