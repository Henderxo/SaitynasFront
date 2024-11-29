<script setup lang="ts">
import Input from '@/components/Input.vue';
import { Form } from 'vee-validate';
import { loginShema } from '@/validation/validationShemas';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';

const router = useRouter()

function onSubmit(values: any): void{
    useAuthStore().logUserIn(values.email, values.password)
}
</script>

<template>
<div class=" background flex items-center justify-center h-full w-full">
    <div class="box purple p-10 flex-col flex items-center shadow-orange-500/50 shadow-[0px_0px_25px_10px_rgba(0,0,0,0.3)]">
        <div class="flex flex-col justify-items-center" style="width: 400px;">
            <Form @submit="onSubmit" :validation-schema="loginShema">
                <div class="flex justify-center">   
                    <a class="text-4xl">Login</a>
                </div>
                <div class="mt-2">
                    <Input :place-holder="'Enter email...'" :left-icon="'https://www.iconpacks.net/icons/1/free-mail-icon-142-thumb.png'" :name="'email'" :label="'Email'"></Input>
                </div>
                <div class="mt-2">
                    <Input :type="'password'" :place-holder="'Enter password...'" :left-icon="'https://cdn-icons-png.flaticon.com/512/61/61457.png'" :right-icon="'https://cdn-icons-png.flaticon.com/512/65/65000.png'" :name="'password'" :label="'Password'"></Input>
                </div>
                <div class="w-full flex justify-center" style="height: 80px;">
                    <button class="w-full rounded-xl mt-10" style="background-color: orange;" type="submit">Login</button>
                </div> 
            </Form>
            <div class="flex justify-center mt-5">
                <a>Dont have, an account? Create one here! <button style="color: orange" @click="router.push({name: 'register'})">Sign up.</button></a>
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