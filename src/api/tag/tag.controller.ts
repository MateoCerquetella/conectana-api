import * as express from 'express';
import db from '../../database/db'
import { TagI } from './tag.model'

const tagTable = () => db<TagI>('tag');

export class TagController {

  create(req: express.Request, res: express.Response) {
    const tagTmp: TagI = req.body;

    //Validation
    if (!tagTmp.name) {
      return res.status(400).send({
        message: 'El contenido no puede estar vacio.'
      });
    }

    tagTable()
      .insert(tagTmp)
      .then(() => {
        return res.status(200).send({ message: 'Creado con éxito' });
      })
      .catch((error) => {
        if (error.code === '23505') {
          return res.status(409).send({ message: 'Ya existe el tag' });
        }
        return res.status(500).json({ message: 'Server error', messageError: error.detail });
      });
  }

  findAll(req: express.Request, res: express.Response) {
    tagTable()
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
    tagTable()
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