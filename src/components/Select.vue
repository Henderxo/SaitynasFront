<script setup lang="ts">
import { toRef, ref, onMounted, computed,watch } from 'vue';
import { useField, type InputType } from 'vee-validate';
import { useCollections } from '@/composables/getData';
import { type PropType } from 'vue';
const props = defineProps({
    name: {type: String, required: true},
    value: {type: [String, Boolean] as PropType<string | boolean>, default: undefined},
    label: {type: String, required: true},
    placeHolder: {type: String, default: ''},
    collectionName: {type: String, required: false},
    showing: {type: String, required: true},
    defaultValues: {type: Object as PropType<String[]|boolean[]>, required: false}
})
const emit = defineEmits(['update:modelValue'])
const {data, isLoading, getCollection} = useCollections()
const name = toRef(props, 'name')
const{
    value: selectedValue,
    errorMessage,
    meta,
} = useField(name, undefined, {initialValue: props.value})

function handleChange(event: Event) {
    const target = event.target as HTMLSelectElement
    selectedValue.value = target.value;
    emit('update:modelValue', selectedValue.value)
}

onMounted(async ()=>{
    props.collectionName?getCollection({collectionName: props.collectionName}):null
})
</script>

<template>
<div
    class="main"
    :class="{ 'has-error': !!errorMessage, success: meta.valid }">
    <label  :for="name">{{ label }}</label>
    <div type="select" class="textField  items-center rounded-sm">
    <select style="width: 100%;" class="h-auto h-12 p-3 shadow-[rgba(0,0,15,0.5)_0px_3px_3px_1px]"
      :value="selectedValue"
      :name="name"
      :id="name"
      :placeholder="placeHolder"
      @change="handleChange"
    > 
        <option value="" >{{ placeHolder }}</option>
        <option v-if="!isLoading && collectionName" :value="item._id" v-for="item in data" :key="(item._id as PropertyKey)">
            {{ item[showing]}}
        </option>
        <option v-if="!collectionName" :value="item" v-for="item in defaultValues" :key="(item as PropertyKey)">
            {{ item }}
        </option>
    </select>
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
select{
    border: none;
    background-color: transparent;
    width: 100%;
    background-color: white;
}
select:focus{
    outline: none;
}
label{
    color: white;
}
.main.textField{
    background-color: white;
}
.textField:focus-within{
    border: 2px solid orange;
}


.main.has-error .textField:focus-within{
    border:  2px solid orange;
}
.main.has-error select{
    background-color: #ee7027;
}
.main.has-error ::placeholder{
    color:black
}
.main.has-error .help-message{
    color: white
}

.main.has-error select:-webkit-autofill{
    -webkit-box-shadow: 0 0 0 30px white inset;
    box-shadow: 0 0 0 30px orange inset;
}
.main select:-webkit-autofill{
    -webkit-box-shadow: 0 0 0 30px white inset;
    box-shadow: 0 0 0 30px #F1F2F4 inset;
}


</style>