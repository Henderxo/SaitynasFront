<script setup lang="ts">
import { onMounted } from 'vue';
import { useCollections } from '@/composables/getData';
import UserTableDisplay from '@/components/displays/UserTableDisplay.vue';

const {data, isLoading, getCollection} = useCollections()

onMounted(async () => {
    getCollection({collectionName: 'users'})
})
</script>

<template>

<div class="flex flex-col items-center justify-center mt-10">
    <div>
        <div class="flex items-center mt-2 mb-2">
            <a class="text-4xl">Users</a>
        </div>
        <div class="">
            <UserTableDisplay v-if="!isLoading" :users="data"></UserTableDisplay>
        </div>
    </div>
    
</div>

</template>

<style scoped>




</style>