<script setup lang="ts">
import { toRef, ref } from 'vue';
import { useField } from 'vee-validate';
const props = defineProps({
    name: {type: String, required: true},
    label: {type: String, required: true},
    accept: {type: String, required: true},
    placeholder: {type: String, required: true}
})
const name = toRef(props, 'name')
const{
    errorMessage,
    handleChange,
    meta,
} = useField(name, undefined)
const FileName = ref<String>(props.placeholder)
function addFileName(event: Event) {
    const target = event.target as HTMLSelectElement
    FileName.value = target.value.split('\\').pop() as String
}
</script>

<template>
<div
    class="main"
    :class="{ 'has-error': !!errorMessage, success: meta.valid }"
>
    <label class="mainlable" :for="name">{{ label }}</label>
        <input
      :name="name"
      :id="name"
      :accept="accept"
      :type="'file'"
      @change="(e)=>{
        handleChange(e)
        addFileName(e)}"
    />
    <br>
    <label class="button customInput rounded-s p-1" :for="name"><div class="flex justify-center items-center">{{FileName}}</div></label>
    <p class="help-message text-sm" v-show="errorMessage || meta.valid">
      {{ errorMessage || '' }}
    </p>
</div>

</template>

<style scoped>
.main{
    width: 100%;
}
.help-message{
    color: black;
}
.icon{
    width: 20px;
    height: 20px;
}

.customInput {
    display: block;
    width: 100%;
    height: 100%;
}

input{
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	z-index: -1;
}
.mainlable{
    color: white;
}

.main.has-error .textField:focus-within{
    border:  2px solid white;
}
.main.has-error .customInput{
    background-color: #e9a5a0;
}
.main.has-error .customInput{
    color: black;
}

.main.has-error .help-message{
    color: white
}
input:focus{
    outline: none;
}


</style>