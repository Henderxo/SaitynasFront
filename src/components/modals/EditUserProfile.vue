<script setup lang="ts">
import { Form } from 'vee-validate';
import Input from '../Input.vue';
import FileInput from '../FileInput.vue';
import {  editProfile } from '@/validation/validationShemas';
import { useCollectionsUpdater } from '@/composables/postData';
import { useModalStore } from '@/stores/ModalStore';
import { useCollections } from '@/composables/getData';
import { onMounted } from 'vue';
import type { User } from '@/types/User';
import NoDataFoundDisplay from '../displays/NoDataFoundDisplay.vue';
const props = defineProps({
    id: {type: String, required: true}
})
const {data, isLoading, getCollection, totalCount} = useCollections()
onMounted(()=>{
    getCollection({collectionName: 'users', id: `${props.id}`})
})
const { updateModalData } = useCollectionsUpdater(`users/${props.id}`)
function onSubmit(values: any){
    updateModalData({ username: values.username, email: values.email, password: values.password??'', type: data.value.type,
        photo: values.photo??data.value.photo
    }, 'User successifuly created.')
    useModalStore().ResetModal()
}
</script>

<template>
<div style="min-width: 800px; min-height: 500px;" class="purple p-16">
    <div class="flex flex-col">
        <div>
            <a class="text-4xl">Update profile</a>
        </div>
        <Form @submit="onSubmit" :validation-schema="editProfile">
            <div v-if="!isLoading" class="flex">
                <div class="w-full mr-2">
                    <Input class="mt-2" :value="(data as User).username" :place-holder="'Username...'"   :name="'username'" :label="'Username'"></Input>
                    <Input class="mt-2" :value="(data as User).email" :place-holder="'Email...'"  :name="'email'" :label="'Email'"></Input>
                    <Input class="mt-2" :right-icon="'https://cdn-icons-png.flaticon.com/512/65/65000.png'" :left-icon="'https://cdn-icons-png.flaticon.com/512/61/61457.png'" :type="'password'"  :place-holder="'New password...'"  :name="'password'" :label="'New password'"></Input>
                </div>
            </div>
            <FileInput v-if="!isLoading" class="mt-2" :name="'photo'" :accept="'image/*'" :placeholder="'Add photo'" :label="''"> </FileInput>    
            <div v-if="!isLoading"  class="w-full mt-5 flex  justify-center">
                <button class="button w-auto h-auto justify-center items-center" type="submit">Update profile</button>
            </div>
            <NoDataFoundDisplay class="mt-10" v-if=" totalCount == 0"></NoDataFoundDisplay>
        </Form>
    </div>
</div>

</template>

<style scoped>

</style>