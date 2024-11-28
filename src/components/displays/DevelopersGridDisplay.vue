<script setup lang="ts">
import { type Developer } from '@/types/Developer';
import type { PropType } from 'vue';
import GridElement from '../elements/GridElement.vue';
const props = defineProps({
    developers: {type: Object as PropType<Developer[]>, required: true},
    class: {type: String, default: 'data-block overflow-auto grid grid-cols-8 gap-5 justify-items-center'}
})
</script>

<template>
<div :class="`${props.class}`">
        <div v-for="developer in developers" :key="(developer._id as string)">
            <GridElement :developer="developer"></GridElement>
        </div>
    </div>
</template>

<style scoped>

</style>