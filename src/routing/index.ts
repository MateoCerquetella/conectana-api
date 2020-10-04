import { Express } from 'express-serve-static-core'
import jobPostStatusRoutes from '../api/job_post_status/job_post_status.routes'
import tagRoutes from '../api/tag/tag.routes'
import postRoutes from '../api/post/post.routes'
import categoryRoutes from '../api/category/category.routes'
import colaboratorRoutes from '../api/colaborator/colaborator.routes'
import usernameRoutes from '../api/username/username.routes'
import jobPostPostulationRoutes from '../api/job_post_postulation/job_post_postulation.routes'
import jobPostRoutes from '../api/job_post/job_post.routes'
import postCommentRoutes from '../api/post_comment/post_comment.routes'
import userFollowRoutes from '../api/user_follow/user_follow.routes'

export default (app: Express) => {
  jobPostStatusRoutes(app)
  jobPostRoutes(app)
  jobPostPostulationRoutes(app)
  tagRoutes(app)
  postRoutes(app)
  postCommentRoutes(app)
  categoryRoutes(app)
  colaboratorRoutes(app)
  usernameRoutes(app)
  userFollowRoutes(app)
}
