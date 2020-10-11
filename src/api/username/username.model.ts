export type IUsername = BaseTable & IUsernameCredentials & {
    username: string
    email: string
    photo_url?: string
    password: string
    id_colaborator?: number
    id_organization?: number
    cellphone?: string
    isAdmin: boolean
}

type IUsernameCredentials = {
    accessToken?: string
    expiresIn?: number
}