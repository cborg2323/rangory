import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import CadastroPonto from './pages/CadastroPonto';
import CadastroProduto from './pages/CadastroProduto';
import SelecaoPapel from './pages/SelecaoPapel';
import SelecaoCadastro from './pages/SelecaoCadastro';
import Produtos from './pages/Produtos';
import DetalheProduto from './pages/DetalheProduto';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={SelecaoPapel} path="/" exact />
            <Route component={CadastroPonto} path="/cadastro_ponto" />
            <Route component={CadastroProduto} path="/cadastro_produto" />
            <Route component={SelecaoPapel} path="/selecao_papel" />
            <Route component={SelecaoCadastro} path="/selecao_cadastro" />
            <Route component={Produtos} path="/produtos" exact />
            <Route component={DetalheProduto} path="/produtos/:id" />
        </BrowserRouter>
    )
}

export default Routes;