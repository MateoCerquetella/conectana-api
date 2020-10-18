export type IPost = BaseTable & {
    title: string
    description: string
    photo_url?: string
    user_id: string
}
