<script lang="ts" setup>
import data from "@/public/data";
const router = useRouter();
const route = useRoute();
const model = reactive<any>({});
console.log("data", data);
const checkModel = (response :any) => {
  model[response.name] = Array.isArray(response.filter)
    ? JSON.stringify(response.filter)
    : response.filter;
  console.log("model", model);
  router.push({ path: route.path, query: { ...route.query, ...model } });
};
</script>

<template>
  <div>
    <div class="page">
      <div class="filter">
        <div class="filter__title"><h1>Avijeh Filter Project</h1></div>
        <div v-for="(i, index) in data" :key="index" class="filter__list">
          <div>
            <filtersCard :data="i" @changeModel="checkModel" />
          </div>
        </div>
        <div >
<LazyFiltersFilterChips/>

        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.page {
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
