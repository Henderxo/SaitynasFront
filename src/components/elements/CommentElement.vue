<script setup lang="ts">
import { type Game } from '@/types/Game';
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';
import { type Comment } from '@/types/Comment';
import { prepareImageSrc } from '@/utils/imageUtils';
import { timeSince } from '@/utils/timeUtils';
const props = defineProps({
    comment: {type: Object as PropType<Comment>, required: true}
})
const router = useRouter()
</script>

<template>
    <div style="min-height: 50px;" class="w-full flex p-2">
        <div class="iconer mr-2 ml-0 w-12 h-12">
            <img class="w-12 h-12 rounded-full"  v-if="comment.userId.photo" :src="prepareImageSrc(comment.userId.photo)">
            <img class="w-12 h-12 rounded-full" v-else  src="@/assets/icons/userIcon.png">
        </div>
        <div class="flex flex-col">
            <div class="flex">
                <a class="">{{ comment.userId.username }}</a>
                <div class="ml-5 ">
                    <a class="text-xs time"> {{ timeSince(comment.created_at as string) }}</a>
                </div>
            </div>
            <div class="commentBody mt-1 break-all  pr-4">
                <a>{{ comment.body }} </a>
            </div>  
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