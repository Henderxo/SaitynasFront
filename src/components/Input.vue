<script setup lang="ts">
import { toRef, ref } from 'vue';
import { useField, type InputType } from 'vee-validate';
const props = defineProps({
    name: {type: String, required: true},
    type: {type: String, default: 'text'},
    value: {type: String, default: undefined},
    label: {type: String, required: true},
    leftIcon: {type: String, default: undefined},
    rightIcon: {type: String, default: undefined},
    placeHolder: {type: String, default: ''},
})
const name = toRef(props, 'name')
const type = ref(props.type)
const{
    value: inputValue,
    errorMessage,
    handleBlur,
    handleChange,
    meta,
} = useField(name, undefined, {initialValue: props.value})
function toggleVisibility(): void{
    type.value = type.value === 'text' ? 'password' : 'text'
}

</script>

<template>
<div
    class="main"
    :class="{ 'has-error': !!errorMessage, success: meta.valid }"
>
    <label  :for="name">{{ label }}</label>
    <div type="input" class="textField flex items-center rounded-sm p-3">
        <img class="icon ml-1 mr-2" v-if="leftIcon" :src="leftIcon" >
        <input
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeHolder"
      @change="handleChange"
      @blur="handleBlur"
    />
    <img @click="toggleVisibility()" class="icon ml-2 mr-1 iconPointer" v-if="rightIcon" :src="rightIcon">
    </div>
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
input{
    border:none;
    background-color: transparent;
    width: 100%;
}
label{
    color: white;
}
.textField{
    background-color: #F1F2F4;
}
.textField:focus-within{
    border: 2px solid  orange;
}


.main.has-error .textField:focus-within{
    border:  2px solid Orange;
}
.main.has-error .textField{
    background-color: #ee7027;
}
.main.has-error input{
    background-color: #ee7027;
}
.main.has-error ::placeholder{
    color:black
}
.main.has-error .help-message{
    color: white
}

input:focus{
    outline: none;
}
.main.has-error input:-webkit-autofill{
    -webkit-box-shadow: 0 0 0 30px white inset;
    box-shadow: 0 0 0 30px #ee7027 inset;
}
.main input:-webkit-autofill{
    -webkit-box-shadow: 0 0 0 30px white inset;
    box-shadow: 0 0 0 30px #F1F2F4 inset;
}

</style>