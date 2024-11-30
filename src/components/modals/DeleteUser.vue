<script setup lang="ts">
import { useCollectionsUpdater } from '@/composables/postData';
import { useModalStore } from '@/stores/ModalStore';
import { onMounted } from 'vue';
import { useCollections } from '@/composables/getData';
import { prepareImageSrc } from '@/utils/imageUtils';
import type { User } from '@/types/User';
import { useAuthStore } from '@/stores/AuthStore';
import NoDataFoundDisplay from '../displays/NoDataFoundDisplay.vue';
const {data, isLoading, getCollection, totalCount} = useCollections()
const props = defineProps({
    id: {type: String, required: true}
})
const {deleteModalData} = useCollectionsUpdater(`users/${props.id}`)
onMounted(()=>{
    getCollection({collectionName: 'users', id: `${props.id}`})
})
function onSubmit(){
    deleteModalData('User successifuly deleted.')
    if(props.id === useAuthStore().currentUser?._id){
        useAuthStore().logUserOut()
    }
    useModalStore().ResetModal()
}
</script>

<template>
<div style="min-width: 800px; max-width: 800px; min-height: 400px;" class="purple p-16">
    <div class="flex flex-col">
        <div>
            <a class="text-4xl">Delete user</a>
        </div>
        <div class="flex mt-6 mb-4" v-if="!isLoading">
            <img class="shadow-xl mr-5 imgDisplay" :src="prepareImageSrc(data.photo)">
            <div class="flex flex-col break-all">
                <a class="mt-3 ">Username: {{ data.username }}</a>
                <a class="mt-2 ">Email: {{ (data as User).email}}</a>
                <a class="mt-2 ">Type: {{ ((data as User).type) }}</a>
                <a class="mt-2 ">Created: {{ ((data as User).created_at.slice(0,10)) }}</a>
            </div>
        </div>
        <a v-if="!isLoading" class="text-red-500 text-xl">Are you sure you want to delete this user!!!</a>
        <div v-if="!isLoading" class="w-full mt-5 flex  justify-center">
            <button @click="onSubmit" class="delete w-auto h-auto justify-center items-center" type="submit">Delete user</button>
        </div>
        <NoDataFoundDisplay class="mt-10" v-if=" totalCount == 0"></NoDataFoundDisplay>
    </div>
</div>

</template>

<style scoped>

</style>