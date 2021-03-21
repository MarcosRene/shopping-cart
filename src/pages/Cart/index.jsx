import React from 'react';
import { Link } from 'react-router-dom';
import {
  MdRemoveCircleOutline, MdAddCircleOutline, MdDelete, MdRemoveShoppingCart,
} from 'react-icons/md';

import { formatPrice } from '../../utils/formate';
import { useCart } from '../../context/cart';

import './styles.scss';

const Cart = () => {
  const { cart, removeProduct, updateProductAmount } = useCart();

  const cartFormatted = cart.map((product) => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    priceTotal: formatPrice(product.amount * product.price),
  }));

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      // eslint-disable-next-line no-param-reassign
      sumTotal += (product.price * product.amount);

      return sumTotal;
    }, 0),
  );

  function handleProductIncrement(product) {
    updateProductAmount({ productId: product.id, amount: product.amount + 1 });
  }

  function handleProductDecrement(product) {
    updateProductAmount({ productId: product.id, amount: product.amount - 1 });
  }

  return (
    <div className="container">
      <div className="content">
        {cart.length === 0 ? (
          <div className="empty__cart">
            <MdRemoveShoppingCart />
            <div>
              <h2>Oops...</h2>
              <p>Parece que seu carrinho de compras está vazio!</p>
              <Link to="/">
                <span>Comece a comprar</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <table className="table__product">
              <thead>
                <tr>
                  <th aria-label="product image" />
                  <th>Produto</th>
                  <th>Qnt</th>
                  <th>Subtotal</th>
                  <th aria-label="delete icon" />
                </tr>
              </thead>
              <tbody>
                {cartFormatted.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.image} alt={product.title} />
                    </td>
                    <td>
                      <strong>{product.title}</strong>
                      <span>{product.priceFormatted}</span>
                    </td>
                    <td>
                      <div>
                        <button
                          type="button"
                          disabled={product.amount <= 1}
                          onClick={() => handleProductDecrement(product)}
                        >
                          <MdRemoveCircleOutline size={20} />
                        </button>
                        <input
                          type="text"
                          readOnly
                          value={product.amount}
                        />
                        <button
                          type="button"
                          onClick={() => handleProductIncrement(product)}
                        >
                          <MdAddCircleOutline size={20} />
                        </button>
                      </div>
                    </td>
                    <td>
                      <strong>{product.priceFormatted}</strong>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => removeProduct(product.id)}
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <footer>
              <button type="button">Finalizar pedido</button>

              <div>
                <span>Total</span>
                <strong>{total}</strong>
              </div>
            </footer>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
