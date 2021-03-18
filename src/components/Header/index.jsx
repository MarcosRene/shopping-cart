import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';
import './styles.scss';

const Header = () => (
  <header className="container__header">
    <div className="content__header">
      <Link to="/">
        Shopping Cart
      </Link>
      <Link to="/cart" className="content__header-cart">
        <MdShoppingBasket size={36} />
      </Link>
    </div>
  </header>
);

export default Header;
