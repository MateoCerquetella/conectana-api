export type IPostComment = BaseTable & {
    post_id: number
    user_id: number
    text: string
    comment_reply_id?: number
}