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
      setCart(JSON.parse(storagedCart));
    }
  }, []);

  const addProduct = async (productId) => {
    try {
      const { data: productStock } = await api.get(`/stock/${productId}`);

      const stockAmount = productStock.amount;

      if (stockAmount < 1) {
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

  const removeProduct = (productId) => {
    try {
      const existingProduct = cart.find((product) => product.id !== productId);

      if (existingProduct) {
        throw new Error('Produto não existe');
      }

      const newCart = cart.filter((product) => product.id !== productId);
      localStorage.setItem(`${STORAGE_KEY}:cart`, JSON.stringify(newCart));

      setCart(newCart);
    } catch (error) {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({ productId, amount }) => {
    try {
      if (amount < 1) {
        throw new Error('Quantidade inválida');
      }

      const { data: productStock } = await api.get(`/stock/${productId}`);

      const stockAmount = productStock.amout;

      if (stockAmount <= 1) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      const newCart = cart.map((product) => (product.id !== productId ? product : {
        ...product,
        amount,
      }));

      localStorage.setItem(`${STORAGE_KEY}:cart`, JSON.stringify(newCart));

      setCart(newCart);
    } catch (error) {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
        updateProductAmount,
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
