import React from 'react';
import '../CSS/About.css';
import download from '../icons/download.png'
import Header from '../components/Header'
import icon from '../icons/about.png'
const props = {icon, route: '/home'}

export default About => {
    return (
        <>
        <Header {...props}/>
        <div className = "About">    
            <div>
                <h1 className="titulo">Sobre o Autor</h1>
                <p>
                    Ola! Me chamo João Flávio, tenho 20 anos, sou casado e
                    tenho uma filha. Estudei Administração na Etec franca,
                    tenho diversos certificados de cursos EAD na área de gestão e TI.
                    Ingressei em uma graduação de Análise e Desenvolvimento de Sistemas
                    na Fatec Franca em 2017, desde então sou apaixonado
                    na area de desenvolvimento de software.
                </p>
            </div>

            <div>

                <h1 className="titulo">Sobre o projeto</h1>
                <p>
                    A iniciativa de criar um software capaz de auxiliar no controle financeiro,
                    se deu no momento em que houve a necessidade do armazenamento das despesas
                    em algo que não se deteriora (sistema de computador). Sendo assim,
                    com os dados em mãos, é possível análisar melhor e ter um planejamento
                    mais sistemico, para que os recursos (dinheiro) sejam melhores gerenciados.
                <a className = "link" href = "https://www.github.com/flaviosenne/DespesaFacil/blob/master/Documentacao">
                    <button> Documentação<img src = {download} alt = "icone download"/></button>
                </a>
                </p>


            </div>
            </div>
        </>
    )
}