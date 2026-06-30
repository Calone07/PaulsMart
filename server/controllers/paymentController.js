import axios from 'axios';
import crypto from 'crypto';

const FLW_BASE = 'https://api.flutterwave.com/v3';

export const initializePayment = async (req, res) => {
  const { amount, email, name, phoneNumber } = req.body;

  const tx_ref = 'tx-' + Date.now() + '-' + crypto.randomBytes(4).toString('hex');

  res.json({
    tx_ref,
    amount,
    public_key: process.env.FLW_PUBLIC_KEY,
    customer: { email, name, phone_number: phoneNumber },
  });
};

export const verifyPayment = async (req, res) => {
  const { transaction_id } = req.body;

  const response = await axios.get(`${FLW_BASE}/transactions/${transaction_id}/verify`, {
    headers: {
      Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
    },
  });

  const data = response.data.data;

  if (data.status === 'successful') {
    res.json({
      status: 'success',
      transaction_id: data.id,
      tx_ref: data.tx_ref,
      amount: data.amount,
      currency: data.currency,
      customer: data.customer,
    });
  } else {
    res.status(400).json({ status: 'failed', message: 'Payment not successful' });
  }
};
