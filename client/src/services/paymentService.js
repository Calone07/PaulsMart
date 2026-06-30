import api from './api';

export const initializePayment = async (paymentData) => {
  const { data } = await api.post('/payment/initialize', paymentData);
  return data;
};

export const verifyPayment = async (transactionId) => {
  const { data } = await api.post('/payment/verify', { transaction_id: transactionId });
  return data;
};
