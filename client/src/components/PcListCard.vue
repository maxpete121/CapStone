<template>
    <div class="d-flex flex-column align-items-center">
        <h3 class="fst-italic">{{ list.name }}</h3>
        <div class="d-flex mt-2 mb-2">
            <div class="d-flex price-card me-2 align-items-baseline">
                <h4>Price: </h4>
                <h4 class="ms-2 text-warning">${{ list.price }}</h4>
            </div>
            <span class="d-flex power-card ms-2 align-items-baseline">
                <h4 class="me-2">Power Score:</h4>
                <h4 class="text-danger"><i class="mdi mdi-arm-flex"></i>{{ list.powerScore }}</h4>
            </span>
        </div>
        <span class="d-flex mt-2">
            <button @click="shareBuild()" v-if="list.isShared == false" class="btn btn-outline-success">Share Build</button>
            <button @click="shareBuild()" v-if="list.isShared == true" class="btn btn-outline-success">Make Private</button>
            <button class="btn btn-outline-success ms-2">Purchase</button>
            <button @click="viewBuild()" class="btn btn-outline-success ms-2 me-2">Edit Build</button>
            <button @click="deletePc(list.id)" class="btn btn-outline-danger"><i class="mdi mdi-delete"></i></button>
        </span>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { StockPart } from '../models/StockPart.js';
import { PcList } from '../models/PcList';
import { pcService } from '../services/PcService.js';
import { router } from '../router';
import { partsService } from '../services/PartsService';
export default {
    props: { list: { type: PcList, required: true } },
    setup(props) {
        async function deletePc(pcId) {
            if (window.confirm('Are you sure you want to delete this build?')) {
                await pcService.deletePc(pcId)
            }
        }

        async function viewBuild() {
            await pcService.viewBuild(props.list.id)
            router.push({ name: 'About', params: { PcId: props.list.id } })
        }

        async function shareBuild() {
            if(props.list.isShared == false && window.confirm('Are you sure you want to share this build with others?')){
                await pcService.shareBuild(props.list.id, props.list)
            }else if(props.list.isShared == true && window.confirm('Are you sure you want to make this build private')){
                await pcService.shareBuild(props.list.id, props.list)
            }
        }
        return {
            deletePc,
            viewBuild,
            shareBuild

        }
    }
};
</script>


<style lang="scss" scoped>
.price-card {
    background-color: black;
    color: #0cbc87;
    border-radius: 15px;
    padding-top: 5px;
    padding-left: 7px;
    padding-right: 7px;
    outline: solid 2px #0cbc87;
    box-shadow: 3px 5px 3px rgba(0, 0, 0, 0.658);
}

.power-card {
    background-color: black;
    color: #0cbc87;
    border-radius: 15px;
    padding-top: 5px;
    padding-left: 7px;
    padding-right: 7px;
    outline: solid 2px #0cbc87;;
    box-shadow: 3px 5px 3px rgba(0, 0, 0, 0.658);
}

img {
    height: 20vh;
    object-fit: contain;
    object-position: center;
}

</style>