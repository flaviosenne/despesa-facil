import React from 'react';
import '../index.css';
import cifrao from '../icons/cifrao.png'
import relatorio from '../icons/relatorio.png'
import grafico from '../icons/graficos.png'

export default App => {
  return (
    <div className='landingPage'>
      <div>
        <p>
          Voce esta com muita divida e não sabe
          mais o que fazer? O Despesa Facil
          irá te dar uma mãozinha.
      </p>
        <button type='submit'> COMECE AGORA</button>
      </div>


      <div>
        <img src={cifrao} />
        <p>
          O sistema possui um fluxo de caixa
          totalmente dinamico e intuitivo onde é
          possível ter uma visão mais clara do seu ciclo
          financeiro
        </p>
      </div>

      <div>
        <img src={relatorio} />

        <p>
          Com o relatório em mãos, é possível
          enxergr de formr mais sistemática e
          tomar melhores decisões
        </p>
      </div>


      <div>

        <img src={grafico} />

        <p>
          É possível fazer projeções e analizar
          as probabiliddes de investimentos
        </p>
      </div>

    </div>

  )
}

