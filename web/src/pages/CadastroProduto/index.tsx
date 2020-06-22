import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import './styles.css';
import Header from '../../components/Header';

interface PontoResponse {
    id: number;
    name: string;
}

const Cadastro: React.FC = () => {
    
    const [pontos, setPontos] = useState<PontoResponse[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        img_url: '',
        preco: '',
        validade: '',
        ponto: '',
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

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name, preco, validade, img_url } = formData;

        const ponto = pontoSelecionado;


        const data = {
            name, 
            price: preco,
            validity: validade,
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
        }
        

    }

    return (
        <div>
            <Header />

            <div id="page-create-point">

                <form onSubmit={handleSubmit}>
                    <h1>Cadastro do produto</h1>
                    <div className="field">
                            <label htmlFor="name">Nome</label>
                            <input 
                                type="text"
                                name="name"
                                id="name"
                                onChange={handleInputChange}
                            />
                    </div>

                    <div className="field">
                            <label htmlFor="name">Imagem (url)</label>
                            <input 
                                type="text"
                                name="img_url"
                                id="img_url"
                                onChange={handleInputChange}
                            />
                    </div>
                   

                    <div className="field">
                            <label htmlFor="name">Preço (R$)</label>
                            <input 
                                type="number"
                                step="0.1"
                                name="preco"
                                id="preco"
                                onChange={handleInputChange}
                            />
                    </div>

                    <div className="field">
                            <label htmlFor="name">Validade</label>
                            <input 
                                type="date"
                                name="validade"
                                id="validade"
                                onChange={handleInputChange}
                            />
                    </div>

                    <div className="field">
                            <label htmlFor="name">Ponto de coleta</label>
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