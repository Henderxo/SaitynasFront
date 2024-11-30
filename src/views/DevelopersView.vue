<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useCollections } from '@/composables/getData';
import DevelopersGridDisplay from '@/components/displays/DevelopersGridDisplay.vue';
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useModalStore } from '@/stores/ModalStore';
import CreateDeveloper from '@/components/modals/CreateDeveloper.vue';

const {data, isLoading, getCollection, totalCount} = useCollections()

onMounted(async () => {
    getCollection({collectionName: 'developers', expand: 'userId'})
    
})

watch(useModalStore().isTrigger, ()=>{
    getCollection({collectionName: 'developers', expand: 'userId'})
})

</script>

<template>
<div class="block items-center justify-center mx-auto max-w-6xl">
    <div>
        <div class="flex justify-between items-center mt-2 mb-5">
            <a class="text-4xl">Developers</a>
            <button @click="useModalStore().SetModal({component: CreateDeveloper})" v-if="useAuthStore().isAdmin()" class="rounded-xl px-4 h-12 text-xl button">Add a new Developer</button>
        </div>
        <div class="">
            <DevelopersGridDisplay v-if="!isLoading && totalCount != 0" :developers="data"></DevelopersGridDisplay>
            <NoDataFoundDisplay class="mt-10" v-else-if=" totalCount == 0"></NoDataFoundDisplay>
        </div>
    </div>
</div>

</template>

<style scoped>




</style>