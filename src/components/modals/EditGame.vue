<script setup lang="ts">
import { Form } from 'vee-validate';
import Select from '../Select.vue';
import Input from '../Input.vue';
import FileInput from '../FileInput.vue';
import { editGame } from '@/validation/validationShemas';
import { useCollectionsUpdater } from '@/composables/postData';
import { useModalStore } from '@/stores/ModalStore';
import { useAuthStore } from '@/stores/AuthStore';
import { gameGenres, playerTypes, gamePlatforms, controllerSupport } from '@/enums/enums';
import { useCollections } from '@/composables/getData';
import { computed, onMounted } from 'vue';
import type { Game } from '@/types/Game';
import NoDataFoundDisplay from '../displays/NoDataFoundDisplay.vue';
const {data, isLoading, getCollection, totalCount} = useCollections()
const props = defineProps({
    id: {type: String, required: true}
})
const {updateModalData} = useCollectionsUpdater(`games/${props.id}`)
onMounted(()=>{
    getCollection({collectionName: 'games', id: `${props.id}`})
})
function onSubmit(values: any){
    updateModalData({title: values.title, developerId: values.developer, genre: values.genre, language: values.language,
        platform: values.platform, controllerSupport: values.controllerSupport, playerType: values.playerType,
        description: values.description, photo: values.photo??(data.value as Game).photo
    }, 'Game successifuly updated.', 'game')
    useModalStore().ResetModal()
}
const collection = computed(()=>{
    return useAuthStore().isAdmin()?`developers`:`users/${useAuthStore().currentUser?._id}/developers`
}) 
</script>

<template>
<div style="min-width: 800px; min-height: 500px;" class="purple p-16">
    <div class="flex flex-col">
        <div>
            <a class="text-4xl">Edit game</a>
        </div>
        <Form @submit="onSubmit" :validation-schema="editGame">
            <div v-if="!isLoading" class="flex">
                <div class="w-full mr-2">
                    <Input class="mt-2" :value="(data as Game).title " :place-holder="'Enter title...'"   :name="'title'" :label="'Title'"></Input>
                    <Select class="mt-2" :value="((data as Game).developerId as string)" :name="'developer'" :collection-name="collection" :place-holder="'Select developer...'" :label="'Developers'" :showing="'name'" ></Select>
                    <Select class="mt-2" :value="(data as Game).genre " :name="'genre'" :default-values="Object.values(gameGenres)" :place-holder="'Select genre...'" :label="'Genre'" :showing="'genre'" ></Select>
                </div>
                <div class="w-full ml-2">
                    <Input class="mt-2" :value="(data as Game).language " :place-holder="'Enter language...'"  :name="'language'" :label="'Language'"></Input>
                    <Select class="mt-2" :value="(data as Game).platform " :name="'platform'" :default-values="Object.values(gamePlatforms)" :place-holder="'Select platform...'" :label="'Platform'" :showing="'genre'" ></Select>
                    <Select class="mt-2" :value="(data as Game).controllerSupport.toString()" :name="'controllerSupport'" :default-values="Object.values(controllerSupport)" :place-holder="'Select support...'" :label="'Controller support'" :showing="'support'" ></Select>
                </div>
            </div>
            <Select v-if="!isLoading" class="mt-2" :value="(data as Game).playerType" :name="'playerType'" :default-values="Object.values(playerTypes)" :place-holder="'Select player type...'" :label="'Player type'" :showing="'playerType'" ></Select>
            <Input v-if="!isLoading" class="mt-2" :value="((data as Game).description as string)" :is-text-area="true" :type="'textarea'"   :place-holder="'Description...'"  :name="'description'" :label="'Description'"></Input>
            <FileInput v-if="!isLoading" class="mt-2" :name="'photo'" :accept="'image/*'" :placeholder="'Add photo'" :label="''"> </FileInput>    
            <div v-if="!isLoading" class="w-full mt-5 flex  justify-center">
                <button class="button w-auto h-auto justify-center items-center" type="submit">Submit updated game</button>
            </div>
        </Form>
        <NoDataFoundDisplay class="mt-10" v-if=" totalCount == 0"></NoDataFoundDisplay>
    </div>
</div>

</template>

<style scoped>

</style>