import knex from '../database/connection';
import { Request, Response } from 'express';
class ItemsController {
  async index(req: Request, res: Response) {
    try {
      //do the inserte/select/delete/update
    } catch (error) {
      return res.status(400).send({ error: error });
    }
  }
}

export default ItemsController;
