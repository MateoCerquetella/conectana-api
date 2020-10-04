export type IPost = BaseTable & {
    id?: number
    title: string
    description: string
    photo_url?: string
    username_id: string
}
