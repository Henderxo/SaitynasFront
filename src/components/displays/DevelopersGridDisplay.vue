<script setup lang="ts">
import { type Developer } from '@/types/Developer';
import type { PropType } from 'vue';
import GridElement from '../elements/GridElement.vue';
const props = defineProps({
    developers: {type: Object as PropType<Developer[]>, required: true}
})
</script>

<template>
<div class="data-block overflow-auto grid grid-cols-4 gap-10 justify-items-center">
        <div v-for="developer in developers" :key="(developer.id as string)">
            <GridElement :developer="developer"></GridElement>
        </div>
    </div>
</template>

<style scoped>

</style>