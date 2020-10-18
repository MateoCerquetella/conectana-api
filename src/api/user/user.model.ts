export type IUser = BaseTable & IUserCredentials & {
    username: string
    email: string
    photo_url?: string
    password: string
    id_colaborator?: number
    id_organization?: number
    cellphone?: string
    isAdmin: boolean
}

type IUserCredentials = {
    accessToken?: string
    expiresIn?: number
}