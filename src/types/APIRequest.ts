import type { Developer } from "./developer";
import type { Game } from "./game";
import type { User } from "./user";

export interface APIRequest{
    error: boolean,
    message: string,
    code: number|string,
    data: User | User[]| Developer[] | Comment[] | Game[],
    token?: string
}