export type IColaborator = BaseTable & {
    id?: number
    first_name: string
    last_name: string
    tag_id: number
    date_birth: Date
    bio: string
}