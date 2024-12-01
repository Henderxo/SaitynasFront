<script setup lang="ts">
import { Form } from 'vee-validate';
import Select from '../Select.vue';
import Input from '../Input.vue';
import FileInput from '../FileInput.vue';
import { editDeveloper } from '@/validation/validationShemas';
import { useCollectionsUpdater } from '@/composables/postData';
import { useModalStore } from '@/stores/ModalStore';
import { onMounted } from 'vue';
import { useCollections } from '@/composables/getData';
import type { Developer } from '@/types/Developer';
import NoDataFoundDisplay from '../displays/NoDataFoundDisplay.vue';
const {data, isLoading, getCollection, totalCount} = useCollections()
const props = defineProps({
    id: {type: String, required: true}
})
const {updateModalData} = useCollectionsUpdater(`developers/${props.id}`)
onMounted(()=>{
    getCollection({collectionName: 'developers', expand: 'userId', id: `${props.id}`})
})

function onSubmit(values: any){
    updateModalData({name: values.developerName, founder: values.founder, founded: values.date, 
        headquarters: values.headquarters, userId: values.user, photo: values.photo??(data.value as Developer).photo, description: values.description
    }, 'Developer successifuly updated.', 'developer')
    useModalStore().ResetModal()
}
</script>

<template>
<div style="min-width: 800px; min-height: 500px;" class="purple p-16">
    <div  class="flex flex-col">
        <div>
            <a class="text-4xl">Edit developer</a>
        </div>
        <Form @submit="onSubmit" :validation-schema="editDeveloper">
            <div v-if="!isLoading" class="flex">
                <div class="w-full mr-2">
                    <Select class="mt-2" :value="((data as Developer).userId._id as string)" :name="'user'" :collection-name="'users'" :place-holder="'Select user'" :label="'User'" :showing="'username'" ></Select>
                    <Input class="mt-2" :value="(data as Developer).name" :place-holder="'Enter name...'"   :name="'developerName'" :label="'Name'"></Input>
                </div>
                <div class="w-full ml-2">
                    <Input class="mt-2" :value="(data as Developer).founder" :place-holder="'Enter founder...'"  :name="'founder'" :label="'Founder'"></Input>
                    <Input class="mt-2" :value="(((data as Developer).founded as string).slice(0, 10))" :type="'date'"  :place-holder="'Founded in...'"  :name="'date'" :label="'Founded'"></Input>
                </div>
            </div>
            <Input v-if="!isLoading" class="mt-2" :value="(data as Developer).headquarters" :place-holder="'Enter headquarters...'"  :name="'headquarters'" :label="'Headquarters'"></Input>
            <Input v-if="!isLoading" class="mt-2" :value="(data as Developer).description" :is-text-area="true" :type="'textarea'"   :place-holder="'Description...'"  :name="'description'" :label="'Description'"></Input>
            <FileInput v-if="!isLoading" class="mt-2" :name="'photo'" :accept="'image/*'" :placeholder="'Add a new photo'" :label="''"> </FileInput>    
            <div v-if="!isLoading"  class="w-full mt-5 flex  justify-center">
                <button class="button w-auto h-auto justify-center items-center" type="submit">Submit updated developer</button>
            </div>
        </Form>
        <NoDataFoundDisplay class="mt-10" v-if=" totalCount == 0"></NoDataFoundDisplay>
    </div>
</div>

</template>

<style scoped>

</style>