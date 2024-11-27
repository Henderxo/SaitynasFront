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
        <div  style="padding: 5px; max-width: 1600px;" class="rat bg-orange-600 max-w-full border-b border-t grid grid-cols-4 justify-items-center font-bold" >
            <div class=""><a>Username</a></div>
            <div class=""><a>Email</a></div>
            <div class=""><a>Created</a></div>
            <div class=""><a>Type</a></div>
        </div>
        <div class="data-block overflow-auto">
            <div class="" v-for="user in users" :key="(user._id as string)">
                <UserTableElement :user="user"></UserTableElement>
            </div>
        </div>
    </div>
</template>

<style scoped>


</style>