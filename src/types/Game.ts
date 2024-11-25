import type { Developer } from "./developer";

export interface Game{
    id: string,
    title: string,
    gender: string,
    platform: Date,
    controllerSupport: boolean,
    language: string,
    playerType: string,
    daveloperId: string | Developer
}