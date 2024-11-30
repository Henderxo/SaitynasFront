<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useCollections } from '@/composables/getData';
import GamesGridDisplay from '@/components/displays/GamesGridDisplay.vue';
import { prepareImageSrc } from '@/utils/imageUtils';
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';
import type { Developer } from '@/types/Developer';
import { useAuthStore } from '@/stores/AuthStore';
import { useModalStore } from '@/stores/ModalStore';
import EditDeveloper from '@/components/modals/EditDeveloper.vue';
import DeleteDeveloper from '@/components/modals/DeleteDeveloper.vue';
import type { User } from '@/types/User';
const AuthStore = useAuthStore()
const {data: developerData, isLoading: developerIsLoading, getCollection: getDeveloperCollection} = useCollections()
const {data: developerGamesData, isLoading: gamesAreLoading, getCollection: getDeveloperGamesCollection, totalCount: totalGames} = useCollections()
const props = defineProps({
    id: {type: String}
})

onMounted(async () => {
    getDeveloperCollection({collectionName: 'developers', expand: 'userId', id: props.id})
    getDeveloperGamesCollection({collectionName: 'developers', id: `${props.id}/games`})
    
})

watch(useModalStore().isTrigger, ()=>{
    getDeveloperCollection({collectionName: 'developers', expand: 'userId', id: props.id})
    getDeveloperGamesCollection({collectionName: 'developers', id: `${props.id}/games`})    
})
</script>

<template>

<div class="block items-center justify-center mx-auto max-w-6xl mt-5">
    <div v-if="!developerIsLoading" class="flex">
        <img class="bigImgDisplay" :src="prepareImageSrc((developerData as Developer).photo)">
        <div class="ml-5 flex flex-col">
            <div class="text-4xl">
                <a>{{ (developerData as Developer).name }} </a>
            </div>
            <a class="mt-3">Founder: {{ (developerData as Developer).founder }}</a>
            <a class="mt-2">Headquarters: {{ (developerData as Developer).headquarters }}</a>
            <a class="mt-2">Games created: {{ totalGames }}</a>
            <a class="mt-2">Founded: {{ ((developerData as Developer).founded as string).slice(0, 10) }}</a>
            <div class="mt-2 break-word truncate" style="white-space: pre-wrap;">
                <a class="">Description: {{ (developerData as Developer).description }}</a>
            </div>
        </div>
    </div>
    <div v-if="!developerIsLoading && (AuthStore.isAdmin() || (AuthStore.isDev() && ((developerData as Developer).userId as User)._id === AuthStore.currentUser?._id))" class="flex  mt-5">
        <button class="button float-right mr-4 rounded-xl  w-36 h-12 text-xl">New Game</button>
        <button @click="useModalStore().SetModal({component: EditDeveloper, componentProps: {id: (developerData as Developer)._id}})" class="button float-right mr-4 ml-4 rounded-xl  w-36 h-12 text-xl">Edit</button>
        <button @click="useModalStore().SetModal({component: DeleteDeveloper, componentProps: {id: (developerData as Developer)._id}})" class="delete float-right ml-4 rounded-xl  w-36 h-12 text-xl">Delete</button>
    </div>
    <div class="text-2xl mt-4 mb-4">
        <a>Developer's games: </a>
    </div>

    <GamesGridDisplay v-if="!gamesAreLoading && totalGames != 0" :games="developerGamesData"></GamesGridDisplay>
    <NoDataFoundDisplay class="mt-10" v-else-if="totalGames == 0"></NoDataFoundDisplay>

</div>

</template>

<style scoped>

</style>