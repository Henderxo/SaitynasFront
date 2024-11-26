<script setup lang="ts">
import { type Developer } from '@/types/Developer';
import type { PropType } from 'vue';
const props = defineProps({
    developer: {type: Object as PropType<Developer>, required: true}
})
</script>

<template>
    <div style="padding: 15px; width: 315px; height: 225px; overflow: hidden;  text-overflow: ellipsis;" class="border-r border-b-1 shadow-xl">
        <div>
            <a>{{ developer.name }}</a>
        </div>
    </div>
</template>

<style scoped>
.truncate {   
    white-space: nowrap;  
    overflow: hidden;          
    text-overflow: ellipsis; 
    max-width: 340px;
}

</style>