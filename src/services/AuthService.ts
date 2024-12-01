import { type User } from "@/types/User"
import { getUserAuthData } from "./APIService"
import type { APIRequest } from "@/types/APIRequest"
import Cookies from 'js-cookie'

export async function registerNewLogin(email: String, password: String): Promise<APIRequest>{
    const res = await getUserAuthData(email as string, password as string)
    let jwtToken = typeof res.token !== 'undefined' ? res.token : ''
    if(!res.error && jwtToken && isTokenValid(jwtToken)){
        localStorage.setItem("token", jwtToken as string)
        localStorage.setItem("currentUser", JSON.stringify(res.data as User))
    }
    return res
}

function parseToken(token: string): number {
    try{
        const arrayToken = token.split('.')
        const tokenPayload = JSON.parse(atob(arrayToken[1]))
        return tokenPayload.exp as number
    }catch{
        return 0
    }
}


export function isTokenValid(token: String|null): boolean {
    if (token !== null && token.length > 1) {
        
        const tokenExpDate = parseToken(token as string);
        const currentTime = new Date().getTime() / 1000;
        return currentTime < tokenExpDate;
    }
    return false;
}

export function removeToken(): void {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("token")
}
