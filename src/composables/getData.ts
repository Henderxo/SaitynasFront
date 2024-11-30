import { ref, readonly } from 'vue'
import { getData } from '@/services/APIService'
import { type GetAllDataOptions } from '@/types/GetAllDataOptions'  
import type { User } from '@/types/User'
import type { Developer } from '@/types/Developer'
import type { Game } from '@/types/Game'
import { useNotificationStore } from '@/stores/NotificationStore'
import { useAuthStore } from '@/stores/AuthStore'
export function useCollections(){
    const isLoading = ref<boolean>(true)
    const dataList = ref<User[]|Developer|Game[]|Comment[]|Developer[]|Game|Comment|User>([])
    const totalCount = ref<Number>()
    const Notifications = useNotificationStore()
    async function getCollection({collectionName, expand = null, id}: GetAllDataOptions){

        const url = formUrl(collectionName,expand,id)
        isLoading.value = true
        const res = await getData(url as string)
        if(res.error === true){
            Notifications.errorNotification(`Error: ${res.message}`)
            useAuthStore().isUserLoggedIn()
            dataList.value = []
            isLoading.value = true
            totalCount.value = 0
            return
        }
        dataList.value = res.data as User[]|Developer|Game[]|Comment[]|Developer[]|Game|Comment|User
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