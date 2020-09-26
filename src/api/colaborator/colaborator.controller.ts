import * as express from 'express';
import db from '../../database/db'
import { ColaboratorI } from './colaborator.model'

const colaboratorTable = () => db<ColaboratorI>('colaborator');

export class ColaboratorController {

  create(req: express.Request, res: express.Response) {


    return res.status(200).send();
  }

  findAll(req: express.Request, res: express.Response) {
    colaboratorTable()
      .select()
      .then((colaborator: ColaboratorI[]) => {
        return res.status(200).send(colaborator);
      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' });
      });
  }

  findOne(req: express.Request, res: express.Response) {
    const id = req.params.id;
    colaboratorTable()
      .where('id', id)
      .then((colaborator: ColaboratorI[]) => {
        return colaborator.length > 0 ?
          res.status(200).send(colaborator) :
          res.status(404).send({ message: 'Colaborator not found' });

      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' });
      });
  }

  update(req: express.Request, res: express.Response) {
    const id = req.params.id;



    return res.status(200).send();
  }

  delete(req: express.Request, res: express.Response) {
    const id = req.params.id;



    return res.status(200).send();
  }
}