import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Footer from './components/Footer';

import Views from './routes'

ReactDOM.render(
    <div className = "content"> 
      <Views />
      <Footer />
    </div>,
  document.getElementById('app')
);

