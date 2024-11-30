<script setup lang="ts">
import { useModalStore } from '@/stores/ModalStore';
const Modals = useModalStore()

</script>

<template>

<div 
  @click.self="Modals.ResetModal()" 
  v-if="Modals.CurrentModal.component" 
  class="modal-background fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
  <div class="relative ">
    <component  :is="Modals.CurrentModal.component" v-bind="Modals.CurrentModal.componentProps"></component>
  </div>
</div>

</template>

<style scoped>

</style>