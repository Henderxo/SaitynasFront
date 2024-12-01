<script setup lang="ts">
import { useCollectionsUpdater } from '@/composables/postData';
import { useModalStore } from '@/stores/ModalStore';
import { onMounted } from 'vue';
import { timeSince } from '@/utils/timeUtils';
import { useCollections } from '@/composables/getData';
import NoDataFoundDisplay from '../displays/NoDataFoundDisplay.vue';
import { prepareImageSrc } from '@/utils/imageUtils';
const {data, isLoading, getCollection, totalCount} = useCollections()
const props = defineProps({
    id: {type: String, required: true}
})
const {deleteModalData} = useCollectionsUpdater(`comments/${props.id}`)
onMounted(()=>{
    getCollection({collectionName: 'comments', expand: 'userId', id: `${props.id}`})
})
function onSubmit(){
    deleteModalData('Comment successifuly deleted.')
    useModalStore().ResetModal()
}
</script>

<template>
<div style="min-width: 800px; max-width: 800px; min-height: 300px;" class="purple p-16">
    <div class="flex flex-col">
        <div>
            <a class="text-4xl">Delete comment</a>
        </div>
        <div class="flex mt-6 mb-4" v-if="!isLoading">
            <img v-if="!isLoading && data.userId.photo" class="w-12 mr-2 h-12 rounded-full"  :src="prepareImageSrc(data.userId.photo)">
            <img v-else-if="!isLoading" class="w-12 h-12 mr-2 rounded-full"  src="@/assets/icons/userIcon.png">

            <div class="flex flex-col">
                <div class="flex">
                    <a class="">{{ data.userId.username }}</a>
                    <div class="ml-5">
                        <a class="text-xs time w-full"> {{ timeSince(data.created_at as string) }}</a>
                    </div>
                </div>
                <div class="commentBody mt-1 break-all flex flex-col  pr-4">
                    <a class="text-lg" >{{ data.title }}</a>
                    <a>{{ data.body }} </a>
                </div> 
            </div>  
        </div>  
        <a v-if="!isLoading" class="text-red-500 text-xl">Are you sure you want to delete this comment!!!</a>
        <div v-if="!isLoading" class="w-full mt-5 flex  justify-center">
            <button @click="onSubmit" class="delete w-auto h-auto justify-center items-center" type="submit">Delete comment</button>
        </div>
        <NoDataFoundDisplay class="mt-10" v-if=" totalCount == 0"></NoDataFoundDisplay>
    </div>
</div>

</template>

<style scoped>

</style>