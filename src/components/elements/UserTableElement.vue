<script setup lang="ts">
import { type User } from '@/types/User';
import type { PropType } from 'vue';
const props = defineProps({
    user: {type: Object as PropType<User>, required: true}
})
</script>

<template>
<div style="padding-top: 5px; padding-bottom: 5px; max-width: 1600px; max-height: 100px"  class=" text flex text-center border-b grid grid-cols-4 gap-4 " >
    <div class="pl-2 pr-2 line-clamp-4"><a>{{ user.username }}</a></div>
    <div class="pl-2 pr-2 line-clamp-4"><a>{{ user.email }}</a></div>
    <div class="pl-2 pr-2 line-clamp-4"><a>{{ user.created_at }}</a></div>
    <div class="pl-2 pr-2 line-clamp-4"><a>{{ user.type }}</a></div>
</div>  
</template>

<style scoped>
.text{
    word-break: break-word; 
    overflow-wrap: break-word; 
}

</style>