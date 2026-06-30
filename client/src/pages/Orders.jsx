import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { getMyOrders } from '../services/orderService';

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Container className="py-20">
        <Spinner />
      </Container>
    );
  }

  return (
    <Container className="py-8 lg:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-dark mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h2 className="text-2xl font-bold text-dark mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">Start shopping to place your first order.</p>
            <Link to="/shop">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order._id}
                to={`/order/${order._id}`}
                className="block bg-white rounded-3xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-dark">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[order.status] || 'bg-gray-100 text-gray-700'}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                  <span className="font-bold text-dark">${order.totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  {order.orderItems.slice(0, 4).map((item) => (
                    <div key={item._id} className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0" />
                  ))}
                  {order.orderItems.length > 4 && (
                    <span className="text-xs text-gray-400">+{order.orderItems.length - 4} more</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
