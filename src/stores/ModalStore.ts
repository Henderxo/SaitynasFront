import { defineStore } from "pinia";
import { readonly, ref,  shallowRef, computed } from "vue";
import { type ModalState } from "@/types/ModalState";

export const useModalStore = defineStore('Modal', ()=>{
    const initialState: ModalState =  {
        component: null,
        componentProps: {}
    }
    const CurrentModal = shallowRef<ModalState>(initialState)
    const isModal = ref<boolean>(false)
    const isTriggerChange = ref<boolean>(false)
    const isTriggerCommentChange = ref<boolean>(false)
    const isTriggerGameChange = ref<boolean>(false)
    const isTriggerDevChange = ref<boolean>(false)
    const isTriggerUserChange = ref<boolean>(false)

    function SetModal(modalOptions: ModalState){
        CurrentModal.value = modalOptions
        isModal.value = true
    }

    function ResetModal(){
        CurrentModal.value = initialState
        isModal.value = false
    }

    function TriggerChange(){
        isTriggerChange.value = !isTriggerChange.value
    }

    function TriggerCmmentChange(){
        isTriggerCommentChange.value = !isTriggerCommentChange.value
    }

    function TriggerGameChange(){
        isTriggerGameChange.value = !isTriggerGameChange.value
    }

    function TriggerDeveloperChange(){
        isTriggerDevChange.value = !isTriggerDevChange.value
    }

    function TriggerUserChange(){
        isTriggerUserChange.value = !isTriggerUserChange.value
    }

    const isTriggerComment = computed(() => {
        return isTriggerCommentChange
    })

    const isTriggerGames = computed(() => {
        return isTriggerGameChange
    })

    const isTriggerDevelopers = computed(() => {
        return isTriggerDevChange
    })

    const isTrigger = computed(() => {
        return isTriggerChange
    })

    const isTriggerUser = computed(() => {
        return isTriggerUserChange
    })



    return {SetModal, ResetModal, CurrentModal, isModal: readonly(isModal),isTriggerUser, isTrigger,TriggerUserChange, isTriggerComment, isTriggerGames, isTriggerDevelopers, TriggerChange, TriggerCmmentChange, TriggerGameChange, TriggerDeveloperChange}
})