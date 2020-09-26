import * as express from 'express';
import db from '../../database/db'
import { TagI } from './tag.model'

const colaboratorTable = () => db<TagI>('tag');

export class TagController {

  login(req: express.Request, res: express.Response) {


    return res.status(200).send();
  }

  create(req: express.Request, res: express.Response) {


    return res.status(200).send();
  }

  findAll(req: express.Request, res: express.Response) {
    colaboratorTable()
      .select()
      .then((tag: TagI[]) => {
        return res.status(200).send(tag);
      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' });
      });
  }

  findOne(req: express.Request, res: express.Response) {
    const id = req.params.id;
    colaboratorTable()
      .where('id', id)
      .then((tag: TagI[]) => {
        return tag.length > 0 ?
          res.status(200).send(tag) :
          res.status(404).send({ message: 'Tag not found' });

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