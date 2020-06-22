import React, { useEffect, useState} from 'react';
import axios from 'axios';

import './styles.css';
import Header from '../../components/Header';

interface Product {
    id: number,
    name: string,
    validity: string,
    neighborhood: string,
    city: string,
    uf: string,
}

const Produtos: React.FC = () => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get<Product[]>('http://localhost:3333/products').then(response => {
            const productsList = response.data;

            setProducts(productsList);
        })
    }, []);

    return (
        <div>
            <Header />

            <div id="page-produtos">

                { products.map(product => (
                    <div key={product.id} className="product">
                        <img src="https://images.unsplash.com/photo-1587132137056-bfbf0166836e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80" alt="Produto"/>
                        <h1>{ product.name }</h1>
                        <span className="vencimento">Vencimento: { product.validity }<br/></span>
                        <span className="uf-cidade">{ product.neighborhood } - { product.city } - { product.uf }<br/></span>
                    </div>
                )) }

                <div className="product">
                    <img src="https://images.unsplash.com/photo-1587132137056-bfbf0166836e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80" alt="Produto"/>
                    <h1>Banana</h1>
                    <span className="vencimento">Vencimento: 15/10/2020<br/></span>
                    <span className="uf-cidade">Umuarama - Uberlândia - MG<br/></span>
                </div>

                <div className="product">
                    <img src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80" alt="Produto"/>
                    <h1>Pão integral</h1>
                    <span className="vencimento">Vencimento: 15/10/2020<br/></span>
                    <span className="uf-cidade">Aparecida - São Paulo - SP<br/></span>
                </div>

                <div className="product">
                    <img src="https://images.unsplash.com/photo-1568347355280-d33fdf77d42a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Produto"/>
                    <h1>Arroz 5kg</h1>
                    <span className="vencimento">Vencimento: 15/10/2020<br/></span>
                    <span className="uf-cidade">Umuarama - Uberlândia - MG<br/></span>
                </div>

                <div className="product">
                    <img src="https://images.unsplash.com/photo-1530610476181-d83430b64dcd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80" alt="Produto"/>
                    <h1>Croissant</h1>
                    <span className="vencimento">Vencimento: 15/10/2020<br/></span>
                    <span className="local">Local de entrega: </span>
                </div>

                <div className="product">
                    <img src="https://images.unsplash.com/photo-1534119139482-b530a7f9a98b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Produto"/>
                    <h1>Balas sortidas</h1>
                    <span className="vencimento">Vencimento: 15/10/2020<br/></span>
                    <span className="local">Local de entrega: </span>
                </div>

                <div className="product">
                    <img src="https://images.unsplash.com/photo-1525445842399-d8a6bec24be2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80" alt="Produto"/>
                    <h1>Cafe Pelé 1kg</h1>
                    <span className="vencimento">Vencimento: 15/10/2020<br/></span>
                    <span className="local">Local de entrega: </span>
                </div>

                <div className="product">
                    <img src="https://images.unsplash.com/photo-1587132137056-bfbf0166836e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80" alt="Produto"/>
                    <h1>Banana</h1>
                    <span className="vencimento">Vencimento: 15/10/2020<br/></span>
                    <span className="local">Local de entrega: </span>
                </div>

                <div className="product">
                    <img src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80" alt="Produto"/>
                    <h1>Pão integral</h1>
                    <span className="vencimento">Vencimento: 15/10/2020<br/></span>
                    <span className="local">Local de entrega: </span>
                </div>

                <div className="product">
                    <img src="https://images.unsplash.com/photo-1568347355280-d33fdf77d42a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Produto"/>
                    <h1>Arroz 5kg</h1>
                    <span className="vencimento">Vencimento: 15/10/2020<br/></span>
                    <span className="local">Local de entrega: </span>
                </div>

            </div>

            
                
       

           
                
           

        </div>
    )

}

export default Produtos;