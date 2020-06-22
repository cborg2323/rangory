import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import './styles.css';
import Header from '../../components/Header';

const CadastroPonto: React.FC = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        uf: '',
        cidade: '',
        neighborhood: '',
        rua: '',
        numero: '',
        complemento: '',
    });

    const history = useHistory();

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        
        setFormData( {...formData, [name]: value} );
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name, email, whatsapp, uf, cidade, rua, numero, complemento, neighborhood } = formData;

        const data = {
            name, 
            email, 
            whatsapp, 
            uf, 
            city: cidade,
            neighborhood,
            street: rua,
            number: numero, 
            complement: complemento,
            img_url: '',
        };

        let flagError = 0;
        await axios.post('http://localhost:3333/collection_points', data)
            .catch((error) => {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
            }
            flagError = 1;
        });
    
    
        if(flagError === 0) {
            alert('Ponto de coleta criado!');
                
            history.push('/selecao_cadastro');
        }

    }

    return (
        <div>
            <Header />

            <div id="page-create-point">

                <form onSubmit={handleSubmit}>
                    <h1>Cadastro do <br/> ponto de coleta</h1>
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
                            <label htmlFor="img_url">Imagem (url)</label>
                            <input 
                                type="text"
                                name="img_url"
                                id="img_url"
                                onChange={handleInputChange}
                            />
                    </div>

                    <div className="field">
                            <label htmlFor="name">E-mail</label>
                            <input 
                                type="text"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                            />
                    </div>
                    <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                data-mask="(00) 00000-0000"
                                data-mask-selectonfocus="true"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChange}
                            />
                    </div>
                    <div className="field">
                            <label htmlFor="name">UF</label>
                            <input 
                                type="text"
                                name="uf"
                                id="uf"
                                onChange={handleInputChange}
                            />
                    </div>
                    <div className="field">
                            <label htmlFor="name">Cidade</label>
                            <input 
                                type="text"
                                name="cidade"
                                id="cidade"
                                onChange={handleInputChange}
                            />
                    </div>

                    <div className="field">
                            <label htmlFor="neighborhood">Bairro</label>
                            <input 
                                type="text"
                                name="neighborhood"
                                id="neighborhood"
                                onChange={handleInputChange}
                            />
                    </div>

                    <div className="field">
                            <label htmlFor="name">Rua</label>
                            <input 
                                type="text"
                                name="rua"
                                id="rua"
                                onChange={handleInputChange}
                            />
                    </div>

                    <div className="field">
                            <label htmlFor="name">Número</label>
                            <input 
                                type="text"
                                name="numero"
                                id="numero"
                                onChange={handleInputChange}
                            />
                    </div>

                    <div className="field">
                            <label htmlFor="name">Complemento</label>
                            <input 
                                type="text"
                                name="complemento"
                                id="complemento"
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

export default CadastroPonto;