import React, {
  useState,
  useEffect,
  createContext,
  useContext,
} from 'react';
import { toast } from 'react-toastify';
import { STORAGE_KEY } from '../../constants';
import api from '../../services/api';

const CartContext = createContext();

function CartProdiver({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storagedCart = localStorage.getItem(`${STORAGE_KEY}:cart`);

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  }, []);

  const addProduct = async (productId) => {
    try {
      const { data: productStock } = await api.get(`/stock/${productId}`);

      if (productStock.amount <= 1) {
        throw new Error('Quantidade solicitada fora de estoque');
      }

      let existingProduct = cart.find((product) => product.id === productId);
      let newCart = [];

      if (!existingProduct) {
        const { data } = await api.get(`/products/${productId}`);

        existingProduct = {
          ...data,
          amount: 1,
        };

        newCart = [...cart, existingProduct];
        setCart(newCart);
      } else {
        newCart = cart.map((product) => (product.id !== productId ? product : {
          ...product,
          amount: product.amount + 1,
        }));

        setCart(newCart);
      }

      localStorage.setItem(`${STORAGE_KEY}:cart`, JSON.stringify(newCart));
    } catch (error) {
      toast.error(error.message.includes('fora de estoque') ? error.message : 'Erro na adição do produto');
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      addProduct,
    }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within an CartProdiver');
  }

  return context;
}

export { CartProdiver, useCart };
