import express from 'express';
import {Request, Response} from 'express';
import knex from './models/connection';

const routes = express.Router();

routes.get('/products', async function(req: Request, res: Response) {
    const { city, uf, tipo } = req.query;

    var products = await knex('products')
        .join('collection_points', 'products.collection_point_id', '=', 'collection_points.id')
        .distinct()
        .select('*');

    
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
});

routes.get('/collection_points', async function(req: Request, res: Response) {

    var collection_points = await knex('collection_points')
        .distinct()
        .select('*');


    return res.json(collection_points);
});

routes.post('/collection_points', async function(req: Request, res: Response) {
    const {
        name,
        img_url,
        email,
        whatsapp,
        city,
        uf,
        street,
        number,
        complement,
        latitude,
        longitude,
    } = req.body;

    const collection_point = {
        name,
        img_url,
        email,
        whatsapp,
        city,
        uf,
        street,
        number,
        complement,
        latitude,
        longitude,
    };

    const trx = await knex.transaction();
    const insertedIds = await trx('collection_points').insert(collection_point);
    await trx.commit();

    return res.json({
        ...collection_point,
    });
});

routes.post('/products', async function(req: Request, res: Response) {
    const {
        name,
        img_url,
        price,
        validity,
        collection_point_id,
    } = req.body;

    const product = {
        name,
        img_url,
        price,
        validity,
        collection_point_id,
    }

    const trx = await knex.transaction();
    const insertedIds = await trx('products').insert(product);
    await trx.commit();

    return res.json({
        ...product,
    });
});

export default routes;