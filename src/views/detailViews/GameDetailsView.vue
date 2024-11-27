<script setup lang="ts">
import { onMounted } from 'vue';
import { useCollections } from '@/composables/getData';
import { prepareImageSrc } from '@/utils/imageUtils';
import type { Game } from '@/types/Game';
const {data: gameData, isLoading: gameIsLoading, getCollection: getGameCollection} = useCollections()
const {data: gameCommentsData, isLoading: commentsAreLoading, getCollection: getGameCommentsCollection} = useCollections()
const props = defineProps({
    id: {type: String}
})

onMounted(async () => {
    getGameCollection({collectionName: 'games', expand: 'developerId', id: props.id})

})

</script>

<template>

<div class="block items-center justify-center mx-auto max-w-6xl">
    <div v-if="!gameIsLoading" class="flex">
        <img class="bigImgDisplay" :src="prepareImageSrc((gameData as Game).photo)">
        <div class="ml-5 flex flex-col">
            <div class="text-4xl">
                <a>{{ gameData.title }}</a>
            </div>
            <a class="mt-2">Genre: {{ (gameData as Game).genre }}</a>
            <a class="mt-2">Platform: {{ (gameData as Game).platform }}</a>
            <a class="mt-2">Language: {{ (gameData as Game).language }}</a>
            <a class="mt-2">PlayerType: {{ (gameData as Game).playerType }}</a>
            <a class="mt-2">Controller Support: {{ (gameData as Game).controllerSupport }}</a>
            <a class="mt-2">Developer: {{ (gameData as Game).developerId.name }}</a>
            <div class="mt-2" style="white-space: pre-wrap;">
                <a class="">Description: {{ gameData.description }}</a>
            </div>
        </div>
    </div>
    <div class="text-2xl mt-4 mb-4">
        <a>Developer's games: </a>
    </div>
    <!-- <GamesGridDisplay v-if="!gamesAreLoading && totalGames != 0" :games="developerGamesData"></GamesGridDisplay>
    <NoDataFoundDisplay class="mt-10" v-else-if="!gamesAreLoading &&totalGames == 0"></NoDataFoundDisplay> -->
</div>

</template>

<style scoped>




</style>