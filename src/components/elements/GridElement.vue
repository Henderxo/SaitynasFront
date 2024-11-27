<script setup lang="ts">
import { type Developer } from '@/types/Developer';
import type { PropType } from 'vue';
import { prepareImageSrc } from '@/utils/imageUtils';
import { useRouter } from 'vue-router';
const props = defineProps({
    developer: {type: Object as PropType<Developer>, required: true}
})
const router = useRouter()
</script>

<template>
    <div style=" padding: 2px; width: 175px; height: 250px; overflow: hidden;  text-overflow: ellipsis;" class="shadow-xl">
        <div @click="router.push({name: 'developerDetails', params: {id: developer._id}})" class="container relative iconPointer">
            <img class="imgDisplay" :src="prepareImageSrc(developer.photo)">
            <div class="middle ">
                <img src="@/assets/icons/arrowIcon.png" class="w-16 ">
            </div>
        </div>
        <div class="truncate text-xs mt-1 mb-1">
            <a class="font-bold ">{{ developer.name }}</a><br>
        </div>
        <div class="truncate text-xs mt-1 mb-1">
            <a >Founder: {{ developer.founder }}</a>
        </div>
        <div>

        </div>  
    </div>
</template>

<style scoped>
.truncate {   
    white-space: nowrap;  
    overflow:hidden;          
    text-overflow: ellipsis; 
    max-width: 200px;
}
.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.container:hover .imgDisplay {
  opacity: 1;
  -webkit-filter: blur(6px);
}

.container:hover .middle {
  opacity: 1;
}

</style>