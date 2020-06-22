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
                    <h1>Sou empresa</h1>
                    <Link to="/selecao_cadastro">
                        <img src="https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80" alt="Empresa"/>
                    </Link>
                    
                </div>
                <div className="papel-escolha">
                    <h1>Sou entregador</h1>
                    <Link to="/produtos">
                        <img src="https://images.unsplash.com/photo-1551655510-555dc3be8633?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="Entregador"/>
                    </Link>
                </div>
            </div>
        </div>
    )

}

export default SelecaoPapel;