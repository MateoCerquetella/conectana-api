import { IUsername } from '../api/username/username.model'

declare global {
    namespace Express {
        interface Request {
            username?: IUsername;
        }
    }
}