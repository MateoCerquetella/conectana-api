import * as express from 'express';
import db from '../../database/db'
import { ICategory } from './category.model'

const table = () => db<ICategory>('category');

export class CategoryController {

  create(req: express.Request, res: express.Response) {
    const categoryTmp: ICategory = req.body;

    //Validate request
    if (!categoryTmp.name) {
      return res.status(400).send({
        message: 'Falta contenido y/o no puede estar vacio.'
      });
    }

    table()
      .insert(categoryTmp)
      .then(() => {
        return res.status(200).send({ message: 'Creado con éxito' });
      })
      .catch((error) => {
        if (error.code === '23505') {
          return res.status(409).send({ message: 'Ya existe la categoria' });
        }
        return res.status(500).json({ message: 'Server error', messageError: error.detail });
      });
  }

  findAll(req: express.Request, res: express.Response) {
    table()
      .select()
      .then((category: ICategory[]) => {
        return res.status(200).send(category);
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail });
      });
  }

  findOne(req: express.Request, res: express.Response) {
    const categoryTmp: ICategory = req.body;
    categoryTmp.id = +req.params.id;

    table()
      .where({ id: categoryTmp.id })
      .then((category: ICategory[]) => {
        return category.length > 0 ?
          res.status(200).send(category) :
          res.status(404).send({ message: 'Categoria no encontrado' });
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail });
      });
  }

  update(req: express.Request, res: express.Response) {
    const categoryTmp: ICategory = req.body;
    categoryTmp.id = +req.params.id;

    //Validate request
    if (!categoryTmp.name) {
      return res.status(400).send({
        message: 'Falta contenido y/o no puede estar vacio.'
      });
    }

    table()
      .where({ id: categoryTmp.id })
      .update({ name: categoryTmp.name })
      .then((category: number) => {
        return category > 0 ?
          res.status(200).send({ message: 'Modificado con éxito' }) :
          res.status(404).send({ message: 'Categoria no encontrado' });
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail });
      });
  }

  delete(req: express.Request, res: express.Response) {
    table()
      .where({ id: +req.params.id })
      .del()
      .then((category: number) => {
        return category > 0 ?
          res.status(200).send({ message: 'Borrado con éxito' }) :
          res.status(404).send({ message: 'Categoria no encontrado' });
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail });
      });
  }
}