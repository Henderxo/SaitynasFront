import type { User } from "./User"

export interface Developer{
    id: string,
    name: string,
    founder: string,
    headquarters: string,
    userId: string | User
}