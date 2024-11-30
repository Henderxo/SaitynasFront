<script setup lang="ts">
import { type Game } from '@/types/Game';
import type { PropType } from 'vue';
import { prepareImageSrc } from '@/utils/imageUtils';
import { useRouter } from 'vue-router';
const props = defineProps({
    game: {type: Object as PropType<Game>, required: true}
})
const router = useRouter()

</script>

<template>
    <div style=" padding: 2px; width: 175px; height: 250px; overflow: hidden;  text-overflow: ellipsis;" class="">
        <div  @click="router.replace({path: `/games/${game._id}`})" class="container relative iconPointer">
            <img class="imgDisplay" :src="prepareImageSrc(game.photo)">
            <div class="middle ">
                <img src="@/assets/icons/arrowIcon.png" class="w-16 ">
            </div>
        </div>
        <div class="truncate text-xs mt-1 mb-1">
            <a class="font-bold ">{{ game.title }}</a><br>
        </div>
        <div class="truncate text-xs mt-1 mb-1">
            <a >Platform: {{ game.platform }}</a>
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