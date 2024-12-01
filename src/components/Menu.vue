<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue"
const emit = defineEmits(['removeMenu', 'logout', 'editProfile'])
const menu = ref<HTMLElement | null>(null)

const handleClick = (e: MouseEvent) => {
  if (menu.value && !menu.value.contains(e.target as Node)) {
    emit('removeMenu')
  }
}

onMounted(() => {
  document.addEventListener("click", handleClick)
})

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClick)
})
</script>

<template>
<div ref="menu" style=" width: 200px; height: 100px;" class=" z-10 buttonNoHover fixed flex flex-col justify-between border-sm top-20 right-3 shadow-2xl rounded-xl" >
    <div style="width: 100%; height: 100%;" @click="emit('editProfile')" class="menuOption  button rounded-t-lg flex items-center justify-center   text-sm">
      <a class="text-lg">Edit profile</a>
    </div>
    <div  style="width: 100%; height: 100%;" @click="emit('logout')" class="menuOption buttonT  justify-center  flex items-center">
      <a class="text-lg">Log out</a>
    </div>
</div>
</template>

<style scoped>
.menuOption{
  cursor:pointer

}
a{
  color: black;
}
.buttonNoHover {
  @apply bg-gradient-to-r from-orange-500 to-yellow-500 shadow-lg  shadow-orange-500/50 rounded-xl  h-12 text-xl;
}
.button {
  @apply bg-gradient-to-r from-orange-500 to-yellow-500 shadow-lg  shadow-orange-500/50 rounded-t-lg rounded  h-12 text-xl;
}

.button:hover {
    @apply from-orange-400 to-yellow-400 shadow-lg shadow-orange-500/70;
}
.buttonT {
  @apply bg-gradient-to-r from-orange-500 to-yellow-500 shadow-lg  shadow-orange-500/50 rounded-b-lg rounded  h-12 text-xl;
}

.buttonT:hover {
    @apply from-orange-400 to-yellow-400 shadow-lg shadow-orange-500/70;
}
</style>