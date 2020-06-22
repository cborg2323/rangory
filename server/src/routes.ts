import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import {Request, Response} from 'express';
import knex from './models/connection';
const BodyParser = require('body-parser');

const routes = express.Router();

routes.use(BodyParser.json());

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

routes.post('/collection_points', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        img_url: Joi.string().allow(''),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        street: Joi.string().required(),
        number: Joi.string().required(),
        complement: Joi.string().allow(''),
        neighborhood: Joi.string().required(),
    })
}, {
    abortEarly: false
}),  async function(req: Request, res: Response) {
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
    } = req.body;

    const latitude = 0, longitude = 0;

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

routes.post('/products', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        price: Joi.number().required(),
        validity: Joi.date().required(),
        collection_point_id: Joi.number().required().min(1),
        img_url: Joi.string().allow(''),
    })
}, {
    abortEarly: false
}),   async (req: Request, res: Response) => {
    
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
});

export default routes;