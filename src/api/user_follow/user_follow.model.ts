export type IUserFollow = BaseTable & {
    user_from_id: number
    user_to_id: number
    is_following: boolean
}