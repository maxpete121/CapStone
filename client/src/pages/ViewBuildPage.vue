<template>
    <section class="row justify-content-center mt-4">
        <div class="list-card-d col-5 d-flex flex-column align-items-center">
            <h1 class="fst-italic">{{ activePc.name }}</h1>
            <div class="d-flex mt-1">
                <div class="d-flex align-items-center me-2 power-card-d p-2">
                    <h3>Power Score:</h3>
                    <h3><i class="mdi mdi-arm-flex"></i>{{ activePc.powerScore }}</h3>
                </div>
                <div class="d-flex ms-4 align-items-center power-card-d p-2">
                    <h3 class="me-2">Price:</h3>
                    <h3>${{ activePc.powerScore }}</h3>
                </div>
            </div>
            <div class="d-flex mt-3">
                <button class="btn btn-outline-success me-2">Add to cart</button>
                <button class="btn btn-outline-success ms-2">Review Build</button>
                <button @click="editBuild()" v-if="account.id == activePc.creatorId" class="btn btn-outline-success ms-3">Edit Build</button>
            </div>
        </div>
    </section>
    <section class="row mt-4 justify-content-center">
        <div class="col-5 title-card-d text-center">
            <h3>Build Parts</h3>
        </div>
    </section>
    <section class="row flex-column align-items-center">
        <div v-for="activePart in activeParts" class="col-5 mt-3">
            <NewPartCard :activePart="activePart"/>
    </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { testHandler } from '../handlers/TestHandler';
import { pcService } from '../services/PcService';
import { useRoute } from 'vue-router';
import { partsService } from '../services/PartsService';
import NewPartCard from '../components/NewPartCard.vue';
import { router } from '../router';
export default {
    setup(){
        onMounted(()=>{
            viewBuild()
            scrollTo(0, 0)
        })
        let route = useRoute()
        async function editBuild(){
            await pcService.viewBuild(route.params.PcId)
            router.push({ name: 'About', params: { PcId: route.params.PcId } })
        }
        async function viewBuild(){
            await pcService.viewBuild(route.params.PcId)
            getActiveParts()
        }
        async function getActiveParts(){
            await partsService.getActiveParts(route.params.PcId)
        }
    return { 
        activePc: computed(()=> AppState.activeBuild),
        activeParts: computed(()=> AppState.activeParts),
        account: computed(()=> AppState.account),
        editBuild
     }
    }, components: {NewPartCard}
};
</script>


<style lang="scss" scoped>
.list-card-d{
    outline: solid 2px rgb(13, 155, 176);
    border-radius: 10px;
    padding: 15px;
    background-color: #212529;
    color: #0cbc87;
    box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.488);
  }

  .power-card-d{
    background-color: rgba(72, 72, 72, 0.393);
    color: #0cbc87;
    border-radius: 15px;
    outline: solid 2px #0cbc87;
    box-shadow: 3px 5px 3px rgba(0, 0, 0, 0.658);
}

.title-card-d{
    background-color: #212529;
    color: #0cbc87;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    outline: solid 2px rgb(13, 155, 176);
    box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.658);
}
</style>