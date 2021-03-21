import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import './global.scss';
import Routes from './routes';
import { CartProdiver } from './context/cart';

function App() {
  return (
    <BrowserRouter>
      <CartProdiver>
        <Header />
        <Routes />
        <ToastContainer position="top-right" autoClose={4000} />
      </CartProdiver>
    </BrowserRouter>
  );
}

export default App;
