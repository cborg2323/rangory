import React, { useEffect, useState, ChangeEvent, FormEvent, MouseEventHandler } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import InputMask from 'react-input-mask';

import './styles.css';
import Header from '../../components/Header';
import { forEachLeadingCommentRange } from 'typescript';

interface PontoResponse {
    id: number;
    name: string;
}

interface CepResponse {
    uf: string;
    localidade: string;
}

const Cadastro: React.FC = () => {
    
    const [pontos, setPontos] = useState<PontoResponse[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        validity: '',
        cep: '',
    });

    const [pontoSelecionado, setpontoSelecionado] = useState('0');

    const history = useHistory();

    useEffect(() => {
        axios.get<PontoResponse[]>('http://localhost:3333/collection_points').then(response => {
            const pontosIniciais = response.data;

            setPontos(pontosIniciais);
        });
    }, []);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        
        setFormData( {...formData, [name]: value} );
    }

    function handlePontoSelecionado(event: ChangeEvent<HTMLSelectElement>) {
        const ponto = event.target.value;

        setpontoSelecionado(ponto);
    }

    async function handleConsultaCep(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();

        const cep = formData;

        axios.get<CepResponse>('https://viacep.com.br/ws/' + cep + '/json/').then(response => {
            const dadosCep = response.data;


            console.log(dadosCep.uf);
        });
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name, validity, cep } = formData;

        axios.get<CepResponse>('https://viacep.com.br/ws/' + cep + '/json/').then(response => {
            const dadosCep = response.data;

            console.log(dadosCep.uf);
            console.log(dadosCep.localidade);
            alert(dadosCep.localidade + ' - ' + dadosCep.uf);
        });

        /* const ponto = pontoSelecionado;


        const data = {
            name, 
            price,
            validity,
            collection_point_id: ponto,
            img_url
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
        } */
        

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
                            <input 
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Ex: Macarrão espaguete 500gr"
                                onChange={handleInputChange}
                            />
                    </div>
                   

                    {/* <div className="field">
                            <label htmlFor="price">Quantidade</label>
                            <input 
                                type="number"
                                step="1"
                                name="price"
                                id="price"
                                onChange={handleInputChange}
                            />
                    </div> */}

                    <div className="field">
                            <label htmlFor="validity">Validade</label>
                            <input 
                                type="date"
                                name="validity"
                                id="validity"
                                onChange={handleInputChange}
                            />
                    </div>

                    {/* <div className="field">
                            <label htmlFor="ponto">Ponto de coleta</label>
                            <select  
                                name="ponto"
                                id="ponto"
                                value={pontoSelecionado}
                                onChange={handlePontoSelecionado}
                            >
                                <option value="0">Selecione um ponto</option>
                                {pontos.map(ponto => (
                                    <option key={ponto.id} value={ponto.id}>{ponto.name}</option>
                                ))}
                            </select>
                    </div> */}

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

                    <button type="button" onClick={handleConsultaCep}>
                        Consultar
                    </button>

                    <div className="field">
                            <label htmlFor="uf">UF</label>
                            <input 
                                type="text"
                                name="uf"
                                id="uf"
                                onChange={handleInputChange}
                            />
                    </div>
                    <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <input 
                                type="text"
                                name="city"
                                id="city"
                                onChange={handleInputChange}
                            />
                    </div>

                    <button type="submit">
                        Consultar
                    </button>
                    
                </form>

            </div>
        </div>
    )

}

export default Cadastro;