import { useState, useCallback } from 'react';

const useSelect = (initialValue = []) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler];
};
export default useSelect;
