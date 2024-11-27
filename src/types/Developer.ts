import type { User } from "./User"

export interface Developer{
    _id: string,
    name: string,
    founder: string,
    founded: Date | string,
    headquarters: string,
    userId: string | User,
    photo: string | null,
    description: string
}