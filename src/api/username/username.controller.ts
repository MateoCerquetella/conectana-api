import * as express from 'express';
import db from '../../database/db'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UsernameI } from './username.model'

const table = () => db<UsernameI>('username');

export class UsernameController {

  login(req: express.Request, res: express.Response) {
    const usernameTmp: UsernameI = req.body;

    // Validate request
    if (!usernameTmp.username || !usernameTmp.password) {
      return res.status(400).send({
        message: 'Falta contenido en el cuerpo.'
      });
    }

    table()
      .where('username', usernameTmp.username)
      .then((usernameRes: UsernameI[]) => {
        console.log(usernameRes);

        let username = usernameRes[0];
        const resultPassword: Boolean = bcrypt.compareSync(usernameTmp.password, username.password);
        if (resultPassword) {
          let expiresIn = 24 * 60 * 60;
          const accessToken = jwt.sign({ id: username[0].id }, process.env.TOKEN_SECRET || '', { expiresIn: expiresIn });
          username.accessToken = accessToken;
          username.expiresIn = expiresIn;
          // req.user = dataUser.username;
          return res.status(200).send(username);
        } else {
          //La contraseña es incorrecta
          return res.status(409).send({ message: 'La contraseña es incorrecta' });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.received === 0) {
          return res.status(400).send({ message: 'Usuario no encontrado.' });
        }
        return res.status(500).send({
          message: 'Ha ocurrido un error al iniciar sesión.'
        });
      });
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