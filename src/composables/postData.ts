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


    async function handleFlagTrigger(flag: string) {
        switch (flag) {
            case 'base':
                ModalStore.TriggerChange()
                break;
            case 'comment':
                ModalStore.TriggerCmmentChange()
                break;
            case 'developer':
                ModalStore.TriggerDeveloperChange()
                break;
            case 'game':
                ModalStore.TriggerGameChange()
                break;
            default:
                ModalStore.TriggerChange()
                break;
        }

    }

    async function postModalData(data: Object, message: String, flag: String='base', routing?: String): Promise<void>{

        const res = await postData(collection.value as string, data)
        if(res.error){
            NotificationStore.errorNotification(`Error: ${res.message}`)
            useAuthStore().isUserLoggedIn()
            ModalStore.ResetModal()
            return 
        }
        NotificationStore.successNotification(`Success: ${message}`)
        routing?null:handleFlagTrigger(flag as string)
        ModalStore.ResetModal()
        routing?Router.replace({path: `${routing}`}):null
    }

    async function updateModalData(data: Object, message: String, flag: String='base'): Promise<void>{
        const res = await updateData(collection.value as string, data)
        if(res.error){
            NotificationStore.errorNotification(`Error: ${res.message}`)
            useAuthStore().isUserLoggedIn()
            ModalStore.ResetModal()
            return 
        }
        NotificationStore.successNotification(`Success: ${message}`)
        handleFlagTrigger(flag as string)
        ModalStore.ResetModal()
    }

    async function updateModalProfileData(data: Object, message: String): Promise<void>{
        const res = await updateData(collection.value as string, data)
        if(res.error){
            NotificationStore.errorNotification(`Error: ${res.message}`)
            useAuthStore().isUserLoggedIn()
            ModalStore.ResetModal()
            return 
        }
        NotificationStore.successNotification(`Success: ${message}`)
        
        useModalStore().TriggerUserChange()
        ModalStore.ResetModal()
    }

    
    async function deleteModalData(message: String, flag: String='base', routing?: String): Promise<void>{

        const res = await deleteData(collection.value as string)
        if(res.error){
            NotificationStore.errorNotification(`Error: ${res.message}`)
            useAuthStore().isUserLoggedIn()
            ModalStore.ResetModal()
            return 
        }
        NotificationStore.successNotification(`Success: ${message}`)
        routing?null:handleFlagTrigger(flag as string)
        ModalStore.ResetModal()
        routing?Router.replace({path: `${routing}`}):null
        
    }

    return {postModalData, updateModalData, deleteModalData, updateModalProfileData}
}