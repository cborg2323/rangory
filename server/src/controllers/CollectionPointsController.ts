import {Request, Response} from 'express';
import knex from '../models/connection';


class CollectionPointsController {

    async index(req: Request, res: Response) {

        var collection_points = await knex('collection_points')
            .distinct()
            .select('*');
    
    
        return res.json(collection_points);
    }

    async create(req: Request, res: Response) {
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
    }

}

export default CollectionPointsController;