import * as express from 'express'
import db from '../../database/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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

        if (!bcrypt.compareSync(usernameTmp.password, user.password)) { // Bad password
          return res.status(409).send({ message: 'La contraseña es incorrecta.' })
        }

        const expiresIn = 24 * 60 * 60
        const accessToken = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET || '', { expiresIn })
        req.session.userId = user.id
        // username.accessToken = accessToken
        // username.expiresIn = expiresIn

        res.status(200).send(user)
      })
      .catch((error) => {
        if (error.received === 0) return res.status(400).send({ message: 'Usuario no encontrado.' })
        return res.status(500).send({
          message: 'Ha ocurrido un error al iniciar sesión.'
        })
      })
  }

  create: RouteCallback = function (req, res) {
    const usernameTmp: IUsername = req.body

    //Validate request
    if (!usernameTmp.username || !usernameTmp.password || !usernameTmp.email || !usernameTmp.id_colaborator) {
      return res.status(400).send({
        message: 'Falta contenido y/o no puede estar vacio.'
      })
    }

    usernameTmp.password = bcrypt.hashSync(usernameTmp.password, 6)
    usernameTmp.isAdmin = false

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
      .del()
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