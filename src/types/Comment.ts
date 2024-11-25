import type { Game } from "./game";
import type { User } from "./user";

export interface Comment{
    id: string,
    title: string,
    body: string,
    gameId: string | Game,
    userId: string | User,
    created_at: Date| string
}