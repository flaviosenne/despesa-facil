import React from 'react';
import ReactDOM from 'react-dom';

import AlertTemplate from 'react-alert-template-basic'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import './index.css';
import Footer from './components/Footer';

import Views from './routes'

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 4000,
  offset: '20px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
  type: 'success'
}
ReactDOM.render(
  <div className={window.localStorage.getItem('theme') == '' ? 'light'
    : window.localStorage.getItem('theme')}>
    <AlertProvider template={AlertTemplate} {...options}>
      <Views />
      <Footer />
    </AlertProvider>
  </div>,
  document.getElementById('app')
);

