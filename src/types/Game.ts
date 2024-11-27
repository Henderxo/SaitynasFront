import type { Developer } from "./Developer";

export interface Game{
    _id: string,
    title: string,
    genre: string,
    platform: Date,
    controllerSupport: boolean,
    language: string,
    playerType: string,
    developerId: string | Developer,
    photo: string | null
}