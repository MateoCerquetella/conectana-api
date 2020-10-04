export type IPostComment = BaseTable & {
    post_id: number
    username_id: number
    text: string
    comment_reply_id?: number
}