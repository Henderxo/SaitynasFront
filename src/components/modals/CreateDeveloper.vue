<script setup lang="ts">
import { Form } from 'vee-validate';
import Select from '../Select.vue';
import Input from '../Input.vue';
import FileInput from '../FileInput.vue';
import { createDeveloper } from '@/validation/validationShemas';
import { useCollectionsUpdater } from '@/composables/postData';
import { useModalStore } from '@/stores/ModalStore';
const {postModalData} = useCollectionsUpdater('developers')
function onSubmit(values: any){
    postModalData({name: values.developerName, founder: values.founder, founded: values.date, 
        headquarters: values.headquarters, userId: values.user, photo: values.photo, description: values.description
    }, 'Developer successifuly created.', 'developer')
    useModalStore().ResetModal()
}
</script>

<template>
<div style="min-width: 800px; min-height: 500px;" class="purple p-16">
    <div class="flex flex-col">
        <div>
            <a class="text-4xl">Create a new developer</a>
        </div>
        <Form @submit="onSubmit" :validation-schema="createDeveloper">
            <div class="flex">
                <div class="w-full mr-2">
                    <Select class="mt-2" :name="'user'" :collection-name="'users'" :place-holder="'Select user'" :label="'User'" :showing="'username'" ></Select>
                    <Input class="mt-2"  :place-holder="'Enter name...'"   :name="'developerName'" :label="'Name'"></Input>
                </div>
                <div class="w-full ml-2">
                    <Input class="mt-2" :place-holder="'Enter founder...'"  :name="'founder'" :label="'Founder'"></Input>
                    <Input class="mt-2" :type="'date'"  :place-holder="'Founded in...'"  :name="'date'" :label="'Founded'"></Input>
                </div>
            </div>
            <Input class="mt-2"  :place-holder="'Enter headquarters...'"  :name="'headquarters'" :label="'Headquarters'"></Input>
            <Input class="mt-2" :is-text-area="true" :type="'textarea'"   :place-holder="'Description...'"  :name="'description'" :label="'Description'"></Input>
            <FileInput class="mt-2" :name="'photo'" :accept="'image/*'" :placeholder="'Add photo'" :label="''"> </FileInput>    
            <div class="w-full mt-5 flex  justify-center">
                <button class="button w-auto h-auto justify-center items-center" type="submit">Create new developer</button>
            </div>
        </Form>
    </div>
</div>

</template>

<style scoped>

</style>