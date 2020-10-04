export type IJobPost = BaseTable & {
    id?: number
    title: string
    tag_id: number
    photo_url?: string
    description: string
    responsibilities?: string
    qualifications?: string
}