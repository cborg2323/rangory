import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import CadastroPonto from './pages/CadastroPonto';
import CadastroProduto from './pages/CadastroProduto';
import SelecaoPapel from './pages/SelecaoPapel';
import SelecaoCadastro from './pages/SelecaoCadastro';
import Produtos from './pages/Produtos';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={SelecaoPapel} path="/" exact />
            <Route component={CadastroPonto} path="/cadastro_ponto" />
            <Route component={CadastroProduto} path="/cadastro_produto" />
            <Route component={SelecaoPapel} path="/selecao_papel" />
            <Route component={SelecaoCadastro} path="/selecao_cadastro" />
            <Route component={Produtos} path="/produtos" />
        </BrowserRouter>
    )
}

export default Routes;