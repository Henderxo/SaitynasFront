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

    const isTrigger = computed(() => {
        return isTriggerChange
    })



    return {SetModal, ResetModal, CurrentModal, isModal: readonly(isModal), isTrigger, TriggerChange}
})