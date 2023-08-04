export const formatPrice = (price) => {
  if (price === 0) return 0;

  // 숫자만 남긴 후 포맷
  const parts = price.toString().split('.');
  const result = Number(parts[0]).toLocaleString() + (parts[1] ? `.${parts[1]}` : '');

  return result;
};
