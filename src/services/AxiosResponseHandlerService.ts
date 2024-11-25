import { type AxiosResponse } from "axios"
import axios from "axios";
class HttpError extends Error {
    constructor(message?: string) {
      super(message)
      this.name = 'HttpError'
      Object.setPrototypeOf(this, new.target.prototype) 
    }
}
export interface CustomAxiosReponse extends AxiosResponse{
    error: boolean,
    message: string,
    data: any
}

function formResponse(message: string, code: number, isError: boolean, response?: AxiosResponse): CustomAxiosReponse{
    return {
        error: isError,
        message: message,
        data: isError?[]:response?.data, 
        status: code, 
        statusText: isError ? 'Error' : 'OK',
        headers: response?.headers??{}, 
        config: response?.config??{}, 
        request: response?.request??{},
    } as CustomAxiosReponse; 
}
function httpErrorHandler(error: any){
    if(error === null) throw new Error('Unexpected error')
    if(axios.isAxiosError(error)){
        const response = error?.response
        const statusCode = response?.status??500;
        switch (statusCode) {
            case 400:
                return formResponse('',statusCode, true, response);
            case 401:
                return formResponse('', statusCode, true, response);
            case 403:
                return formResponse('.', statusCode, true, response);
            case 404:
                return formResponse('', statusCode, true, response);
            case 500:
                return formResponse('', statusCode, true, response);
            case 503:
                return formResponse('', statusCode, true, response);
            default:
                return formResponse(``, statusCode, true, response);
        }
    }
    return formResponse('', -200, true)
}

export function responseErrorHandler(response: AxiosResponse<any>) {
    return httpErrorHandler(response)
 }

export function responseHandler(response: AxiosResponse<any>) {

    if(response.status == 200){

        const data = response?.data
        if(!data){
            throw new HttpError('')
        }
        return formResponse('', 200, false, response)
    }
    if(response.status = 204){
        return formResponse('', 204, false, response)
    }
    throw new HttpError()
}