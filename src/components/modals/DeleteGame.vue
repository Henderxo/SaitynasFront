<script setup lang="ts">
import { useCollectionsUpdater } from '@/composables/postData';
import { useModalStore } from '@/stores/ModalStore';
import { onMounted } from 'vue';
import { useCollections } from '@/composables/getData';
import { prepareImageSrc } from '@/utils/imageUtils';
import type { Game } from '@/types/Game';
import NoDataFoundDisplay from '../displays/NoDataFoundDisplay.vue';
const {data, isLoading, getCollection, totalCount} = useCollections()
const props = defineProps({
    id: {type: String, required: true}
})
const {deleteModalData} = useCollectionsUpdater(`games/${props.id}`)
onMounted(()=>{
    getCollection({collectionName: 'games', id: `${props.id}`})
})
function onSubmit(){
    deleteModalData('Game successifuly deleted.','game', '/games')
    useModalStore().ResetModal()
}
</script>

<template>
<div style="min-width: 800px; max-width: 800px; min-height: 500px;" class="purple p-16">
    <div class="flex flex-col">
        <div>
            <a class="text-4xl">Delete game</a>
        </div>
        <div class="flex mt-6 mb-4" v-if="!isLoading">
            <img class="shadow-xl mr-5 imgDisplay" :src="prepareImageSrc(data.photo)">
            <div class="flex flex-col break-all">
                <div class="text-xl ">
                    <a>{{ data.title }}</a>
                </div>
                <a class="mt-3 text-sm">Genre: {{ data.genre }}</a>
                <a class="mt-2 text-sm">Platform: {{ (data as Game).platform }}</a>
                <a class="mt-2 text-sm">Controller Support: {{ ((data as Game).controllerSupport) }}</a>
                <a class="mt-2 text-sm">Player type: {{ ((data as Game).playerType) }}</a>
                <a class="mt-2 text-sm">Language: {{ ((data as Game).language) }}</a>
            </div>
        </div>  
        <a v-if="!isLoading" class="text-red-500 text-xl">Are you sure you want to delete this game!!!</a>
        <div v-if="!isLoading" class="w-full mt-5 flex  justify-center">
            <button @click="onSubmit" class="delete w-auto h-auto justify-center items-center" type="submit">Delete game</button>
        </div>
        <NoDataFoundDisplay class="mt-10" v-if=" totalCount == 0"></NoDataFoundDisplay>
    </div>
</div>

</template>

<style scoped>

</style>