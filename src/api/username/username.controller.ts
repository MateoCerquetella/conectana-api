import * as express from 'express';
import db from '../../database/db'
import { UsernameI } from './username.model'

const table = () => db<UsernameI>('username');

export class UsernameController {

  login(req: express.Request, res: express.Response) {
    //TODO
    return res.status(200).send();
  }

  create(req: express.Request, res: express.Response) {
    const usernameTmp: UsernameI = req.body;

    //Validate request
    if (!usernameTmp.username || !usernameTmp.password || !usernameTmp.email || !usernameTmp.id_colaborator || !usernameTmp.id_organization) {
      return res.status(400).send({
        message: 'Falta contenido y/o no puede estar vacio.'
      });
    }

    table()
      .insert(usernameTmp)
      .then(() => {
        return res.status(200).send({ message: 'Creado con éxito' });
      })
      .catch((error) => {
        if (error.code === '23505') {
          return res.status(409).send({ message: 'Ya existe el username' });
        }
        return res.status(500).json({ message: 'Server error', messageError: error.detail });
      });
  }

  findAll(req: express.Request, res: express.Response) {
    table()
      .select()
      .then((user: UsernameI[]) => {
        return res.status(200).send(user);
      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' });
      });
  }

  findOne(req: express.Request, res: express.Response) {
    const id = req.params.id;
    table()
      .where('id', id)
      .then((user: UsernameI[]) => {
        return user.length > 0 ?
          res.status(200).send(user) :
          res.status(404).send({ message: 'Username not found' });

      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' });
      });
  }

  update(req: express.Request, res: express.Response) {
    const usernameTmp: UsernameI = req.body;
    usernameTmp.id = +req.params.id;

    table()
      .where({ id: usernameTmp.id })
      .update(usernameTmp)
      .then((username: number) => {
        return username > 0 ?
          res.status(200).send({ message: 'Modificado con éxito' }) :
          res.status(404).send({ message: 'Username no encontrado' });
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail });
      });
  }

  delete(req: express.Request, res: express.Response) {
    table()
      .where({ id: +req.params.id })
      .del()
      .then((username: number) => {
        return username > 0 ?
          res.status(200).send({ message: 'Borrado con éxito' }) :
          res.status(404).send({ message: 'Username no encontrado' });
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail });
      });
  }
}