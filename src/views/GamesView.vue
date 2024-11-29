<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useCollections } from '@/composables/getData';
import GamesGridDisplay from '@/components/displays/GamesGridDisplay.vue';
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useModalStore } from '@/stores/ModalStore';
import CreateGame from '@/components/modals/CreateGame.vue';
const {data, isLoading, getCollection, totalCount} = useCollections()

onMounted(async () => {
    getCollection({collectionName: 'games', expand: 'developerId'})
})
watch(useModalStore().isTrigger, ()=>{
    getCollection({collectionName: 'games', expand: 'developerId'})
})
</script>

<template>

<div class="block items-center justify-center mx-auto max-w-6xl">
    <div>
        <div class="flex justify-between items-center mt-2 mb-5">
            <a class="text-4xl">Games</a>
            <button @click="useModalStore().SetModal({component: CreateGame})" v-if="useAuthStore().isAdmin() || useAuthStore().isDev()" class=" z-10 rounded-xl px-4 h-12 text-xl button">Add a new Game</button>
        </div>
        <div class="">
            <GamesGridDisplay v-if="!isLoading && totalCount != 1" :games="data"></GamesGridDisplay>
            <NoDataFoundDisplay v-else-if="!isLoading && totalCount == 0"></NoDataFoundDisplay>
        </div>
    </div>
</div>

</template>

<style scoped>




</style>