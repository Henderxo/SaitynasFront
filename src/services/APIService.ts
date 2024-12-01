import axios from "axios";
import { isTokenValid } from "./AuthService";
import { type APIRequest } from "@/types/APIRequest";
import { useAuthStore } from "@/stores/AuthStore";
import { type CustomAxiosReponse, responseHandler, responseErrorHandler } from "./AxiosResponseHandlerService";

const instance = axios.create({
    baseURL: global.api,
    withCredentials: true,
})
let refreshing:boolean = false

instance.interceptors.response.use(responseHandler, responseErrorHandler)
instance.defaults.headers.post["Content-Type"] = 'multipart/form-data'
instance.defaults.headers.put["Content-Type"] = 'multipart/form-data'
instance.interceptors.request.use(
    async (config) => {
        console.log('start')
        console.log(!isTokenValid(useAuthStore().authToken))
        console.log(!refreshing)
        console.log((useAuthStore().currentUser !== null || useAuthStore().authToken !== null))
        console.log(useAuthStore().currentUser !== null)
        console.log(useAuthStore().authToken !== null)
        if (!isTokenValid(useAuthStore().authToken) && !refreshing && (useAuthStore().currentUser !== null || useAuthStore().authToken !== null)) {
            console.log('refreshing lul')
            refreshing=true
            const res = await refreshToken();  
            console.log(res)
            if (!res.error && res.data.token) {
                localStorage.setItem('token', res.data.token);
                useAuthStore().refreshUser(res.token)
            }else{
                console.log('pig')
                useAuthStore().logUserOut()
            }
            refreshing=false
        }
        return config; 
    }
);
  


async function getData(dateName: string):Promise<APIRequest>{
    const res = (await instance.get((dateName as string)) as CustomAxiosReponse)
    return {
        error: res.error,
        message: res.message,
        code: res.status,
        data: res.data.items??res.data
    }
}

async function postData(dateName: string, data: object):Promise<APIRequest>{
    const res = (await instance.post((dateName as string), data) as CustomAxiosReponse)
    return {
        error: res.error,
        message: res.message,
        code: res.status,
        data: res.data.items??res.data
    }
}

async function deleteData(dateName: string):Promise<APIRequest>{
    const res = (await instance.delete((dateName as string)) as CustomAxiosReponse)
    return {
        error: res.error,
        message: res.message,
        code: res.status,
        data: res.data.items??res.data
    }   
}

async function updateData(dateName: string, data: object):Promise<APIRequest>{
    const res = (await instance.put((dateName as string), data) as CustomAxiosReponse)
    return {
        error: res.error,
        message: res.message,
        code: res.status,
        data: res.data.items??res.data
    }
}

async function getUserAuthData(email: string, passw: string): Promise<APIRequest> {
    const res = (await instance.post('/login', { email, password: passw }, {
        headers: {
            'Content-Type': 'application/json',
        },
    }) as CustomAxiosReponse);
    return {
        error: res.error,
        message: res.message,
        code: res.status,
        data: res.data.user ?? res.data,
        token: res.data.token
    };
}

async function refreshToken(): Promise<APIRequest> {
    const res = (await instance.post('/refresh', {
        headers: {
            'Content-Type': 'application/json',
        },
    }) as CustomAxiosReponse);
    return {
        error: res.error,
        message: res.message,
        code: res.status,
        data: res.data.user ?? res.data,
        token: res.data.token
    };
}


export {getData, postData, getUserAuthData, deleteData, updateData, refreshToken}