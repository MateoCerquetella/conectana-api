import { Request, Response, Express } from 'express'

export type RouteCallback = (req: Request & { session: Express.Session }, res: Response) => any