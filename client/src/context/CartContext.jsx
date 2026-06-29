import { createContext, useContext, useReducer, useCallback } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

const storedCart = () => {
  try {
    const saved = localStorage.getItem('techhub-cart');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  localStorage.setItem('techhub-cart', JSON.stringify(items));
};

const cartReducer = (state, action) => {
  let next;
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find((item) => item._id === action.product._id);
      if (existing) {
        next = state.map((item) =>
          item._id === action.product._id
            ? { ...item, quantity: item.quantity + (action.quantity || 1) }
            : item
        );
      } else {
        next = [...state, { ...action.product, quantity: action.quantity || 1 }];
      }
      break;
    }
    case 'REMOVE_ITEM':
      next = state.filter((item) => item._id !== action.id);
      break;
    case 'UPDATE_QUANTITY':
      next = state.map((item) =>
        item._id === action.id
          ? { ...item, quantity: Math.max(1, Math.min(item.stock, action.quantity)) }
          : item
      );
      break;
    case 'CLEAR':
      next = [];
      break;
    default:
      return state;
  }
  saveCart(next);
  return next;
};

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, null, storedCart);

  const addItem = useCallback((product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', product, quantity });
    toast.success(`${product.name} added to cart`);
  }, []);

  const removeItem = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', id });
    toast.success('Item removed from cart');
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
