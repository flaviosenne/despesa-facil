import React from 'react';
import { Link } from 'react-router-dom'
import '../index.css';

import Header from '../components/Header'

import cifrao from '../icons/cifrao.png'
import cifrao_black from '../icons/cash-black.png'

import relatorio from '../icons/relatorio.png'
import relatorio_black from '../icons/report.png'

import icon from '../icons/tras.png'

const props = {
  icon, route: '/home'
}

export default Home => {

  return (
    <>
      <Header {...props} />
      <div className='landingPage'>
        <div>
          <p>
            Voce esta com muita divida e não sabe
            mais o que fazer? O Despesa Facil
            irá te dar uma mãozinha.
          </p>

          <Link to={
            window.localStorage.getItem('user') == undefined ||
              window.localStorage.getItem('user') == 0 ? '/login' :
              '/fluxo-caixa'
          } className='button btn'> COMECE AGORA</Link>
        </div>


        <div>
          <img src={window.localStorage.getItem('theme') == 'dark' ?
            cifrao_black : cifrao} alt="icone cifrão" />

          <p>
            O sistema possui um fluxo de caixa
            totalmente dinamico e intuitivo onde é
            possível ter uma visão mais clara do seu ciclo
            financeiro
        </p>
        </div>

        <div>
          <img src={window.localStorage.getItem('theme') == 'dark'
            ? relatorio_black : relatorio} alt="icone relatorio" />
          <p>
            Com o relatório em mãos, é possível
            enxergar de forma mais sistemática e
            tomar melhores decisões
        </p>
        </div>


      </div>
    </>
  )
}