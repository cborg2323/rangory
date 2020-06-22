import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import Header from '../../components/Header';

const SelecaoPapel: React.FC = () => {    

    return (
        <div>
            <Header />

            <div id="page-selecao-papel">
                <div className="papel-escolha">
                    <h1>Cadastrar ponto</h1>
                    <Link to="/cadastro_ponto">
                        <img src="https://images.unsplash.com/photo-1580913428023-02c695666d61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="Empresa"/>
                    </Link>
                    
                </div>
                <div className="papel-escolha">
                    <h1>Cadastrar produto</h1>
                    <Link to="/cadastro_produto">
                        <img src="https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Entregador"/>
                    </Link>
                </div>
            </div>
        </div>
    )

}

export default SelecaoPapel;