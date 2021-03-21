import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';

import './styles.scss';
import { useCart } from '../../context/cart';

const Header = () => {
  const { cart } = useCart();
  const cartSize = cart.length;

  return (
    <header className="container__header">
      <div className="content__header">
        <Link to="/">
          <h1>Shopping Cart</h1>
        </Link>
        <Link to="/cart" className="content__header-cart">
          <div>
            <strong>Meu carrinho</strong>
            <span data-testid="cart-size">
              {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
            </span>
          </div>
          <MdShoppingBasket size={36} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
