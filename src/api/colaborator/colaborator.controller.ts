import * as express from 'express';
import db from '../../database/db'
import { ColaboratorI } from './colaborator.model'

const table = () => db<ColaboratorI>('colaborator');

export class ColaboratorController {

  create(req: express.Request, res: express.Response) {
    const colaboratorTmp: ColaboratorI = req.body;

    //Validate request
    if (!colaboratorTmp.first_name || !colaboratorTmp.last_name || !colaboratorTmp.date_birth || !colaboratorTmp.tag_id) {
      return res.status(400).send({
        message: 'Falta contenido y/o no puede estar vacio.'
      });
    }

    table()
      .insert(colaboratorTmp)
      .then(() => {
        return res.status(200).send({ message: 'Creado con éxito' });
      })
      .catch((error) => {
        if (error.code === '23505') {
          return res.status(409).send({ message: 'Ya existe el colaborador' });
        }
        return res.status(500).json({ message: 'Server error', messageError: error.detail });
      });
  }

  findAll(req: express.Request, res: express.Response) {
    table()
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
    table()
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
    const colaboratorTmp: ColaboratorI = req.body;
    colaboratorTmp.id = +req.params.id;

    //Validate request
    if (!colaboratorTmp.first_name || !colaboratorTmp.last_name || !colaboratorTmp.date_birth || !colaboratorTmp.tag_id) {
      return res.status(400).send({
        message: 'Falta contenido y/o no puede estar vacio.'
      });
    }

    table()
      .where({ id: colaboratorTmp.id })
      .update(colaboratorTmp)
      .then((colaborator) => {
        return colaborator > 0 ?
          res.status(200).send({ message: 'Modificado con éxito' }) :
          res.status(404).send({ message: 'Colaborador no encontrado' });
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail });
      });
  }

  delete(req: express.Request, res: express.Response) {
    table()
      .where({ id: +req.params.id })
      .del()
      .then((tag) => {
        return tag > 0 ?
          res.status(200).send({ message: 'Borrado con éxito' }) :
          res.status(404).send({ message: 'Colaborador no encontrado' });
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail });
      });
  }
}