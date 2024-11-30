<script setup lang="ts">
import { Form } from 'vee-validate';
import Select from '../Select.vue';
import Input from '../Input.vue';
import FileInput from '../FileInput.vue';
import {  createUser } from '@/validation/validationShemas';
import { useCollectionsUpdater } from '@/composables/postData';
import { useModalStore } from '@/stores/ModalStore';
import {  userTypes } from '@/enums/enums';
const { postModalData } = useCollectionsUpdater('users')
function onSubmit(values: any){
    postModalData({ username: values.username, email: values.email, password: values.password, type: values.userType,
        photo: values.photo
    }, 'User successifuly created.')
    useModalStore().ResetModal()
}
</script>

<template>
<div style="min-width: 800px; min-height: 500px;" class="purple p-16">
    <div class="flex flex-col">
        <div>
            <a class="text-4xl">Create a new user</a>
        </div>
        <Form @submit="onSubmit" :validation-schema="createUser">
            <div class="flex">
                <div class="w-full mr-2">
                    <Input class="mt-2"  :place-holder="'Username...'"   :name="'username'" :label="'Username'"></Input>
                    <Input class="mt-2" :place-holder="'Email...'"  :name="'email'" :label="'Email'"></Input>
                    <Input class="mt-2 " :type="'password'":right-icon="'https://cdn-icons-png.flaticon.com/512/65/65000.png'" :left-icon="'https://cdn-icons-png.flaticon.com/512/61/61457.png'" :place-holder="'Password...'"  :name="'password'" :label="'Password'"></Input>
                    <Select class="mt-2" :name="'userType'" :default-values="Object.values(userTypes)" :place-holder="'Select user type...'" :label="'User type'" :showing="'userTypes'" ></Select>
                </div>
            </div>
            <FileInput class="mt-2" :name="'photo'" :accept="'image/*'" :placeholder="'Add photo'" :label="''"> </FileInput>    
            <div class="w-full mt-5 flex  justify-center">
                <button class="button w-auto h-auto justify-center items-center" type="submit">Create new user</button>
            </div>
        </Form>
    </div>
</div>

</template>

<style scoped>

</style>