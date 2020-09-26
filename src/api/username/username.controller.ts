import * as express from 'express';
import db from '../../database/db'
import { UsernameI } from './username.model'

const table = () => db<UsernameI>('username');

export class UsernameController {

  login(req: express.Request, res: express.Response) {


    return res.status(200).send();
  }

  create(req: express.Request, res: express.Response) {


    return res.status(200).send();
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
    const id = req.params.id;



    return res.status(200).send();
  }

  delete(req: express.Request, res: express.Response) {
    const id = req.params.id;



    return res.status(200).send();
  }
}