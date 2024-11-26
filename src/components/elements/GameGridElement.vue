<script setup lang="ts">
import { type Game } from '@/types/Game';
import type { PropType } from 'vue';
const props = defineProps({
    game: {type: Object as PropType<Game>, required: true}
})
</script>

<template>
    <div style="padding: 15px; width: 315px; height: 225px; overflow: hidden;  text-overflow: ellipsis;" class="border-r border-b-1 shadow-xl">
        <div>
            <a>{{ game.title }}</a>
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