import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './styles.css';
import Header from '../../components/Header';

interface Product {
    id: number,
    productId: number,
    name: string,
    productName: string,
    productImg: string,
    validity: string,
    neighborhood: string,
    city: string,
    uf: string,
    status: string,
}

const Produtos: React.FC = () => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get<Product[]>('http://localhost:3333/products').then(response => {
            const productsList = response.data;
            const filteredProducts = productsList.filter(product => product.status !== 'Entregue')

            setProducts(filteredProducts);
        })
    }, []);

    return (
        <div>
            <Header />

            <div id="page-produtos">

                { products.map(product => (
                    <Link 
                        key={product.productId}
                        className="product"
                        to={`/produtos/${product.productId}`}
                    >
                        <div>
                            <img src={product.productImg} alt="Produto"/>
                            <h1>{ product.productName }</h1>
                            <span className="vencimento">Vencimento: { product.validity }<br/></span>
                            <span className="nome-local"> { product.name }<br/></span>
                            <span className="uf-cidade">{ product.neighborhood } - { product.city } - { product.uf }<br/></span>
                        </div>
                    </Link>
                )) }


            </div>

            
                
       

           
                
           

        </div>
    )

}

export default Produtos;