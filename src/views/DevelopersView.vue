<script setup lang="ts">
import { onMounted } from 'vue';
import { useCollections } from '@/composables/getData';
import DevelopersGridDisplay from '@/components/displays/DevelopersGridDisplay.vue';

const {data, isLoading, getCollection} = useCollections()

onMounted(async () => {
    getCollection({collectionName: 'developers', expand: 'userId'})
})
</script>

<template>

<div class="flex flex-col items-center justify-center mt-10">
    <div>
        <div class="flex items-center mt-2 mb-2">
            <a class="text-4xl">Developers</a>
        </div>
        <div class="">
            <DevelopersGridDisplay v-if="!isLoading" :developers="data"></DevelopersGridDisplay>
        </div>
    </div>
    
</div>

</template>

<style scoped>




</style>