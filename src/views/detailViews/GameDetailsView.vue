<script setup lang="ts">
import { onMounted, watch, computed } from 'vue';
import { useCollections } from '@/composables/getData';
import { prepareImageSrc } from '@/utils/imageUtils';
import type { Game } from '@/types/Game';
import CommentDisplay from '@/components/displays/CommentDisplay.vue';
import GamesGridDisplay from '@/components/displays/GamesGridDisplay.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useModalStore } from '@/stores/ModalStore';
import EditGame from '@/components/modals/EditGame.vue';
const AuthStore = useAuthStore()
const {data: gameData, isLoading: gameIsLoading, getCollection: getGameCollection} = useCollections()
const {data: gameCommentsData, isLoading: commentsAreLoading, getCollection: getGameCommentsCollection} = useCollections()
const {data: developerGames, isLoading: gamesAreLoading, getCollection: getDeveloperGamesCollectio} = useCollections()
const props = defineProps({
    id: {type: String, required: true}
})

onMounted(async () => {
    getGameCollection({collectionName: 'games', expand: 'developerId', id: props.id})
    getGameCommentsCollection({collectionName: 'games', expand: 'userId', id: `${props.id}/comments`})
    watch(gameData, ()=>{
        getDeveloperGamesCollectio({collectionName: 'developers', id: `${gameData.value.developerId._id}/games`})
    }, {once: true})
})
const smallDeveloperGame = computed(() => 
    Array.isArray(developerGames.value) ? developerGames.value.slice(0, 5) : []
);
</script>

<template>

<div class="block mx-auto flex mt-5">
    <div class="flex gameInfo flex-col">
        <div v-if="!gameIsLoading" class="flex">
            <img  class="bigImgDisplay" :src="prepareImageSrc((gameData as Game).photo)">
            <div class="ml-5 flex flex-col break-all">
                <div class="text-4xl">
                    <a>{{ gameData.title }}</a>
                </div>
                <a class="mt-2">Genre: {{ (gameData as Game).genre }}</a>
                <a class="mt-2">Platform: {{ (gameData as Game).platform }}</a>
                <a class="mt-2">Language: {{ (gameData as Game).language }}</a>
                <a class="mt-2">PlayerType: {{ (gameData as Game).playerType }}</a>
                <a class="mt-2">Controller Support: {{ (gameData as Game).controllerSupport }}</a>
                <a class="mt-2">Developer: {{ (gameData as Game).developerId.name }}</a>
                <div class="mt-2  pr-20" style="white-space: pre-wrap;">
                    <a class="">Description: {{ gameData.description }} </a>
                </div>
            </div>
        </div>
        <div v-if="!gameIsLoading && (AuthStore.isAdmin() || (AuthStore.isDev() && (gameData as Game).developerId.userId === AuthStore.currentUser?._id))" class="flex mt-5">
            <button class="button float-right mr-4 rounded-xl  w-36 h-12 text-xl">Edit</button>
            <button class="delete float-right ml-4 rounded-xl  w-36 h-12 text-xl">Delete</button>
        </div>
        <div  v-if="!commentsAreLoading" class="mb-20">
            <div  class="text-2xl mt-4 mb-2">
                <a>Comments: </a>
            </div>
            <CommentDisplay class="commentField rounded-ml"  :comments="gameCommentsData"></CommentDisplay>
        </div>
    </div>
    <div class="gameCol p-6 ml-6  float-right w-12 h-12">
        <div  class="break-all   mb-4 text flex flex-col">
            <a v-if="!gameIsLoading" class="text-2xl">{{(gameData as Game).developerId.name}}</a>
            <a>Other Games</a>
        </div>
        <div class="text flex justify-center">
            <GamesGridDisplay v-if="!gamesAreLoading" :games="smallDeveloperGame" :class="'justify-items-center commentField  pt-6 gameCol'"></GamesGridDisplay>
        </div>
        
    </div>
</div>

</template>

<style scoped>

.gameCol{
    width: 250px;
}
.gameInfo{
    width: 1200px;
}
.commentField{
    background-color: rgb(54, 47, 80);
}
.text{
    width: 400px;
}




</style>