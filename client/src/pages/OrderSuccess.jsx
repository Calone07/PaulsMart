import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { getOrderById } from '../services/orderService';

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrderById(id)
      .then(setOrder)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Container className="py-20">
        <Spinner />
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="py-20">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-dark mb-2">Order not found</h2>
          <Link to="/shop"><Button>Back to Shop</Button></Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8 lg:py-12">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-dark mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-500">Thank you for your order. We'll notify you when it ships.</p>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-gray-100 p-6 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-dark">Order #{order._id.slice(-8).toUpperCase()}</h2>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
            {order.status}
          </span>
        </div>

        <div className="space-y-3 mb-6">
          {order.orderItems.map((item) => (
            <div key={item._id} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-gray-100" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-dark truncate">{item.name}</p>
                <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-semibold text-dark">${(item.price * item.quantity).toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-4 space-y-2 mb-6">
          <h3 className="text-sm font-semibold text-dark mb-2">Delivery Address</h3>
          <p className="text-sm text-gray-600">{order.shippingAddress.fullName}</p>
          <p className="text-sm text-gray-600">{order.shippingAddress.phone}</p>
          <p className="text-sm text-gray-600">{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state}</p>
        </div>

        <div className="border-t border-gray-100 pt-4 flex justify-between text-lg font-bold text-dark">
          <span>Total Paid</span>
          <span>${order.totalPrice.toLocaleString()}</span>
        </div>
      </div>

      <div className="text-center">
        <Link to="/orders">
          <Button variant="outline">View All Orders</Button>
        </Link>
        <Link to="/shop" className="ml-4">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    </Container>
  );
}
