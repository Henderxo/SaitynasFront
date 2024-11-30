<script setup lang="ts">
import type { PropType } from 'vue';
import { type Comment } from '@/types/Comment';
import CommentElement from '../elements/CommentElement.vue';
const props = defineProps({
    comments: {type: Object as PropType<Comment[]>, required: true}
})
</script>

<template>
<div class="">
        <div v-for="comment in comments" :key="(comment._id as string)">
            <CommentElement :comment="comment"></CommentElement>
        </div>
    </div>
</template>

<style scoped>
.data-block{
    width: 1200px;
}
</style>