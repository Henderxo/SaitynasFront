import type { User } from "./user"

export interface Developer{
    id: string,
    name: string,
    founder: string,
    headquarters: string,
    userId: string | User
}