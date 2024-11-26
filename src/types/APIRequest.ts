import type { Developer } from "./Developer";
import type { Game } from "./Game";
import type { User } from "./User";

export interface APIRequest{
    error: boolean,
    message: string,
    code: number|string,
    data: User | User[]| Developer[] | Comment[] | Game[],
    token?: string
}