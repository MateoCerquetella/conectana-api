export type IPostComment = BaseTable & {
    id?: number
    post_id: number
    username_id: number
    text: string
    comment_reply_id?: number
}