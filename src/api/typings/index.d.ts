import { IUsername } from '../username/username.model'

declare global {
    namespace Express {
        interface Request {
            user?: IUsername;
        }
    }
}