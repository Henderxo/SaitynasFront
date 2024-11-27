<script setup lang="ts">
import { onMounted } from 'vue';
import { useCollections } from '@/composables/getData';
import GamesGridDisplay from '@/components/displays/GamesGridDisplay.vue';
const {data: developerData, isLoading: developerIsLoading, getCollection: getDeveloperCollection} = useCollections()
const {data, isLoading, getCollection} = useCollections()
const props = defineProps({
    id: {type: String}
})

onMounted(async () => {
    getDeveloperCollection({collectionName: 'developers', expand: 'userId', id: props.id})
    getCollection({collectionName: 'developers', id: `${props.id}/games`})
})

</script>

<template>

<div class="block items-center justify-center mx-auto max-w-6xl">
    <div>
        <div v-if="!developerIsLoading">{{ developerData.name }}</div>
    </div>
    <GamesGridDisplay v-if="!isLoading" :games="data"></GamesGridDisplay>
</div>

</template>

<style scoped>




</style>