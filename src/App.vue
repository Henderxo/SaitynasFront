<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Modal from './components/Modal.vue';
import NotificationDisplay from './components/displays/NotificationDisplay.vue';
import Menu from './components/Menu.vue';
</script>

<template>
  <main>
    <header>
    <NavBar></NavBar>
    <Modal></Modal>
  </header>
  <div class="pt-20 pb-10">
    <NotificationDisplay></NotificationDisplay>
    <RouterView />
  </div>
  
  </main>
  
</template>

<style>
main{
  background-color: rgb(28, 25, 43);
  min-height: 100vh;
  height: auto;
}
a{
 color:aliceblue 
}
html, body {
  margin: 0; /* Remove default margin from body */
  height: 100%; /* Ensure the body stretches to match content */
}

body {
  background-color: rgb(28, 25, 43); /* Apply same background to prevent white gaps */
}
</style>
