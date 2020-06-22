import express from 'express';
import { celebrate, Joi } from 'celebrate';

import CollectionPointsController from './controllers/CollectionPointsController';
import ProductsController from './controllers/ProductsController';

const routes = express.Router();

const collectionPointsController = new CollectionPointsController();
const productsController = new ProductsController();

routes.get('/products', productsController.index);
routes.get('/products/:id', productsController.show);

routes.put('/products/:id', productsController.update);

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
}), productsController.create);


routes.get('/collection_points', collectionPointsController.index);

routes.post('/collection_points', celebrate({
    body: Joi.object().keys({
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
}),  collectionPointsController.create);



export default routes;