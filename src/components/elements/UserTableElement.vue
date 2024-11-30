<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { useModalStore } from '@/stores/ModalStore';
import { type User } from '@/types/User';
import type { PropType } from 'vue';
import EditUser from '../modals/EditUser.vue';
import DeleteUser from '../modals/DeleteUser.vue';
const props = defineProps({
    user: {type: Object as PropType<User>, required: true}
})
</script>

<template>
<div style="padding-top: 5px; padding-bottom: 5px; max-width: 1600px; max-height: 100px"  class=" text flex text-center border-b grid grid-cols-5 gap-4 " >
    <div class="pl-2 pr-2 line-clamp-4 flex justify-center items-center"><a>{{ user.username }}</a></div>
    <div class="pl-2 pr-2 line-clamp-4 flex justify-center items-center"><a>{{ user.email }}</a></div>
    <div class="pl-2 pr-2 line-clamp-4 flex justify-center items-center"><a>{{ user.created_at }}</a></div>
    <div class="pl-2 pr-2 line-clamp-4 flex justify-center items-center"><a>{{ user.type }}</a></div>
    <div class="flex justify-center items-center">
        <button @click="useModalStore().SetModal({component: EditUser, componentProps: {id:user._id}})" v-if="useAuthStore().isAdmin()" class="button mr-2">Edit</button>
        <button @click="useModalStore().SetModal({component: DeleteUser, componentProps: {id:user._id}})" v-if="useAuthStore().isAdmin()" class="delete ml-2">Delete</button>
    </div>
</div>  
</template>

<style scoped>
.text{
    word-break: break-word; 
    overflow-wrap: break-word; 
}

</style>