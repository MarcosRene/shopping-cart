import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../utils/formate';
import api from '../../services/api';

import './styles.scss';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products');

      const data = response.data.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <div className="container">
      <ul className="list__items">
        {products.map((product) => (
          <li key={product.id} className="list__items-item">
            <img
              src={product.image}
              alt={product.title}
            />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <button type="button">
              <div>
                <MdAddShoppingCart size={16} color="#f7fafc" />
                {product.amout || 0}
              </div>
              <span>Adicionar ao carrinho</span>
            </button>
          </li>
        ))}

      </ul>
    </div>
  );
};

export default Home;
