import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Footer from './components/Footer';

import Views from './routes'

ReactDOM.render(
    <div className = {window.localStorage.getItem('theme') == ''?'light'
    :window.localStorage.getItem('theme')}> 
      <Views />
      <Footer />
    </div>,
  document.getElementById('app')
);

