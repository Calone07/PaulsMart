import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import Container from '../components/ui/Container';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ProductImage from '../components/ui/ProductImage';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { initializePayment, verifyPayment } from '../services/paymentService';
import { createOrder } from '../services/orderService';
import toast from 'react-hot-toast';

function FlutterwavePayment({ config, onSuccess, onClose }) {
  const handleFlutterPayment = useFlutterwave(config);

  useEffect(() => {
    handleFlutterPayment({
      callback: (response) => {
        closePaymentModal();
        onSuccess(response);
      },
      onClose,
    });
  }, []);

  return null;
}

export default function Checkout() {
  const { user, loading: authLoading } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: user?.name || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentConfig, setPaymentConfig] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    if (!form.address.trim()) errs.address = 'Address is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.state.trim()) errs.state = 'State is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePaymentSuccess = useCallback(async (response) => {
    if (response.status === 'successful' || response.transaction_id) {
      toast.loading('Verifying payment...');
      try {
        const verified = await verifyPayment(response.transaction_id);
        if (verified.status === 'success') {
          const order = await createOrder({
            orderItems: items.map((item) => ({
              product: item._id,
              name: item.name,
              image: item.images?.[0] || '',
              price: item.price,
              quantity: item.quantity,
            })),
            shippingAddress: form,
            paymentInfo: {
              tx_ref: response.tx_ref,
              transaction_id: verified.transaction_id,
              status: 'successful',
            },
            itemsPrice: totalPrice,
            totalPrice,
          });
          clearCart();
          toast.dismiss();
          toast.success('Payment successful!');
          navigate(`/order/${order._id}`);
        } else {
          toast.dismiss();
          toast.error('Payment verification failed');
        }
      } catch {
        toast.dismiss();
        toast.error('Something went wrong. Please contact support.');
      }
    }
  }, [items, form, totalPrice, clearCart, navigate]);

  const handlePay = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const init = await initializePayment({
        amount: totalPrice,
        email: user.email,
        name: form.fullName,
        phoneNumber: form.phone,
      });

      setPaymentConfig({
        public_key: init.public_key,
        tx_ref: init.tx_ref,
        amount: init.amount,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd,account',
        customer: init.customer,
        customizations: {
          title: 'PaulsMart',
          description: 'Payment for your order',
        },
      });
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error('Failed to initialize payment');
    }
  };

  const handlePaymentClose = useCallback(() => {
    setPaymentConfig(null);
  }, []);

  if (authLoading) return null;

  if (!user) {
    return (
      <Container className="py-20">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-dark mb-2">Sign in to checkout</h2>
          <p className="text-gray-500 mb-6">You need to be signed in to place an order.</p>
          <Link to="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="py-20">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-dark mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some items before checking out.</p>
          <Link to="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8 lg:py-12">
      {paymentConfig && (
        <FlutterwavePayment
          config={paymentConfig}
          onSuccess={handlePaymentSuccess}
          onClose={handlePaymentClose}
        />
      )}

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-dark mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-dark mb-4">Delivery Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Input label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} placeholder="John Doe" />
                </div>
                <div className="sm:col-span-2">
                  <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="080 123 4567" />
                </div>
                <div className="sm:col-span-2">
                  <Input label="Delivery Address" name="address" value={form.address} onChange={handleChange} error={errors.address} placeholder="123 Main St" />
                </div>
                <Input label="City" name="city" value={form.city} onChange={handleChange} error={errors.city} placeholder="Lagos" />
                <Input label="State" name="state" value={form.state} onChange={handleChange} error={errors.state} placeholder="Lagos" />
                <div className="sm:col-span-2">
                  <Input label="Delivery Notes (optional)" name="notes" value={form.notes} onChange={handleChange} placeholder="Leave at the gate" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold text-dark mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item._id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                      <ProductImage src={item.images?.[0]} alt={item.name} categoryName={item.category?.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-dark truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-dark">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-dark">${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium text-dark">Calculated at delivery</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-dark pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
              </div>
              <Button className="w-full mt-6" size="lg" onClick={handlePay} loading={loading}>
                Pay ${totalPrice.toLocaleString()}
              </Button>
              <p className="text-xs text-gray-400 text-center mt-3">Secured by Flutterwave</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
