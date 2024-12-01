<script setup lang="ts">
import { Form } from 'vee-validate';
import Select from '../Select.vue';
import Input from '../Input.vue';
import FileInput from '../FileInput.vue';
import { editComment } from '@/validation/validationShemas';
import { useCollectionsUpdater } from '@/composables/postData';
import { useModalStore } from '@/stores/ModalStore';
import { onMounted } from 'vue';
import { useCollections } from '@/composables/getData';
import { type Comment } from '@/types/Comment';
import { useAuthStore } from '@/stores/AuthStore';
import NoDataFoundDisplay from '../displays/NoDataFoundDisplay.vue';
const {data, isLoading, getCollection, totalCount} = useCollections()
const props = defineProps({
    id: {type: String, required: true}
})
const {updateModalData} = useCollectionsUpdater(`comments/${props.id}`)
onMounted(()=>{
    getCollection({collectionName: 'comments', id: `${props.id}`})
})

function onSubmit(values: any){
    updateModalData({title: values.commentTitle, body: values.commentBody, gameId: data.value.gameId, userId: useAuthStore().isUserLoggedIn()?useAuthStore().currentUser?._id:''
    }, 'Comment successifuly updated.', 'comment')
    useModalStore().ResetModal()
}
</script>

<template>
<div style="min-width: 800px; min-height: 500px;" class="purple p-16">
    <div  class="flex flex-col">
        <div>
            <a class="text-4xl">Edit comment</a>
        </div>
        <Form @submit="onSubmit" :validation-schema="editComment">
            <Input v-if="!isLoading" :value="data.title" class="mt-2" :place-holder="'Title'" :name="'commentTitle'" :label="'Title'"></Input>
            <Input v-if="!isLoading" class="mt-2" :value="(data as Comment).body" :is-text-area="true" :type="'textarea'" :place-holder="'Leave a comment...'"  :name="'commentBody'" :label="'Body'"></Input>
            <div v-if="!isLoading" class="w-full mt-5 flex justify-center">
                <button class="button w-auto h-auto justify-center items-center" type="submit">Submit updated comment</button>
            </div>
        </Form>
        <NoDataFoundDisplay class="mt-10" v-if=" totalCount == 0"></NoDataFoundDisplay>
    </div>
</div>

</template>

<style scoped>

</style>