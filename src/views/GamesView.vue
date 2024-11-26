<script setup lang="ts">
import { onMounted } from 'vue';
import { useCollections } from '@/composables/getData';
import GamesGridDisplay from '@/components/displays/GamesGridDisplay.vue';

const {data, isLoading, getCollection} = useCollections()

onMounted(async () => {
    getCollection({collectionName: 'games', expand: 'developerId'})
})
</script>

<template>

<div class="flex flex-col items-center justify-center mt-10">
    <div>
        <div class="flex items-center mt-2 mb-2">
            <a class="text-4xl">Games</a>
        </div>
        <div class="">
            <GamesGridDisplay v-if="!isLoading" :games="data"></GamesGridDisplay>
        </div>
    </div>
    
</div>

</template>

<style scoped>




</style>