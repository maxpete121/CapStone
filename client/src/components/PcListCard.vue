<template>
    <div class="d-flex flex-column align-items-center">
        <h3>{{ list.name }}</h3>
        <div class="d-flex mt-2 mb-2">
            <div class="d-flex price-card me-2 align-items-baseline">
                <h4>Price: </h4>
                <h4 class="ms-1">${{ list.price }}</h4>
            </div>
            <span class="d-flex power-card ms-2 align-items-baseline">
                <h4 class="me-2">Power Score:</h4>
                <h4>{{ list.powerScore }}</h4>
            </span>
        </div>
        <span class="d-flex mt-2">
            <button class="btn btn-outline-dark">Share Build</button>
            <button class="btn btn-outline-dark ms-2">Purchase</button>
            <button @click="viewBuild()" class="btn btn-outline-dark ms-2 me-2">View Build</button>
            <button @click="deletePc(list.id)" class="btn btn-outline-dark"><i class="mdi mdi-delete"></i></button>
        </span>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { StockPart } from '../models/StockPart.js';
import { PcList } from '../models/PcList';
import {pcService} from '../services/PcService.js';
import { router } from '../router';
export default {
    props: {list: {type: PcList, required: true}},
    setup(props) {
        async function deletePc(pcId){
            await pcService.deletePc(pcId)
        }

        async function viewBuild(){
            await pcService.viewBuild(props.list.id)
            router.push({name: 'About', params:{PcId: props.list.id}})
        }
        return {
            deletePc,
            viewBuild
        }
    }
};
</script>


<style lang="scss" scoped>
.price-card{
    background-color: whitesmoke;
    color: black;
    border-radius: 15px;
    padding-top: 5px;
    padding-left: 7px;
    padding-right: 7px;
    outline: solid 2px purple;
    box-shadow: 3px 5px 3px rgba(0, 0, 0, 0.658);
}
.power-card{
    background-color: whitesmoke;
    color: black;
    border-radius: 15px;
    padding-top: 5px;
    padding-left: 7px;
    padding-right: 7px;
    outline: solid 2px purple;
    box-shadow: 3px 5px 3px rgba(0, 0, 0, 0.658);
}
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