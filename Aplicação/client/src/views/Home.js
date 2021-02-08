import React from 'react';
import { Link } from 'react-router-dom'
import '../index.css';

import Header from '../components/Header'

import cifrao from '../icons/cifrao.png'
import cifrao_black from '../icons/cash-black.png'

import relatorio from '../icons/relatorio.png'
import relatorio_black from '../icons/report.png'

import grafico from '../icons/grafico.webp'
import icon from '../icons/tras.png'
import icon_user from '../icons/config.png'
const user = `/usuario/${window.localStorage.getItem('id')}`
const userLogged = window.localStorage.getItem('name')
const props = {
  icon, route: user == ' ' || !user ? '/': '/home',
  user,
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
          
          <Link to={userLogged !== ' ' && userLogged? '/fluxo-caixa': 'login'} className='button btn'> COMECE AGORA</Link>
        </div>


        <div>
          <Link to='fluxo-caixa'>
          <img src={window.localStorage.getItem('theme') == 'dark'?
            cifrao_black : cifrao} alt="icone cifrão" />
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

          <img src={window.localStorage.getItem('theme') == 'dark'
          ?relatorio_black:relatorio} alt="icone relatorio" />
        </Link>

          <p>
            Com o relatório em mãos, é possível
            enxergar de forma mais sistemática e
            tomar melhores decisões
        </p>
        </div>
        <div>
          <Link to='grafico'>
          <img src={grafico} alt="icone relatorio" />
            </Link>
          <p>
            Com o gráficos a sua disposição, a compreensão
            fica mais legível no entendimento dos lançamentos,
            em quais catgorias teve mais ou menos gastos.
        </p>
        </div>

      </div>
    </>
  )
}