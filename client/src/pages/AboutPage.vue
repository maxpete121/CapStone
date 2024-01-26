<template>
  <div class="wrapper">
    <section class="one sticky-top me-3">
      <div v-for="activePart in activeParts" class="row">
        <NewPartCard :activePart="activePart" class="col-3 mt-4 ms-4" />
      </div>
    </section>
    <section class="two ms-3 sticky-top">
      <section v-if="account.tour == false" class="row p-1 justify-content-center">
        <VueTour />
        <div class="col-8 d-flex flex-column align-items-center">
          <h4>Part type</h4>
          <span>
            <button v-if="currentStep == 1" class="btn btn-outline-dark" id="v-step-1"
              @click="getParts('cpu')">Cpu's</button>
            <button v-if="currentStep == 2" class="btn btn-outline-dark" id="v-step-2"
              @click="getParts('gpu')">Gpu's</button>
            <button v-if="currentStep == 3" class="btn btn-outline-dark" id="v-step-3"
              @click="getParts('motherboard')">Motherboards</button>
            <button v-if="currentStep == 4" class="btn btn-outline-dark" id="v-step-4"
              @click="getParts('ram')">Ram</button>
            <button v-if="currentStep == 5" class="btn btn-outline-dark" id="v-step-5"
              @click="getParts('storage')">Storage</button>
          </span>
        </div>
        <div class="col-8 d-flex flex-column align-items-center">
          <span>
            <button v-if="currentStep == 6" class="col btn btn-outline-dark" id="v-step-6"
              @click="getParts('cpuCooler')">Cpu Coolers</button>
            <button v-if="currentStep == 7" class="col btn btn-outline-dark" id="v-step-7"
              @click="getParts('powerSupply')">Power
              Supplies</button>
            <button v-if="currentStep == 8" class="col btn btn-outline-dark" id="v-step-8"
              @click="getParts('case')">Case's</button>
            <button v-if="currentStep == 9" class="col btn btn-outline-dark" id="v-step-9"
              @click="getParts('caseFan')">Case Fan's</button>
          </span>
        </div>
      </section>
      <section v-else class="row p-1 justify-content-center">
        <div class="col-8 d-flex flex-column align-items-center">
          <h4>Part type</h4>
          <span>
            <button class="btn btn-outline-dark" @click="getParts('cpu')">Cpu's</button>
            <button class="btn btn-outline-dark" @click="getParts('gpu')">Gpu's</button>
            <button class="btn btn-outline-dark" @click="getParts('motherboard')">Motherboards</button>
            <button class="btn btn-outline-dark" @click="getParts('ram')">Ram</button>
            <button class="btn btn-outline-dark" @click="getParts('storage')">Storage</button>
          </span>
        </div>
        <div class="col-8 d-flex flex-column align-items-center">
          <span>
            <button class="col btn btn-outline-dark" @click="getParts('cpuCooler')">Cpu Coolers</button>
            <button class="col btn btn-outline-dark" @click="getParts('powerSupply')">Power
              Supplies</button>
            <button class="col btn btn-outline-dark" @click="getParts('case')">Case's</button>
            <button class="col btn btn-outline-dark" @click="getParts('caseFan')">Case Fan's</button>
          </span>
        </div>
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
import { computed, onMounted, ref, watch } from 'vue';
import { AppState } from '../AppState';
import VueTour from '../components/VueTour.vue';
import PartCard from '../components/PartCard.vue';
import NewPartCard from '../components/NewPartCard.vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    let activePc = computed(() => AppState.activeBuild)
    let route = useRoute()
    let pcID = route.params.PcId
    onMounted(() => {
      getActiveParts(pcID)
      clearAppstate()
    })
    async function getActiveParts() {
      await partsService.getActiveParts(pcID)
    }
    async function clearAppstate() {
      AppState.currentStep = 1
      AppState.currentStock = []
      AppState.activeParts = []
    }
    return {
      account: computed(() => AppState.account),
      parts: computed(() => AppState.currentStock),
      activeParts: computed(() => AppState.activeParts),
      currentStep: computed(() => AppState.currentStep),
      currentStock: computed(() => AppState.currentStock),
      isActive: computed(() => AppState.tourActive),
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
  components: { PartCard, VueTour, NewPartCard }
}
</script>

<style lang="scss">
// FIXME rip some of these lines out to check to see how the structure is getting JACKED
.wrapper {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 20px;
  margin-top: 60px;
  grid-auto-rows: minmax(100px, auto);

  >.one {
    grid-column: 1/12;
    grid-row: 2/10;
    background-color: rgba(255, 255, 255, 0);
  }

  >.two {
    grid-column: 5/11;
    grid-row: 1/10;
    background-color: rgba(176, 176, 176, 0.467);

  }
}
</style>
