<script setup lang="ts">
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';
import { type Comment } from '@/types/Comment';
import { prepareImageSrc } from '@/utils/imageUtils';
import { timeSince } from '@/utils/timeUtils';
import { useAuthStore } from '@/stores/AuthStore';
import { useModalStore } from '@/stores/ModalStore';
import EditComment from '../modals/EditComment.vue';
import DeleteComment from '../modals/DeleteComment.vue';
import type { User } from '@/types/User';
const props = defineProps({
    comment: {type: Object as PropType<Comment>, required: true}
        
})
const router = useRouter()
</script>

<template>
    <div style="min-height: 50px;" class="w-full flex p-2">
            <img class="w-12 h-12 rounded-full mr-2"  v-if="((comment as Comment).userId as User).photo" :src="prepareImageSrc(((comment as Comment).userId as User).photo)">
            <img class="w-12 h-12 rounded-full mr-2" v-else src="@/assets/icons/userIcon.png">
        <div class="flex flex-col">
            <div class="flex">
                <a class="">{{ ((comment as Comment).userId as User).username }}</a>
                <div class="ml-5">
                    <a class="text-xs time w-full"> {{ timeSince(comment.created_at as string) }}</a>
                </div>
            </div>
            <div style="white-space: pre-wrap;" class="commentBody mt-1 break-all flex flex-col  pr-4">
                <a class="text-lg" >{{ comment.title }}</a>
                <a>{{ comment.body }} </a>
            </div>  
        </div>
        <div class="flex ml-auto justify-center items-center">
            <button @click="useModalStore().SetModal({component: EditComment, componentProps: {id: props.comment._id}})" v-if="useAuthStore().isUserLoggedIn() && (useAuthStore().currentUser?._id === ((comment as Comment).userId as User)._id || useAuthStore().isAdmin())" class="button mr-2">Edit</button>
            <button @click="useModalStore().SetModal({component: DeleteComment, componentProps: {id: props.comment._id}})" v-if="useAuthStore().isUserLoggedIn() && (useAuthStore().currentUser?._id === ((comment as Comment).userId as User)._id || useAuthStore().isAdmin())" class="delete mr-4">Delete</button>
        </div>
    </div>
</template>

<style scoped>
.truncate {   
    white-space: nowrap;  
    overflow:hidden;          
    text-overflow: ellipsis; 
    max-width: 200px;
}
.time{
    color: grey
}
.commentBody a{
    color: rgb(194, 194, 194);
}
.iconer{
    width: 50px;
}

</style>