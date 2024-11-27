import { ref, readonly } from 'vue'
import { getData } from '@/services/APIService'
import { type GetAllDataOptions } from '@/types/GetAllDataOptions'  
import type { User } from '@/types/User'
import type { Developer } from '@/types/Developer'
import type { Game } from '@/types/Game'

export function useCollections(){
    const isLoading = ref<boolean>(true)
    const dataList = ref<User[]|Developer|Game[]|Comment[]|Developer[]>([])
    const totalCount = ref<Number>(0)

    async function getCollection({collectionName, expand = null, id}: GetAllDataOptions){

        const url = formUrl(collectionName,expand,id)
        isLoading.value = true
        const res = await getData(url as string)
        if(res.error === true){
            dataList.value = []
            isLoading.value = true
            return
        }
        console.log(res.data)
        dataList.value = res.data as User[]|Developer|Game[]|Comment[]|Developer[]
        if(Array.isArray(dataList.value)){
            totalCount.value = (dataList.value as Object[]).length
        }
        isLoading.value = false
    }

    function resetData(): void{
        dataList.value = []
        isLoading.value = true
    }
    
    return {resetData, getCollection, isLoading: readonly(isLoading), data: readonly(dataList), totalCount: readonly(totalCount)}
}

function formUrl(collectionName: String, expand: String|null, id?: String): String{
    const baseUlr = `${collectionName}`
    let urlQ = id ? `${baseUlr}/${id}` : baseUlr

    const params: string[] = []

    if(expand){
        params.push(`expand=${expand}`)
    }
    if (params.length > 0) {
        urlQ += '?' + params.join('&')
    }
    
    return urlQ
}