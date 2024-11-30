<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue"
const emit = defineEmits(['removeMenu', 'logout'])
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
<div ref="menu" class=" z-2 static flex flex-col border-sm absolute top-20 right-3 shadow-2xl rounded-xl" style=" background-color: white; width: 175px;">
    <div class="menuOption p-2 flex items-center   text-sm">
      <a>Edit profile</a>
    </div>
    <div @click="emit('logout')" class="menuOption p-2 text-sm flex items-center">
      <a>Log out</a>
    </div>
</div>
</template>

<style scoped>
.menuOption{
  cursor:pointer
}
.menuOption:hover{
  background-color: #F1F2F4
}
</style>