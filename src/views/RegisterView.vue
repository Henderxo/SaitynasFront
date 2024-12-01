<script setup lang="ts">
import Input from '@/components/Input.vue';
import { Form } from 'vee-validate';
import { createUserSimple, loginShema } from '@/validation/validationShemas';
import { useRouter } from 'vue-router';
import { useCollectionsUpdater } from '@/composables/postData';
import FileInput from '@/components/FileInput.vue';
import { useModalStore } from '@/stores/ModalStore';
const router = useRouter()
const {postModalData} = useCollectionsUpdater('users')
function onSubmit(values: any): void{
    postModalData({ username: values.username, email: values.email, password: values.password, type: 'guest',
        photo: values.photo
    }, 'User successifuly created.', '/login')
    useModalStore().ResetModal()
}
</script>

<template>
<div class=" background flex items-center justify-center h-full w-full">
    <div class="box purple p-10 flex-col flex items-center shadow-orange-500/50 shadow-[0px_0px_25px_10px_rgba(0,0,0,0.3)]">
        <div class="flex flex-col justify-items-center" style="width: 400px;">
            <Form @submit="onSubmit" :validation-schema="createUserSimple">
                <div class="flex justify-center">   
                    <a class="text-4xl">Register</a>    
                </div>
                <div class="mt-2">
                    <Input :type="'username'" :place-holder="'Enter new username...'" :left-icon="'https://cdn-icons-png.flaticon.com/512/2815/2815428.png'" :name="'username'" :label="'Username'"></Input>
                </div>
                <div class="mt-2">
                    <Input :place-holder="'Enter new email...'" :left-icon="'https://www.iconpacks.net/icons/1/free-mail-icon-142-thumb.png'" :name="'email'" :label="'Email'"></Input>
                </div>
                <div class="mt-2">
                    <Input :type="'password'" :place-holder="'Enter new password...'" :left-icon="'https://cdn-icons-png.flaticon.com/512/61/61457.png'" :right-icon="'https://cdn-icons-png.flaticon.com/512/65/65000.png'" :name="'password'" :label="'Password'"></Input>
                </div>
                <FileInput class="mt-2" :name="'photo'" :accept="'image/*'" :placeholder="'Add photo'" :label="''"> </FileInput>    
                <div class="w-full flex justify-center" style="height: 80px;">
                    <button class="w-full rounded-xl text-lg mt-10" style="background-color: orange;" type="submit">Sign up</button>
                </div> 
            </Form>
            <div class="flex justify-center mt-5">
                <a>Already have an account? <button style="color: orange" @click="router.push({name: 'login'})">Sign in.</button></a>
            </div>
        </div>
    </div>
</div>

</template>

<style scoped>
.box{
    width: 600px;
    height: 750px
}




</style>