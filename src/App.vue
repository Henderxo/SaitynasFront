<script setup lang="ts">
import NavBar from './components/NavBar.vue';
</script>

<template>
  <main>
    <header>
    <NavBar></NavBar>
  </header>
  
  <RouterView />
  </main>
 
</template>

<style>
main{
  background-color: rgb(28, 25, 43);
  min-height: 100vh;
}
a{
 color:aliceblue 
}
</style>
