<script setup lang="ts">
import { onMounted } from 'vue';
import { useCollections } from '@/composables/getData';
import GamesGridDisplay from '@/components/displays/GamesGridDisplay.vue';
import { prepareImageSrc } from '@/utils/imageUtils';
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';
import type { Developer } from '@/types/Developer';
import { useAuthStore } from '@/stores/AuthStore';
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

</script>

<template>

<div class="block items-center justify-center mx-auto max-w-6xl mt-5">
    <div v-if="!developerIsLoading" class="flex">
        <img class="bigImgDisplay" :src="prepareImageSrc((developerData as Developer).photo)">
        <div class="ml-5 flex flex-col">
            <div class="text-4xl">
                <a>{{ developerData.name }}</a>
            </div>
            <a class="mt-3">Founder: {{ developerData.founder }}</a>
            <a class="mt-2">Headquarters: {{ (developerData as Developer).headquarters }}</a>
            <a class="mt-2">Games created: {{ totalGames }}</a>
            <a class="mt-2">Founded: {{ ((developerData as Developer).founded as string).slice(0, 10) }}</a>
            <div class="mt-2" style="white-space: pre-wrap;">
                <a class="">Description: {{ developerData.description }}</a>
            </div>
        </div>
    </div>
    <div v-if="!developerIsLoading && (AuthStore.isAdmin() || (AuthStore.isDev() && (developerData as Developer).userId._id === AuthStore.currentUser?._id))" class="flex  mt-5">
        <button class="button float-right mr-4 rounded-xl  w-36 h-12 text-xl">New Game</button>
        <button class="button float-right mr-4 ml-4 rounded-xl  w-36 h-12 text-xl">Edit</button>
        <button class="delete float-right ml-4 rounded-xl  w-36 h-12 text-xl">Delete</button>
    </div>
    <div class="text-2xl mt-4 mb-4">
        <a>Developer's games: </a>
    </div>

    <GamesGridDisplay v-if="!gamesAreLoading && totalGames != 0" :games="developerGamesData"></GamesGridDisplay>
    <NoDataFoundDisplay class="mt-10" v-else-if="!gamesAreLoading &&totalGames == 0"></NoDataFoundDisplay>

</div>

</template>

<style scoped>


</style>