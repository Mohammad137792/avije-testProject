<script lang="ts" setup>
import data from "@/public/data";
const dataMapper = (arr: any) => {
  let result = <any>[];
  arr.map((el: any, ind: any) => {
    if (!el.parent && !el.children) result.push(el);
    if (el.children) {
      el.children.map((i: any, index: number) => {
        const res = (el.children[index] = arr.find((j: any) => j?.name === i));
        if (el.children[index]) dataMapper(el.children);
        return res;
      });

      result.push(el);
    }
  });
  return result;
};
const mappedData = <any>dataMapper(data);
</script>

<template>
  <div>
    <div class="page">
      <div class="filter">
        <div class="filter__title"><h1>Avijeh Filter Project</h1></div>
        <div v-for="(i, index) in mappedData" :key="index" class="filter__list">
          <div>
            <filtersCard :data="i"  />
          </div>
        </div>
        <div>
          <LazyFiltersFilterChips />
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
