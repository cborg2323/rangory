import React, { useEffect, useState, ChangeEvent, FormEvent, MouseEventHandler } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import InputMask from 'react-input-mask';

import './styles.css';
import Header from '../../components/Header';
import { forEachLeadingCommentRange } from 'typescript';
import internal from 'stream';



interface ProdutoResponse {
    productId: number;
    productName: string;
}

interface CepResponse {
    uf: string;
    localidade: string;
    logradouro: string;
    numero: number;
    bairro: string;
}

const Cadastro: React.FC = () => {
    
    const [produtos, setProdutos] = useState<ProdutoResponse[]>([]);
    const [uf, setUF] = useState<string>();
    const [cidade, setCidade] = useState<string>();
    const [logradouro, setLogradouro] = useState<string>();
    const [bairro, setBairro] = useState<string>();

    const [formData, setFormData] = useState({
        name: '',
        validity: '',
        cep: '',
        numero: '',
        cidade: '',
        bairro: '',
        logradouro: '',
        complemento: '',
        telefone: '',
        email: '',
    });

    const [produtoSelecionado, setProdutoSelecionado] = useState('0');

    const history = useHistory();

    useEffect(() => {
        axios.get<ProdutoResponse[]>('http://localhost:3333/products_list').then(response => {
            const produtosIniciais = response.data;

            
            console.log(produtosIniciais);
            setProdutos(produtosIniciais);
        });
    }, []);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        
        setFormData( {...formData, [name]: value} );
    }

    function handleInputChangeCep(event: ChangeEvent<HTMLInputElement>) {

    }

    function handleProdutoSelecionado(event: ChangeEvent<HTMLSelectElement>) {
        const produto = event.target.value;

        setProdutoSelecionado(produto);
    }

    async function handleConsultaCep(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();

        const cep = formData.cep;

        axios.get<CepResponse>('https://viacep.com.br/ws/' + cep + '/json/').then(response => {
            const dadosCep = response.data;

            setCidade(dadosCep.localidade);
            setUF(dadosCep.uf);
            setLogradouro(dadosCep.logradouro)
            setBairro(dadosCep.bairro)
            console.log(dadosCep.uf);
        });
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name, validity, cep, numero, cidade, bairro, logradouro, complemento, telefone, email } = formData;

        const data = {
            name,
            validity,
            cep,
            numero,
            cidade,
            bairro,
            logradouro,
            complemento,
            telefone,
            email,
        };

        let flagError = 0; 

        await axios.post('http://localhost:3333/products', data)
            .catch((error) => {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                }
                flagError = 1;
            });
        
        
        if(flagError === 0) {
            alert('Produto cadastrado!');
                
            history.push('/produtos');
        }
        

    }

    return (
        <div>
            <Header />

            <div id="page-create-point">

                <form onSubmit={handleSubmit}>

                    <h1>Cadastro de produto(s)</h1>

                    <h2>Informações do produto</h2>

                    <div className="field">
                            <label htmlFor="name">Descrição do produto</label>
                            <select  
                                name="name"
                                id="name"
                                value={produtoSelecionado}
                                onChange={handleProdutoSelecionado}
                            >
                                <option value="0">Selecione um produto</option>
                                {produtos.map(produto => (
                                    <option key={produto.productId} value={produto.productId}>{produto.productName}</option>
                                ))}
                            </select>
                    </div>

                    <div className="field">
                            <label htmlFor="validity">Validade</label>
                            <input 
                                type="date"
                                name="validity"
                                id="validity"
                                onChange={handleInputChange}
                            />
                    </div>


                    <h2>Ponto de coleta</h2>

                    <div className="field">
                            <label htmlFor="CEP">CEP</label>
                            <InputMask 
                                type="text"
                                name="cep"
                                id="cep"
                                mask="99999-999"
                                onChange={handleInputChange}
                            />
                    </div>

                    <div id="buttons">

                        <button id="limpar" type="button" onClick={handleConsultaCep}>
                            Limpar
                        </button>

                        <button type="button" onClick={handleConsultaCep}>
                            Consultar
                        </button>

                    </div>

                    

                    <div className="field">
                            <label htmlFor="uf">UF</label>
                            <input 
                                type="text"
                                name="uf"
                                id="uf"
                                value={uf}
                                onChange={handleInputChange}
                            />
                    </div>
                    <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <input 
                                type="text"
                                name="city"
                                id="city"
                                value={cidade}
                                onChange={handleInputChange}
                            />
                    </div>

                    <div className="field">
                            <label htmlFor="bairro">Bairro</label>
                            <input 
                                type="text"
                                name="bairro"
                                id="bairro"
                                value={bairro}
                                onChange={handleInputChange}
                            />
                    </div>

                    <div className="field">
                            <label htmlFor="logradouro">Logradouro</label>
                            <input 
                                type="text"
                                name="logradouro"
                                id="logradouro"
                                value={logradouro}
                                onChange={handleInputChange}
                            />
                    </div>

                    <div className="field">
                            <label htmlFor="numero">Número</label>
                            <input 
                                type="number"
                                name="numero"
                                id="numero"
                                onChange={handleInputChange}
                            />
                    </div>

                    <div className="field">
                            <label htmlFor="complemento">Complemento</label>
                            <input 
                                type="text"
                                name="complemento"
                                id="complemento"
                                onChange={handleInputChange}
                            />
                    </div>

                    <h2>Contato</h2>
                    <div className="field">
                            <label htmlFor="telefone">Telefone</label>
                            <input 
                                type="text"
                                name="telefone"
                                id="telefone"
                                onChange={handleInputChange}
                            />
                    </div>

                    <div className="field">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="text"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                            />
                    </div>


                    <button type="submit">
                        Cadastrar
                    </button>
                    
                </form>

            </div>
        </div>
    )

}

export default Cadastro;