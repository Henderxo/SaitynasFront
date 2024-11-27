<script setup lang="ts">


</script>

<template>

<div class="topnav bg-gradient-to-r from-orange-500 to-yellow-500">

    <div class="font-bold">
        <RouterLink class="flex justify-center items-center" :to="{name: 'home'}">Home</RouterLink>
        <RouterLink class="flex justify-center items-center" :to="{name: 'games'}">Games</RouterLink>
        <RouterLink class="flex justify-center items-center" :to="{name: 'users'}">Users</RouterLink>
    </div>
    <div class="float-end font-bold">
        <RouterLink class="float-end flex justify-center items-center" :to="{name: 'login'}">Login</RouterLink>
    </div>
    <div class="icon flex justify-center items-center w-48 float-end">
        <img class="profileIcon w-12 rounded-full" src="@/assets/icons/userIcon.png">
    </div>

</div>

</template>

<style scoped>
.icon{
    height: 75px;
}
.profileIcon{
    background-color: blanchedalmond;
}
.topnav {
  overflow: hidden;
  min-width: 1400px;
}
.topnav a {
  float: left;
  color: #f2f2f2;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  height: 75px;
  width: 125px;
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
    display: none;
  }
}

</style>