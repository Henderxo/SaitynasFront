<script setup lang="ts">
import { onMounted } from 'vue';
import { useCollections } from '@/composables/getData';
const {data: gameData, isLoading: gameIsLoading, getCollection: getGameCollection} = useCollections()
const {data, isLoading, getCollection} = useCollections()
const props = defineProps({
    id: {type: String}
})

onMounted(async () => {
    getGameCollection({collectionName: 'games', expand: 'developerId', id: props.id})
})

</script>

<template>

<div class="block items-center justify-center mx-auto max-w-6xl">
    <div>
        <div v-if="!gameIsLoading">{{ gameData.title }}</div>
    </div>

    
</div>

</template>

<style scoped>




</style>