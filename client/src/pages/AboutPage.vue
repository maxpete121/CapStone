<template>
  <div class="wrapper">
    <section class="one sticky-top me-3">

    </section>
    <section class="two ms-3 sticky-top" id="v-step-0">
      <VueTour />
      <section class="row p-2 m-2">
        <button class="col btn btn-outline-light" id="v-step-1" @click="getParts('cpu')">Cpu's</button>
        <button class="col btn btn-outline-light" id="v-step-2" @click="getParts('gpu')">Gpu's</button>
        <button class="col btn btn-outline-light" id="v-step-3" @click="getParts('motherboard')">Motherboards</button>
        <button class="col btn btn-outline-light" id="v-step-4" @click="getParts('ram')">Ram</button>
        <button class="col btn btn-outline-light" id="v-step-5" @click="getParts('storage')">Storage</button>
      </section>
      <section class="row p-2 m-2 ">
        <button class="col btn btn-outline-light" id="v-step-6" @click="getParts('cpuCooler')">Cpu Coolers</button>
        <button class="col btn btn-outline-light" id="v-step-7" @click="getParts('powerSupply')">Power Supplies</button>
        <button class="col btn btn-outline-light" id="v-step-8" @click="getParts('case')">Case's</button>
        <button class="col btn btn-outline-light" id="v-step-9" @click="getParts('caseFan')">Case Fan's</button>
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
import VueTour from '../components/VueTour.vue';
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
  components: { PartCard, VueTour }
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
    background-color: grey;
  }

  >.two {
    grid-column: 4/12;
    grid-row: 1/8;
    background-color: gray;

  }
}
</style>
