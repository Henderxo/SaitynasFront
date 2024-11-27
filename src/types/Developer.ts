import type { User } from "./User"

export interface Developer{
    _id: string,
    name: string,
    founder: string,
    headquarters: string,
    userId: string | User,
    photo: string | null
}