<script setup lang="ts">
import { Form } from 'vee-validate';
import Select from '../Select.vue';
import Input from '../Input.vue';
import FileInput from '../FileInput.vue';
import { createGame } from '@/validation/validationShemas';
import { useCollectionsUpdater } from '@/composables/postData';
import { useModalStore } from '@/stores/ModalStore';
import { useAuthStore } from '@/stores/AuthStore';
import { gameGenres, playerTypes, gamePlatforms, controllerSupport } from '@/enums/enums';

const { postModalData } = useCollectionsUpdater('games')
const props = defineProps({
    devId: {type: String, required: true}
})


function onSubmit(values: any){
    postModalData({title: values.title, developerId: values.developer, genre: values.genre, language: values.language,
        platform: values.platform, controllerSupport: values.controllerSupport, playerType: values.playerType,
        description: values.description, photo: values.photo
    }, 'Game successifuly created.', 'game')
    useModalStore().ResetModal()
}
</script>

<template>
<div style="min-width: 800px; min-height: 500px;" class="purple p-16">
    <div class="flex flex-col">
        <div>
            <a class="text-4xl">Create a new game</a>
        </div>
        <Form @submit="onSubmit" :validation-schema="createGame">
            <div class="flex">
                <div class="w-full mr-2">
                    <Input class="mt-2"  :place-holder="'Enter title...'"   :name="'title'" :label="'Title'"></Input>
                    <Select class="mt-2" :value="devId" :name="'developer'" :collection-name="`users/${useAuthStore().currentUser?._id}/developers`" :place-holder="'Select developer...'" :label="'Developers'" :showing="'name'" ></Select>
                    <Select class="mt-2" :name="'genre'" :default-values="Object.values(gameGenres)" :place-holder="'Select genre...'" :label="'Genre'" :showing="'genre'" ></Select>
                </div>
                <div class="w-full ml-2">
                    <Input class="mt-2" :place-holder="'Enter language...'"  :name="'language'" :label="'Language'"></Input>
                    <Select class="mt-2" :name="'platform'" :default-values="Object.values(gamePlatforms)" :place-holder="'Select platform...'" :label="'Platform'" :showing="'genre'" ></Select>
                    <Select class="mt-2" :name="'controllerSupport'" :default-values="Object.values(controllerSupport)" :place-holder="'Select support...'" :label="'Controller support'" :showing="'support'" ></Select>
                </div>
            </div>
            <Select class="mt-2" :name="'playerType'" :default-values="Object.values(playerTypes)" :place-holder="'Select player type...'" :label="'Player type'" :showing="'playerType'" ></Select>
            <Input class="mt-2" :is-text-area="true" :type="'textarea'"   :place-holder="'Description...'"  :name="'description'" :label="'Description'"></Input>
            <FileInput class="mt-2" :name="'photo'" :accept="'image/*'" :placeholder="'Add photo'" :label="''"> </FileInput>    
            <div class="w-full mt-5 flex  justify-center">
                <button class="button w-auto h-auto justify-center items-center" type="submit">Create new game</button>
            </div>
        </Form>
    </div>
</div>

</template>

<style scoped>

</style>