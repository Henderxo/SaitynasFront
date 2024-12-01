<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { prepareImageSrc } from '@/utils/imageUtils';
import { ref } from 'vue'
import Menu from './Menu.vue';
import { useModalStore } from '@/stores/ModalStore';
import EditUserProfile from './modals/EditUserProfile.vue';
const isMenuOpen = ref(false)
function toggleMenu(){
  isMenuOpen.value = !isMenuOpen.value
}
function logOut(){
  toggleMenu()
  useAuthStore().logUserOut()
}
function editProfile(){
  toggleMenu()
  if(useAuthStore().isUserLoggedIn()){
    useModalStore().SetModal({component: EditUserProfile, componentProps: {id: useAuthStore().currentUser?._id}})
  }
}

</script>

<template>

<div v-if="!$route.meta.hideNavbar" class="topnav fixed bg-gradient-to-r from-orange-500 to-yellow-500 shadow-lg z-10 shadow-orange-500/50">
    <div class="font-bold ZZZ">
        <RouterLink class="flex justify-center items-center" :to="{name: 'home'}">Developers</RouterLink>
        <RouterLink class="flex justify-center items-center" :to="{name: 'games'}">Games</RouterLink>
        <RouterLink v-if="useAuthStore().isAdmin()" class="flex justify-center items-center" :to="{name: 'users'}">Users</RouterLink>
        <RouterLink v-if="useAuthStore().isDev() || useAuthStore().isAdmin()" class="flex justify-center items-center" :to="{name: 'dev'}">Your Developers</RouterLink>
      </div>
    <div v-if="!useAuthStore().isUserLoggedIn()" class="float-end font-bold">
        <RouterLink class="float-end flex justify-center items-center" :to="{name: 'login'}">Login</RouterLink>
    </div>
    <div style="min-width: 100px ;" v-else class="icon flex justify-center items-center w-36 float-end">
        <img @click.stop="toggleMenu()" v-if="!useAuthStore().currentUser?.photo"class="profileIcon w-12 rounded-full" src="@/assets/icons/userIcon.png">
        <img @click.stop="toggleMenu()" v-else class="profileIcon w-12 rounded-full" :src="prepareImageSrc((useAuthStore().currentUser?.photo as string))">
    </div> 
    
</div>
<Transition name="bounce">
  <Menu  v-if="isMenuOpen && useAuthStore().isUserLoggedIn()" @remove-menu="toggleMenu()" @editProfile="editProfile()" @logout="logOut()"></Menu>
</Transition>
</template>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
.icon{
    height: 75px;
}
.profileIcon{
    background-color: blanchedalmond;
}
.topnav {
  width: 100%;
  overflow: hidden;
  min-width: 100px;

}
.topnav a {
  float: left;
  color: #f2f2f2;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  height: 75px;
  width: 200px;
}
.topnav a:hover {
  background-color: #ecc08d;
  color: #000000;
}

.topnav a.active {
  background-color: #ecc08d;
  color: #000000;
}

@media (max-width: 1000px) {
  .topnav a {
    width: 125px;
  }
}

@media (max-width: 750px) {
  .topnav .ZZZ {
    display: none;
  }
}


</style>