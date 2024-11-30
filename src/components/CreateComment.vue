<script setup lang="ts">
import { useRouter } from 'vue-router';
import { prepareImageSrc } from '@/utils/imageUtils';
import { useAuthStore } from '@/stores/AuthStore';
import { Form } from 'vee-validate';
import Input from './Input.vue';
import { createComment } from '@/validation/validationShemas';
import { useCollectionsUpdater } from '@/composables/postData';
const router = useRouter()
const {postModalData} = useCollectionsUpdater('comments')
const props = defineProps({
    id: {type: String, required: true}
})
function onSubmit(values: any){
    postModalData({title: values.commentTitle, body: values.commentBody, gameId: props.id},
    'Comment successifuly created.')
}

function doForward(){
    useAuthStore().isUserLoggedIn()?null:router.push({name: 'login'})
}
</script>

<template>
    <div style="min-height: 50px;" class="w-full flex p-2 mb-5">
        <div class="iconer mr-2 ml-0 w-12 h-12">
            <img v-if="useAuthStore().isUserLoggedIn() && useAuthStore().currentUser.photo" class="w-12 h-12 rounded-full"  :src="prepareImageSrc(useAuthStore().currentUser.photo)">
            <img v-else class="w-12 h-12 rounded-full"  src="@/assets/icons/userIcon.png">
        </div>
        <div>
            <a v-if="!useAuthStore().isUserLoggedIn()">You must <button @click="router.push({name: 'login'})" style="color: orange;">login</button> to post a comment</a>
            <div class="flex flex-col" style="width: 1000px">
                <Form @submit="onSubmit" :validation-schema="createComment">
                    <div @click="doForward"><Input  style="width: 300px;" class="mt-2 darkPurple" :place-holder="'Title'" :name="'commentTitle'"></Input></div>
                    <div @click="doForward"><Input :rows="'4'" class="mt-2 darkPurple" :is-text-area="true" :type="'textarea'" :place-holder="'Leave a comment'"  :name="'commentBody'"></Input> </div>
                </Form>
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