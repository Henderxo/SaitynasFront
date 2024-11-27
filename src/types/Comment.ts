import type { Game } from "./Game";
import type { User } from "./User";

export interface Comment{
    _id: string,
    title: string,
    body: string,
    gameId: string | Game,
    userId: string | User,
    created_at: Date| string
}