<script setup lang="ts">
import { type Game } from '@/types/Game';
import type { PropType } from 'vue';
import GameGridElement from '../elements/GameGridElement.vue';
const props = defineProps({
    games: {type: Object as PropType<Game[]>, required: true}
})


</script>

<template>
<div class="data-block overflow-auto grid grid-cols-8 gap-5 justify-items-center">
        <div v-for="game in games" :key="(game._id as string)">
            <GameGridElement :game="game"></GameGridElement>
        </div>
    </div>
</template>

<style scoped>

</style>