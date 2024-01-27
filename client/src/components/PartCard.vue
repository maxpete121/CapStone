<template>
    <div type="button" @click="addPartToBuild(part.id)" :title="`Add ${part.name} to build`" class="list-card d-flex w-75 justify-content-between border m-2 text-center">
        <div>
            <img class="img-fluid" :src="part.productImage" :alt="part.name">
        </div>
        <div class="spec-card">
            <h3>{{ part.name }}</h3>
            <h4>{{ part.company }}</h4>
            <h5>{{ part.price }}</h5>
            <h6>{{ part.speed }}</h6>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { StockPart } from '../models/StockPart.js';
import { partsService } from '../services/PartsService';
import { useRoute } from 'vue-router';
import { pcService } from '../services/PcService';
export default {
    props: { part: { type: StockPart, required: true } },
    setup(props) {
        let active = computed(()=> AppState.activeBuild)
        let route = useRoute()
        let pcID = route.params.PcId
        async function addPartToBuild(partId){
            await partsService.addPartToBuild(partId, pcID)
            pcService.updateBuild(props.part)
            AppState.currentStock = []
        }
        return {
            addPartToBuild
        }
    }
};
</script>


<style lang="scss" scoped>
.list-card{
    outline: solid 2px purple;
    border-radius: 10px;
    padding: 15px;
    background-color: white;
    box-shadow: 5px 8px 5px rgba(0, 0, 0, 0.54);
  }
  .list-card:hover{
    outline: solid 2px purple;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 5px 8px 5px rgba(0, 0, 0, 0.54);
    background-color: white;
    transform: scale(1.02);
    cursor: pointer;
  }

  .spec-card{
    background-color: whitesmoke;
    color: black;
    border-radius: 15px;
    padding: 10px;
    outline: solid 2px purple;
    box-shadow: 3px 5px 3px rgba(0, 0, 0, 0.658);
}
img {
    height: 20vh;
    object-fit: contain;
    object-position: center;
}
</style>