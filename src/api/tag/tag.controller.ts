import * as express from 'express';
import db from '../../database/db'
import { TagI } from './tag.model'

const table = () => db<TagI>('tag');

export class TagController {

  create(req: express.Request, res: express.Response) {
    const tagTmp: TagI = req.body;

    //Validate request
    if (!tagTmp.name) {
      return res.status(400).send({
        message: 'Falta contenido y/o no puede estar vacio.'
      });
    }

    table()
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
    table()
      .select()
      .then((tag: TagI[]) => {
        return res.status(200).send(tag);
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail });
      });
  }

  findOne(req: express.Request, res: express.Response) {
    const tagTmp: TagI = req.body;
    tagTmp.id = +req.params.id;

    table()
      .where({ id: tagTmp.id })
      .then((tag: TagI[]) => {
        return tag.length > 0 ?
          res.status(200).send(tag) :
          res.status(404).send({ message: 'Tag no encontrado' });
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail });
      });
  }

  update(req: express.Request, res: express.Response) {
    const tagTmp: TagI = req.body;
    tagTmp.id = +req.params.id;

    //Validate request
    if (!tagTmp.name) {
      return res.status(400).send({
        message: 'Falta contenido y/o no puede estar vacio.'
      });
    }

    table()
      .where({ id: tagTmp.id })
      .update({ name: tagTmp.name })
      .then((tag: number) => {
        return tag > 0 ?
          res.status(200).send({ message: 'Modificado con éxito' }) :
          res.status(404).send({ message: 'Tag no encontrado' });
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail });
      });
  }

  delete(req: express.Request, res: express.Response) {
    table()
      .where({ id: +req.params.id })
      .del()
      .then((tag: number) => {
        return tag > 0 ?
          res.status(200).send({ message: 'Borrado con éxito' }) :
          res.status(404).send({ message: 'Tag no encontrado' });
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail });
      });
  }
}