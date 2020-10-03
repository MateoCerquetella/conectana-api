export type IUsername = BaseTable & {
    username: string
    email: string
    photo_url: string
    password: string
    id_colaborator: number
    id_organization: number
    cellphone: string
    accessToken?: string
    expiresIn?: number
    isAdmin: boolean
}