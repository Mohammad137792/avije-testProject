<template>
  <div>
    <div class="card">
      <div class="card__inner">
        <div class="card__inner__label">{{ data.label }}</div>
        <div
          class="card__inner__options"
          v-if="data.type === 'checkbox-group' || data.type === 'checkbox' "
          
          v-for="(i, index) in data.options">
          <input type="checkbox" :id="index" :name="i.title" :value="i.value"   v-model='filter'/>
          <label :for="index" class="card__inner__options__title">{{
            i.title
          }}</label
          ><br />
        </div>
        <div
          v-else-if="data.type === 'dropdown'"
          class="card__inner__options">
          <select :name="data.name" :id="data.name" v-model='filter'>
            <option
              v-for="(i, index) in data.options"
              
              :id="index"
              :value="i.value">
              {{ i.title }}
            </option>
          </select>
        </div>
        <div v-else class="card__inner__options">
          <input
          v-model='filter'
            :type="data.type"
             :class="[data.type ==='range'? 'inputStyle' : '']"
            id="points"
            :name="data.label"
            :min='data.type === "range" ?data.options[0].value :0'
            :max='data.type === "range" ?data.options[1].value :0' 
            />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
 import type filterItemDTO from '~/types/filter/filterItem'
const {data} = defineProps<{ data: filterItemDTO }>();
const emit = defineEmits (['changeModel'])
const filter = ref([])
const model = reactive({
  name: data.name,
  type: data.type,
  label: data.label,
  filter: filter
})
watch(model, (newVal)=>{
emit('changeModel',model)
})
</script>
<style lang="scss" scoped>
.inputStyle{
  width: 1000px ;
}
.card {
  width: 95%;
  height: auto;
  margin-top: 16px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  &__inner {
    width: 100%;
    display: grid;
    height: 100%;
    color: red;
    padding: 4px;
    background-color: white;
    box-shadow: gray 0px -2px 2px 0px inset;
    border-radius: 8px;
    border: 1px solid #bed1c2;
    &__options {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin: 4px;
      &__title {
        color: black;
        font-size: 12px;
        font-weight: 700;
      }
    }
    &__label {
      width: 100%;
      display: flex;
      margin: 4px;
      flex-wrap: wrap;
      display: block;
      color: black;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
