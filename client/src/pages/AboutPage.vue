<template>
  <div class="wrapper">
    <section class="one sticky-top">

    </section>
    <section class="two">
      <section class="row p-2 my-2">
        <button class="col btn btn-outline-light" @click="getParts('cpu')">Cpu's</button>
        <button class="col btn btn-outline-light" @click="getParts('gpu')">Gpu's</button>
        <button class="col btn btn-outline-light" @click="getParts('motherboard')">Motherboards</button>
        <button class="col btn btn-outline-light" @click="getParts('ram')">Ram</button>
        <button class="col btn btn-outline-light" @click="getParts('storage')">Storage</button>
        <button class="col btn btn-outline-light" @click="getParts('cpuCooler')">Cpu Coolers</button>
        <button class="col btn btn-outline-light" @click="getParts('powerSupply')">Power Supplies</button>
        <button class="col btn btn-outline-light" @click="getParts('case')">Case's</button>
        <button class="col btn btn-outline-light" @click="getParts('caseFan')">Case Fan's</button>
      </section>
      <section class="row">
        <div class="col-3" v-for="part in parts">
          <PartCard :part="part" />
        </div>
      </section>
    </section>

  </div>
</template>

<script>
import Pop from '../utils/Pop';
import { partsService } from '../services/PartsService.js'
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import PartCard from '../components/PartCard.vue';

export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      parts: computed(() => AppState.currentStock),
      async getParts(type) {
        try {
          await partsService.getParts(type);
        }
        catch (error) {
          Pop.error(error);
        }
      }
    };
  },
  components: { PartCard }
}
</script>

<style scoped lang="scss">
.wrapper {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 20px;
  grid-auto-rows: minmax(90px, auto);

  >.one {
    grid-column: 1/4;
    grid-row: 1/8;
    background-color: blue;
  }

  >.two {
    grid-column: 4/12;
    grid-row: 1/8;
    align-items: center;
    justify-content: center;
    background-color: green;
  }
}
</style>
