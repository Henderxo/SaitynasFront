import type { Developer } from "./Developer";

export interface Game{
    _id: string,
    title: string,
    gender: string,
    platform: Date,
    controllerSupport: boolean,
    language: string,
    playerType: string,
    daveloperId: string | Developer,
    photo: string | null
}