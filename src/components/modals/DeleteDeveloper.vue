<script setup lang="ts">
import { useCollectionsUpdater } from '@/composables/postData';
import { useModalStore } from '@/stores/ModalStore';
import { onMounted } from 'vue';
import { useCollections } from '@/composables/getData';
import GridElement from '../elements/GridElement.vue';
import { prepareImageSrc } from '@/utils/imageUtils';
import NoDataFoundDisplay from '../displays/NoDataFoundDisplay.vue';
const {data, isLoading, getCollection, totalCount} = useCollections()
const props = defineProps({
    id: {type: String, required: true}
})
const {deleteModalData} = useCollectionsUpdater(`developers/${props.id}`)
onMounted(()=>{
    getCollection({collectionName: 'developers', expand: 'userId', id: `${props.id}`})
})
function onSubmit(){
    deleteModalData('Developer successifuly deleted.', 'developer', '/')
    useModalStore().ResetModal()
}
</script>

<template>
<div style="min-width: 800px; max-width: 800px; min-height: 500px;" class="purple p-16">
    <div class="flex flex-col">
        <div>
            <a class="text-4xl">Delete developer</a>
        </div>
        <div class="flex mt-6 mb-4" v-if="!isLoading">
            <img class="shadow-xl mr-5 imgDisplay" :src="prepareImageSrc(data.photo)">
            <div class="flex flex-col break-all">
                <div class="text-xl ">
                    <a>{{ data.name }}ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</a>
                </div>
                <a class="mt-3 text-sm">Founder: {{ data.founder }}</a>
                <a class="mt-2 text-sm">Headquarters: {{ (data as Developer).headquarters }}</a>
                <a class="mt-2 text-sm">Founded: {{ ((data as Developer).founded as string).slice(0, 10) }}</a>
            </div>
        </div>  

        <a v-if="!isLoading" class="text-red-500 text-xl">Are you sure you want to delete this developer!!!</a>
        <a v-if="!isLoading" class="text-red-500 text-xl">Developers games will be deleted aswell!!!</a>
        <div v-if="!isLoading" class="w-full mt-5 flex  justify-center">
            <button @click="onSubmit" class="delete w-auto h-auto justify-center items-center" type="submit">Delete developer</button>
        </div>
        <NoDataFoundDisplay class="mt-10" v-if=" totalCount == 0"></NoDataFoundDisplay>
    </div>
</div>

</template>

<style scoped>

</style>