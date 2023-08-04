export const formatPrice = (price) => {
  // 숫자만 남긴 후 포맷
  const parts = price.toString().split('.');
  const result = Number(parts[0]).toLocaleString() + (parts[1] ? `.${parts[1]}` : '');

  return result;
};
