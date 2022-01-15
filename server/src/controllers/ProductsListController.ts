import {Request, Response} from 'express';
import knex from '../models/connection';

class ProductsListController {

    async index(req: Request, res: Response) {

        var products_list = await knex('products_list')
            .select(
                'products_list.id as productId',
                'products_list.name as productName',
                'products_list.img_url as productImg',
                );


        return res.json(products_list);
    }

}

export default ProductsListController;