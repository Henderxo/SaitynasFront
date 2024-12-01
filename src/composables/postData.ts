import { postData, updateData, deleteData } from "@/services/APIService";
import { ref } from "vue";
import { useNotificationStore } from "@/stores/NotificationStore";
import { useModalStore } from "@/stores/ModalStore";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore";

export function useCollectionsUpdater(collectionUrl: String){
    const NotificationStore = useNotificationStore()
    const collection = ref<String>(collectionUrl)
    const ModalStore = useModalStore()
    const Router = useRouter()

    async function postModalData(data: Object, message: String, routing?: String): Promise<void>{

        const res = await postData(collection.value as string, data)
        if(res.error){
            NotificationStore.errorNotification(`Error: ${res.message}`)
            useAuthStore().isUserLoggedIn()
            ModalStore.ResetModal()
            return 
        }
        NotificationStore.successNotification(`Success: ${message}`)
        routing?null:ModalStore.TriggerChange()
        ModalStore.ResetModal()
        routing?Router.replace({path: `${routing}`}):null
    }

    async function updateModalData(data: Object, message: String): Promise<void>{
        const res = await updateData(collection.value as string, data)
        if(res.error){
            NotificationStore.errorNotification(`Error: ${res.message}`)
            useAuthStore().isUserLoggedIn()
            ModalStore.ResetModal()
            return 
        }
        NotificationStore.successNotification(`Success: ${message}`)
        ModalStore.TriggerChange()
        ModalStore.ResetModal()
    }

    
    async function deleteModalData(message: String, routing?: String): Promise<void>{

        const res = await deleteData(collection.value as string)
        if(res.error){
            NotificationStore.errorNotification(`Error: ${res.message}`)
            useAuthStore().isUserLoggedIn()
            ModalStore.ResetModal()
            return 
        }
        NotificationStore.successNotification(`Success: ${message}`)
        routing?null:ModalStore.TriggerChange()
        ModalStore.ResetModal()
        routing?Router.replace({path: `${routing}`}):null
        
    }

    return {postModalData, updateModalData, deleteModalData}
}