import express, { RequestHandler } from 'express'

import { UserFollowController } from './user_follow.controller'

const router = express.Router()
const userFollow = new UserFollowController()

export default function userFollowRoutes(app: express.Express) {
  router.post('/', userFollow.create as RequestHandler)
  router.get('/', userFollow.findAll as RequestHandler)
  router.get('/:id', userFollow.findOne as RequestHandler)
  router.put('/:id', userFollow.update as RequestHandler)
  router.delete('/:id', userFollow.delete as RequestHandler)

  app.use('/userFollow', router)
}