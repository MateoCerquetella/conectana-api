import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routing from './routing'
import redis from 'redis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { __cookie_secret__, __prod__ } from './api/core.constants'

import db from './database/db'
import { IUser } from './api/user/user.model'

declare module "express-serve-static-core" {
  interface Request {
    populateUser: () => void
    user: IUser
  }
}


const main = async () => {
  // Declare server
  const app = express()

  // Declare Redis
  let RedisStore = connectRedis(session)
  let redisClient = redis.createClient()

  // Start Redis store session
  app.use(
    session({
      name: 'qid',
      store: new RedisStore({
        client: redisClient
      }),
      cookie: {
        maxAge: 86400000, // 1 day
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__
      },
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET || __cookie_secret__,
      resave: false,
    })
  )

  // CORS configuration
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cors())

  // Routing
  routing(app)

  // Set the port
  app.set('port', process.env.PORT || 3000)

  // Start the server
  app.listen(app.get('port'), () => {
    console.log('server on port:', app.get('port'))
  });

  (() => {
    const table = () => db<IUser>('user')

    const populateUser = async (req: any) => {
      if (req.user || !req.session?.userId) return

      const userRes = await table().where('id', req.session.userId)
      req.user = userRes[0] || null
    }

    app.use((req, res, next) => {
      req.populateUser = () => populateUser(req)
      next()
    })
  })()
}

main()