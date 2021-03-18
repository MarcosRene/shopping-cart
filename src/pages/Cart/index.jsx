import React from 'react';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';

import './styles.scss';

const Cart = () => (
  <div className="container">
    <div className="content">
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
          <tr>
            <td>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_0aP-ccYXK1oqts6QR93819kZDp2nEDjFPmX89qNDFXy0ZUoy2pC9v7CsQgDX3hhDaOTnop0&usqp=CAc" alt="" />
            </td>
            <td>
              <strong>Tenis Nike Revolution 5 Preto/branco</strong>
              <span>R$309,99</span>
            </td>
            <td>
              <div>
                <button
                  type="button"
                >
                  <MdRemoveCircleOutline size={20} />
                </button>
                <input
                  type="text"
                  value="1"
                />
                <button
                  type="button"
                >
                  <MdAddCircleOutline size={20} />
                </button>
              </div>
            </td>
            <td>
              <strong>309,99</strong>
            </td>
            <td>
              <button
                type="button"
              >
                <MdDelete size={20} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <footer>
        <button type="button">Finalizar pedido</button>

        <div>
          <span>Total</span>
          <strong>R$309,99</strong>
        </div>
      </footer>
    </div>
  </div>
);

export default Cart;
