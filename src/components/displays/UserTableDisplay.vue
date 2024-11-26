<script setup lang="ts">
import { type User } from '@/types/User';
import type { PropType } from 'vue';
import UserTableElement from '../elements/UserTableElement.vue';
const props = defineProps({
    users: {type: Object as PropType<User[]>, required: true}
})
</script>

<template>
<div class=" border-l border-r border-b-1 shadow-xl">
        <div  style="padding: 5px; max-width: 1400px;" class="max-w-full border-b grid grid-cols-4 gap-4 justify-items-center font-bold" >
            <div class="">Username</div>
            <div class="">Email</div>
            <div class="">Created</div>
            <div class="">Type</div>
        </div>
        <div class="data-block overflow-auto">
            <div class="" v-for="user in users" :key="(user.id as string)">
                <UserTableElement :user="user"></UserTableElement>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>