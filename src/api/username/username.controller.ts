import db from '../../database/db'
import argon2 from 'argon2'
import { IUsername } from './username.model'
import { RouteCallback } from '../../@types'

const table = () => db<IUsername>('username')

export class UsernameController {

  login: RouteCallback = function (req, res) {
    const usernameTmp: IUsername = req.body

    // Validate request
    if (!usernameTmp.username || !usernameTmp.password) {
      return res.status(400).send({
        message: 'Falta contenido en el cuerpo.'
      })
    }

    table()
      .where('username', usernameTmp.username)
      .then((userRes) => {
        let user = userRes[0]
        argon2
          .verify(user.password, usernameTmp.password)
          .then(isAuth => {
            if (isAuth) {
              req.session.userId = user.id
              res.status(200).send(user)
            } else {
              return res.status(409).send({ message: 'La contraseña es incorrecta.' })
            }
          })
          .catch(error => {
            return res.status(500).send({
              message: 'Ha ocurrido un error al iniciar sesión.'
            })
          })
      })
      .catch((error) => {
        if (error.received === 0) return res.status(400).send({ message: 'Usuario no encontrado.' })
        return res.status(500).send({
          message: 'Ha ocurrido un error al iniciar sesión.'
        })
      })
  }

  create: RouteCallback = async function (req, res) {
    const usernameTmp: IUsername = req.body

    // Validate request
    if (!usernameTmp.username || !usernameTmp.password || !usernameTmp.email || !usernameTmp.id_colaborator) {
      return res.status(400).send({
        message: 'Falta contenido y/o no puede estar vacio.'
      })
    }

    // Hashing password
    usernameTmp.password = await argon2.hash(usernameTmp.password)

    table()
      .insert(usernameTmp)
      .then(() => {
        return res.status(200).send({ message: 'Creado con éxito' })
      })
      .catch((error) => {
        if (error.code === '23505') {
          return res.status(409).send({ message: 'Ya existe el username' })
        }
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }

  findAll: RouteCallback = function (req, res) {
    table()
      .select()
      .then((user: IUsername[]) => {
        return res.status(200).send(user)
      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' })
      })
  }

  findOne: RouteCallback = function (req, res) {
    const id = req.params.id
    table()
      .where('id', id)
      .then((user: IUsername[]) => {
        return user.length > 0 ?
          res.status(200).send(user) :
          res.status(404).send({ message: 'Username not found' })
      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' })
      })
  }

  update: RouteCallback = function (req, res) {
    const usernameTmp: IUsername = req.body

    table()
      .where({ id: +req.params.id })
      .update(usernameTmp)
      .then((username: number) => {
        return username > 0 ?
          res.status(200).send({ message: 'Modificado con éxito' }) :
          res.status(404).send({ message: 'Username no encontrado' })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }

  delete: RouteCallback = function (req, res) {
    table()
      .where({ id: +req.params.id })
      .update({ isDeleted: true })
      .then((username: number) => {
        return username > 0 ?
          res.status(200).send({ message: 'Borrado con éxito' }) :
          res.status(404).send({ message: 'Username no encontrado' })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }
}