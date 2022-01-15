import {Request, Response} from 'express';
import knex from '../models/connection';


class ProductsController {

    async index(req: Request, res: Response) {
        const { city, uf, tipo } = req.query;
    
        var products = await knex('products')
            .join('collection_points', 'products.collection_point_id', '=', 'collection_points.id')
            .distinct()
            .select(
                'products.id as productId',
                'products.name as productName',
                'products.img_url as productImg',
                '*');
    
        
        if (typeof city !== 'undefined') {
            products = products.filter(product => product.city === city);
        }
        if (typeof uf !== 'undefined') {
            products = products.filter(product => product.uf === uf);
        }
        if (typeof tipo !== 'undefined') {
            products = products.filter(product => product.tipo === tipo);
        }
    
        return res.json(products);
    }

    async show (req: Request, res: Response) {
        const { id } = req.params;

        const product = await knex('products')
            .join('collection_points', 'products.collection_point_id', '=', 'collection_points.id')
            .where('products.id', '=', id)
            .distinct()
            .select(
                'products.id as productId',
                'products.name as productName',
                'products.img_url as productImg',
                '*');

        return res.json(product);
    }

    async create (req: Request, res: Response) {
    
        const {
            name,
            img_url,
            price,
            validity,
            collection_point_id,
        } = req.body;
    
        // formatando a data para dd-mm-yyyy
        const validityDate = new Date(validity);
        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'numeric', day: 'numeric' });
        const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(validityDate);
        const formattedValidityDate = `${day}-${month}-${year}`;
    
        const product = {
            name,
            img_url,
            price,
            validity: formattedValidityDate,
            collection_point_id,
        }
    
        const trx = await knex.transaction();
        const insertedIds = await trx('products').insert(product);
        await trx.commit();
    
        return res.json({
            ...product,
        });
    }

    async update (req: Request, res: Response) {
        const { status } = req.body;
        const { id } = req.params;

        const trx = await knex.transaction();
        await trx('products')
            .where('id', '=', id)    
            .update('status', status);
        
        await trx.commit();

        return res.json({
            "operation": "update",
            "status": status,
            "response": "ok"
        });
    }

    

}

export default ProductsController;