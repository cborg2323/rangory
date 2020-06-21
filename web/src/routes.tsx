import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import CadastroPonto from './pages/CadastroPonto';
import CadastroProduto from './pages/CadastroProduto';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Header} path="/" exact />
            <Route component={CadastroPonto} path="/cadastro_ponto" />
            <Route component={CadastroProduto} path="/cadastro_produto" />
        </BrowserRouter>
    )
}

export default Routes;