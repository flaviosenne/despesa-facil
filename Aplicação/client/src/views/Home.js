import React from 'react';
import { Link } from 'react-router-dom'
import '../index.css';

import cifrao from '../icons/cifrao.png'
import Header from '../components/Header'
import relatorio from '../icons/relatorio.png'
import icon from '../icons/home.png'
import icon_user from '../icons/config.png'
const props = {
  icon, route: '/home',
  user: `/usuario/${window.localStorage.getItem('user')}`,
  icon_user,
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
          
          <Link to="/fluxo-caixa" className='button btn'> COMECE AGORA</Link>
        </div>


        <div>
          <Link to='fluxo-caixa'>
            <img src={cifrao} alt="icone cifrão" />
          </Link>
          <p>
            O sistema possui um fluxo de caixa
            totalmente dinamico e intuitivo onde é
            possível ter uma visão mais clara do seu ciclo
            financeiro
        </p>
        </div>

        <div>
        <Link to='relatorio'>

          <img src={relatorio} alt="icone relatorio" />
        </Link>

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