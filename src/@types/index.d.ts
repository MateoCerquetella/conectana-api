import { Request, Response, Express } from 'express'

interface RequestWithUserId extends Request {
    userId?: number
}

export type RouteCallback = (req: Request & { session: Express.Session }, res: Response) => any