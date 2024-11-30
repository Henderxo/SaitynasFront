<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useCollections } from '@/composables/getData';
import UserTableDisplay from '@/components/displays/UserTableDisplay.vue';
import CreateUser from '@/components/modals/CreateUser.vue';
import { useModalStore } from '@/stores/ModalStore';
import { useAuthStore } from '@/stores/AuthStore';
import NoDataFoundDisplay from '@/components/displays/NoDataFoundDisplay.vue';
const {data, isLoading, getCollection, totalCount} = useCollections()

onMounted(async () => {
    getCollection({collectionName: 'users'})
})
watch(useModalStore().isTrigger, ()=>{
    getCollection({collectionName: 'users'})
})
</script>

<template>

<div class="block items-center justify-center mx-auto max-w-6xl">
    <div>
        <div class="flex justify-between items-center mt-2 mb-2">
            <a class="text-white text-4xl">Users</a>
            <button v-if="useAuthStore().isAdmin()" @click="useModalStore().SetModal({component: CreateUser})" class="button">Add user</button>
        </div>
        <div class="">
            <UserTableDisplay v-if="!isLoading" :users="data"></UserTableDisplay>
            <NoDataFoundDisplay class="mt-10" v-else-if=" totalCount == 0"></NoDataFoundDisplay>
        </div>
    </div>
    
</div>

</template>

<style scoped>


</style>