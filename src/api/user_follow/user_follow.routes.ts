import express from 'express'
import { isAuth } from '../middleware/auth'
import { UserFollowController } from './user_follow.controller'

const router = express.Router()
const userFollow = new UserFollowController()

export default function userFollowRoutes(app: express.Express) {
  router.post('/', userFollow.create)
  router.get('/', userFollow.findAll)
  router.get('/:id', userFollow.findOne)
  router.put('/:id', isAuth, userFollow.update)
  router.delete('/', isAuth, userFollow.delete)

  app.use('/userFollow', router)
}