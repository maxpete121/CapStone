<template>
    <div class="d-flex flex-column align-items-center">
        <h5>{{ list.name }}</h5>
        <span class="d-flex">
            <h5>Price: $</h5>
            <h5>{{ list.price }}</h5>
        </span>
        <span class="d-flex">
            <h5 class="me-2">Power Score:</h5>
            <h5>{{ list.powerScore }}</h5>
        </span>
        <span class="d-flex">
            <button class="btn btn-outline-dark">Share Build</button>
            <button class="btn btn-outline-dark ms-2 me-2">View Build</button>
            <button @click="deletePc(list.id)" class="btn btn-outline-dark">Delete Build</button>
        </span>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { StockPart } from '../models/StockPart.js';
import { PcList } from '../models/PcList';
import {pcService} from '../services/PcService.js'
export default {
    props: {list: {type: PcList, required: true}},
    setup() {
        async function deletePc(pcId){
            await pcService.deletePc(pcId)
        }
        return {
            deletePc
        }
    }
};
</script>


<style lang="scss" scoped>
img {
    height: 20vh;
    object-fit: contain;
    object-position: center;
}
.list-card{
    outline: solid 2px purple;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 5px 8px 5px rgba(0, 0, 0, 0.54);
  }
</style>