<template>
    <section class="row justify-content-center mt-4">
        <div class="list-card col-5 d-flex flex-column align-items-center">
            <h1 class="fst-italic">{{ activePc.name }}</h1>
            <div class="d-flex mt-1">
                <div class="d-flex align-items-center me-2 power-card p-2">
                    <h3>Power Score:</h3>
                    <h3>⚡{{ activePc.powerScore }}</h3>
                </div>
                <div class="d-flex ms-4 align-items-center power-card p-2">
                    <h3 class="me-2">Price:</h3>
                    <h3>${{ activePc.powerScore }}</h3>
                </div>
            </div>
            <div class="d-flex mt-3">
                <button class="btn btn-outline-dark me-2">Add to cart</button>
                <button class="btn btn-outline-dark ms-2">Review Build</button>
            </div>
        </div>
    </section>
    <section class="row mt-4 justify-content-center">
        <div class="col-5 title-card text-center">
            <h3>Build Parts</h3>
        </div>
    </section>
    <section class="row">
        <div v-for="activePart in activeParts" class="col-5">wow</div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { testHandler } from '../handlers/TestHandler';
import { pcService } from '../services/PcService';
import { useRoute } from 'vue-router';
import { partsService } from '../services/PartsService';
export default {
    setup(){
        onMounted(()=>{
            viewBuild()
        })
        let route = useRoute()
        async function viewBuild(){
            await pcService.viewBuild(route.params.PcId)
            getActiveParts()
        }
        async function getActiveParts(){
            await partsService.getActiveParts(route.params.PcId)
        }
    return { 
        activePc: computed(()=> AppState.activeBuild),
        activeParts: computed(()=> AppState.activeParts)
     }
    }
};
</script>


<style lang="scss" scoped>
.list-card{
    outline: solid 2px purple;
    border-radius: 10px;
    padding: 15px;
    background-color: whitesmoke;
    color: black;
    box-shadow: 0px 5px 6px rgba(255, 255, 255, 0.488);
  }

  .power-card{
    background-color: white;
    color: black;
    border-radius: 15px;
    outline: solid 2px purple;
    box-shadow: 3px 5px 3px rgba(0, 0, 0, 0.658);
}

.title-card{
    background-color: white;
    color: black;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    outline: solid 2px purple;
    box-shadow: 3px 5px 3px rgba(0, 0, 0, 0.658);
}
</style>