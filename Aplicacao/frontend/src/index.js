import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';

import Views from './routes'

ReactDOM.render(
    <>
    <Header />
    <div className = "content"> 
      <Views />
    </div> 
    <Footer />
    </>,
  document.getElementById('app')
);

