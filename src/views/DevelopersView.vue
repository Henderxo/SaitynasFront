<script setup lang="ts">
import { onMounted } from 'vue';
import { useCollections } from '@/composables/getData';
import DevelopersGridDisplay from '@/components/displays/DevelopersGridDisplay.vue';
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';

const {data, isLoading, getCollection} = useCollections()

onMounted(async () => {
    getCollection({collectionName: 'developers', expand: 'userId'})
})
</script>

<template>

<div class="block items-center justify-center mx-auto max-w-6xl">
    <div>
        <div class="flex mt-2 mb-5">
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