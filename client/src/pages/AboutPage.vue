<template>
  <div class="container-fluid">
    <div class="row justify-content-center mt-3">
      <div class="col-4 list-card text-center">
        <h3>{{ activePc.name }}</h3>
        <div class="d-flex justify-content-center">
          <div class="d-flex power-card me-2">
            <h4 class="me-2">PC Power Score:</h4>
            <h4>{{ activePc.powerScore }}</h4>
          </div>
          <div class="d-flex price-card ms-2">
            <h4>Price: $</h4>
            <h4>{{ pcPrice }}</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-5">
        <div v-for="activePart in activeParts" class="">
          <NewPartCard :activePart="activePart" class="mt-3" />
        </div>
      </div>
      <section class="col-5">
        <section v-if="account.tour == false" class="p-1 justify-content-center">
          <VueTour />
          <div class="d-flex flex-column align-items-center">
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
          <div class="d-flex flex-column align-items-center">
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
        <section v-else class="p-1 justify-content-center list-card mt-3">
          <div class="d-flex flex-column align-items-center mb-2">
            <h4>Part type</h4>
            <span>
              <button v-if="!displayCpu" class="btn btn-outline-success" @click="getParts('cpu')">Cpu's</button>
              <button v-if="!displayGpu" class="btn btn-outline-success ms-2" @click="getParts('gpu')">Gpu's</button>
              <button v-if="!displayMotherboard" class="btn btn-outline-success me-2 ms-2" @click="getParts('motherboard')">Motherboards</button>
              <button v-if="!displayRam" class="btn btn-outline-success me-2" @click="getParts('ram')">Ram</button>
              <button class="btn btn-outline-success" @click="getParts('storage')">Storage</button>
            </span>
          </div>
          <div class="d-flex flex-column align-items-center">
            <span>
              <button v-if="!displayCpuCool" class="col btn btn-outline-success" @click="getParts('cpuCooler')">Cpu Coolers</button>
              <button v-if="!displayPower" class="col btn btn-outline-success ms-2" @click="getParts('powerSupply')">Power
                Supplies</button>
              <button v-if="!displayCases" class="col btn btn-outline-success me-2 ms-2" @click="getParts('case')">Case's</button>
              <button class="col btn btn-outline-success" @click="getParts('caseFan')">Case Fan's</button>
            </span>
          </div>
        </section>
        <section class="">
          <div class="d-flex flex-column align-items-center" v-for="part in parts">
            <PartCard :part="part" />
          </div>
        </section>
      </section>

    </div>
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
import { pcService } from '../services/PcService';

export default {
  setup() {
    let activePc = computed(() => AppState.activeBuild)
    let route = useRoute()
    let pcID = route.params.PcId
    onMounted(() => {
      getActiveParts(pcID)
      pcService.viewBuild(pcID)
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
      activePc: computed(() => AppState.activeBuild),
      pcPrice: computed(()=>{
        let price = AppState.activeBuild
        let newPrice = Math.round(price.price * 100) / 100
        return newPrice
      }
      ),
      displayCpu: computed(() => {
        let part = AppState.activeParts.find(part => part.part.type == 'cpu')
        return part != undefined
      }),
      displayGpu: computed(() => {
        let part = AppState.activeParts.find(part => part.part.type == 'gpu')
        return part != undefined
      }),
      displayMotherboard: computed(() => {
        let part = AppState.activeParts.find(part => part.part.type == 'motherboard')
        return part != undefined
      }),
      displayRam: computed(() => {
        let part = AppState.activeParts.find(part => part.part.type == 'ram')
        return part != undefined
      }),
      displayCpuCool: computed(() => {
        let part = AppState.activeParts.find(part => part.part.type == 'cpuCooler')
        return part != undefined
      }),
      displayPower: computed(() => {
        let part = AppState.activeParts.find(part => part.part.type == 'powerSupply')
        return part != undefined
      }),
      displayCases: computed(() => {
        let part = AppState.activeParts.find(part => part.part.type == 'case')
        return part != undefined
      }),
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
.price-card{
    background-color: whitesmoke;
    color: black;
    border-radius: 15px;
    padding-top: 5px;
    padding-left: 7px;
    padding-right: 7px;
    outline: solid 2px rgb(13, 155, 176);
    box-shadow: 3px 5px 3px rgba(0, 0, 0, 0.658);
}
.power-card{
    background-color: whitesmoke;
    color: black;
    border-radius: 15px;
    padding-top: 5px;
    padding-left: 7px;
    padding-right: 7px;
    outline: solid 2px rgb(13, 155, 176);
    box-shadow: 3px 5px 3px rgba(0, 0, 0, 0.658);
}
.list-card{
    outline: solid 2px rgb(13, 155, 176);
    border-radius: 10px;
    background-color: #212529;
    color: #0cbc87;
    padding: 15px;
    box-shadow: 5px 8px 5px rgba(0, 0, 0, 0.54);
  }
</style>
