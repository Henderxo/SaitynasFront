export interface User{
    _id: string,
    username: string,
    email: string,
    created_at: Date|string,
    type: string,
    photo: string | null
}