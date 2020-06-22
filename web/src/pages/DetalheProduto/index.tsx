import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import './styles.css';
import Header from '../../components/Header';

interface Product {
    id: number,
    productId: number,
    name: string,
    productName: string,
    productImg: string,
    img_url: string,
    validity: string,
    neighborhood: string,
    city: string,
    uf: string,
    street: string,
    number: string,
    whatsapp: string,
    email: string,
    status: string,
}

const Produtos: React.FC = () => {

    const [product, setProduct] = useState<Product>({} as Product);

    const { id } = useParams();

    function handleSubmit() {
        if(product.status === 'Disponível') {
            axios.put<Product[]>(`http://localhost:3333/products/${id}`, {"status": "Aguardando"});
        } else if (product.status === 'Aguardando') {
            axios.put<Product[]>(`http://localhost:3333/products/${id}`, {"status": "Em trânsito"});
        } else if (product.status === 'Em trânsito') {
            axios.put<Product[]>(`http://localhost:3333/products/${id}`, {"status": "Entregue"});
        }
    }

    let botaoRecolher;
    if(product.status === 'Disponível') {
        botaoRecolher = <button onClick={handleSubmit} type="submit">
            Recolher
        </button>;
    } else if (product.status === 'Aguardando') {
        botaoRecolher = <button onClick={handleSubmit} type="submit">
            Recolhido
        </button>;
    } else if (product.status === 'Em trânsito') {
        botaoRecolher = <button onClick={handleSubmit} type="submit">
            Entregue
        </button>;
    }

    useEffect(() => {
        axios.get<Product[]>(`http://localhost:3333/products/${id}`).then(response => {
            const productDetail = response.data;

            setProduct(productDetail[0]);
        })
    }, [id]);

    return (
        <div>
            <Header />

            <div id="page-detalhe">

                <div className="details">
                    <h1>Produto</h1>
                    <img src={product.productImg} alt="Produto"/>
                    <h2>{ product.productName }</h2>
                    <span className="vencimento">Vencimento: { product.validity }<br/></span>
                    <span className="status">Status: {product.status}<br/></span>
                    <form>
                        {botaoRecolher}
                    </form>
                </div>

                <div className="details">
                    <h1>Ponto de coleta</h1>
                    <img src={product.img_url} alt="Ponto de coleta"/>
                    <h2>{ product.name }</h2>
                    <span className="endereco">{product.street} - {product.number} - {product.neighborhood}<br/></span>
                    <span className="city-uf">{product.city} - {product.uf}<br/></span>
                    <span className="contato">&#9990; {product.whatsapp} - {product.email}<br/></span>
                </div>

            </div>

            
                
       

           
                
           

        </div>
    )

}

export default Produtos;