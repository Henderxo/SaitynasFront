import axios from "axios";
import { type APIRequest } from "@/types/APIRequest";
import { type CustomAxiosReponse, responseHandler, responseErrorHandler } from "./AxiosResponseHandlerService";

const instance = axios.create({
    baseURL: global.api 
})

instance.interceptors.response.use(responseHandler, responseErrorHandler)

function resetInstance(): void{
    instance.defaults.headers.common['Authorization'] = ''
}

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
    const res = (await instance.patch((dateName as string), data) as CustomAxiosReponse)
    return {
        error: res.error,
        message: res.message,
        code: res.status,
        data: res.data.items??res.data
    }
}

async function getUserAuthData(email: String, passw: String): Promise<APIRequest> {

    const res = (await instance.post('/login', {email: email, password: passw} ) as CustomAxiosReponse)
    instance.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
    return {
        error: res.error,
        message: res.message,
        code: res.status,
        data: res.data.user??res.data,
        token: res.data.token,
    }
}

export {getData, postData, getUserAuthData, deleteData, resetInstance, updateData}