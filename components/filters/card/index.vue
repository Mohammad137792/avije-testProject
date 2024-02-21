<template>
  <div>
    <div class="card">
      <div class="card__inner">
        <div class="card__inner__label">{{ data.label }}</div>
        <div
          class="card__inner__options"
          v-if="data.type === 'checkbox-group' || data.type === 'checkbox'"
          v-for="(i, index) in data.options">
          <input
            type="checkbox"
            :id:any="index"
            :name="(i.name)"
            :value="i.value"
            v-model="filter" />
          <label :for:any="index" class="card__inner__options__title">{{
            i.title
          }}</label
          ><br />
        </div>
        <div
          v-else-if="data.type === 'dropdown' && data.name"
          class="card__inner__options">
          <select :name="data?.name" :id="data?.name" v-model="filter">
            <option
              v-for="(i, index) in data.options"
              :id:any="index"
              :value="i.value">
              {{ i.title }}
            </option>
          </select>
        </div>
        <div v-else class="card__inner__options">
          <input
            v-model="filter"
            :type="data.type"
            :class="[data.type === 'range' ? 'inputStyle' : '']"
            id="points"
            :name="data.label"
            :min="data.type === 'range' ? data.options?.[0].value : 0"
            :max="data.type === 'range' ? data.options?.[1].value : 0" />
        </div>
      </div>
    </div>

    <div class="children" v-if="data.children && data.children.length > 0">
      <div
        v-for="(i, index) in data.children"
        :key="index"
        class="filter__list">
        <div>
          <filtersCard
            :data="(i as filterItemDTO)"
            @changeModel="checkModel"
            v-if="(i.name ) &&  Object.keys(queryModel).includes(i?.parent ) && queryModel[i.parent]=== i.name" 

            />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type filterItemDTO from "~/types/filter/filterItem";
const { data } = defineProps<{ data: filterItemDTO }>();
const route = useRoute();
const router = useRouter();
const emit = defineEmits(["changeModel"]);
const filter = ref([]);
const model = reactive({
  name: data.name,
  type: data.type,
  label: data.label,
  filter: filter,
});
const queryModel = reactive<any>({});
const checkModel = (response: any) => {
  queryModel[response?.name] = Array.isArray(response.filter)
    ? (response.filter.length<2 ? (response.filter[0]) :JSON.stringify( response.filter  ))
    : response.filter;
  router.push({ path: route.path, query: { ...route.query, ...queryModel } });
};
watch(model, (newVal) => {
  checkModel(model);
});
</script>
<style lang="scss" scoped>
.children {
  margin-right: 40px;
}
.filter {
  background-color: #e6ebe7;
  border-radius: 16px;
  border: 1px solid #bed1c2;
  height: 95%;
  padding: 16px;
  width: 95vw;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, #bed1c2 0px -2px 6px 0px inset;
  &__title {
    font-size: 18px;
    font-weight: 400;
    direction: ltr;
  }
  &__list {
    overflow-y: hidden;
  }
}
.inputStyle {
  width: 1000px;
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
