import db from '../../database/db'
import argon2 from 'argon2'
import { IUser } from './user.model'
import { RouteCallback } from '../../@types'

const table = () => db<IUser>('user')

export class UserController {

  login: RouteCallback = function (req, res) {
    const userTmp: IUser = req.body

    // Validate request
    if (!userTmp.username || !userTmp.password) {
      return res.status(400).send({
        message: 'Falta contenido en el cuerpo.'
      })
    }

    table()
      .where('username', userTmp.username)
      .then((userRes) => {
        let user = userRes[0]
        argon2
          .verify(user.password, userTmp.password)
          .then(isAuth => {
            if (isAuth) {
              req.session.userId = user.id
              req.session.isAdmin = user.isAdmin
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
    const userTmp: IUser = req.body

    // Validate request
    if (!userTmp.username || !userTmp.password || !userTmp.email || !userTmp.id_colaborator) {
      return res.status(400).send({
        message: 'Falta contenido y/o no puede estar vacio.'
      })
    }

    // Hashing password
    userTmp.password = await argon2.hash(userTmp.password)

    table()
      .insert(userTmp)
      .then(() => {
        return res.status(200).send({ message: 'Creado con éxito' })
      })
      .catch((error) => {
        if (error.code === '23505') {
          return res.status(409).send({ message: 'Ya existe el user' })
        }
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }

  findAll: RouteCallback = function (req, res) {
    table()
      .select()
      .where({ isDeleted: false })
      .then((user: IUser[]) => {
        return res.status(200).send(user)
      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' })
      })
  }

  findOne: RouteCallback = function (req, res) {
    table()
      .where({ id: +req.params.id, isDeleted: false })
      .then((user: IUser[]) => {
        return user.length > 0 ?
          res.status(200).send(user) :
          res.status(404).send({ message: 'User no encontrado' })
      })
      .catch(() => {
        return res.status(500).json({ message: 'Server error' })
      })
  }

  update: RouteCallback = function (req, res) {
    const userTmp: IUser = req.body

    if (userTmp.isAdmin !== undefined) {
      return res.status(400).send({
        message: 'No puedes darte administrador explícitamente.'
      })
    }

    if (!(req.session.userId === +req.params.id || req.session.isAdmin)) {
      return res.status(403).send({ message: 'No puedes acceder a este contenido' })
    }

    table()
      .where({ id: +req.params.id, isDeleted: false })
      .update(userTmp)
      .then((user: number) => {
        return user > 0 ?
          res.status(200).send({ message: 'Modificado con éxito' }) :
          res.status(404).send({ message: 'User no encontrado' })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }

  delete: RouteCallback = function (req, res) {
    if (!(req.session.userId === +req.params.id || req.session.isAdmin)) {
      return res.status(403).send({ message: 'No puedes acceder a este contenido' })
    }

    table()
      .where({ id: +req.params.id })
      .update({ isDeleted: true })
      .then((user: number) => {
        return user > 0 ?
          res.status(200).send({ message: 'Borrado con éxito' }) :
          res.status(404).send({ message: 'User no encontrado' })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Server error', messageError: error.detail })
      })
  }
}