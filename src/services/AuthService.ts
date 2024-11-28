import { type User } from "@/types/User"
import {  resetInstance, getUserAuthData } from "./APIService"
import type { APIRequest } from "@/types/APIRequest"

export async function registerNewLogin(email: String, password: String): Promise<APIRequest>{
    const res = await getUserAuthData(email, password)
    let jwtToken = typeof res.token !== 'undefined' ? res.token : ''
    if(!res.error && jwtToken && isTokenValid(jwtToken)){
        localStorage.setItem("token", jwtToken as string)
        localStorage.setItem("currentUser", JSON.stringify(res.data as User))
    }
    return res
}

function parseToken(token: String): Number{
    try{
        const arrayToken = token.split('.')
        const tokenPayload = JSON.parse(atob(arrayToken[1]))
        return tokenPayload.exp as Number
    }catch{
        return 0
    }
}

export function isTokenValid(token: String|null): boolean{
    if(token !== null && token.length > 1)
    {
        let tokenExpDate = parseToken(token as String)
        const currentTime = new Date().getTime() / 1000
        return currentTime   as Number > tokenExpDate ? false : true
    }
    return false
}

// export async function refreshToken(): Promise<APIRequest>{
//     const res = await refreshAuthToken()
//     if(!res.error && res.token){
//         localStorage.setItem("token", res.token as  string)
//         localStorage.setItem("currentUser", JSON.stringify(res.data as Account))
//     }
//     return res
// }

export function removeToken(): void {
    localStorage.removeItem("token")
    localStorage.removeItem("currentUser")
    resetInstance()
}

export function getAuthHeaders(): String {
    const token = localStorage.getItem('token')
    return token ? `Bearer ${token}` : ''
}