<template>
  <div>
    <div class="chipsPlate">
<div class="chipsPlate__deleteChips">
<FiltersFilterChipsChipset :data="{name:'delete all'}"/>
</div>
<div class="chipsPlate__deleteChips" v-for="i in filterArray">
<FiltersFilterChipsChipset :data="i"/>
</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const {query} = useRoute()
const filterArray  = reactive(query)

const filters= localStorage.getItem("filters");

</script>

<style lang="scss" scoped>
.chipsPlate{
  padding: 16px;
    width: 90%;
    min-height: 30px;
    height: auto;
    margin-top: 16px;
    margin-bottom: 8px;
    margin-right: 45px;
    display: flex;
    justify-content: center;
    border-radius: 8px;
    border: 1px red solid;
    background-color: rgba(122, 60, 60, 0.308);
    align-items: center;
    &__deleteChips{
margin:8px
    }
}
</style>
