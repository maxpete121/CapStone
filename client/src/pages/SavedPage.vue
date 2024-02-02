<template>
    <section class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-5 list-card-s text-light text-center mt-3">
                <h3>Welcome to your saved builds</h3>
            </div>
        </div>
        <div class="row d-flex flex-column align-items-center">
            <div v-for="savedBuild in savedBuilds" class="col-5 mt-4">
                <WishlistCard :savedBuild="savedBuild"/>
            </div>
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted, watch } from 'vue';
import {savedService} from '../services/SavedService.js'
import Pop from '../utils/Pop';
import WishlistCard from '../components/WishlistCard.vue';
import { useRoute } from 'vue-router';
export default {
    setup(){
        // onMounted(()=>{
        //     if(AppState.account.id){
        //         getSaved(accountId)
        //     }
        // })
        
        let route = useRoute()
        let accountID = route.params.accountId
        let accountWatch = computed(()=> AppState.account)
        watch(accountWatch, getSaved)

        async function getSaved(){
             await savedService.getSaved(accountID)
             
        }
    return { 
        savedBuilds: computed(()=> AppState.savedItems)
     }
    }, components: {WishlistCard}
};
</script>


<style lang="scss" scoped>
.list-card-s {
  outline: solid 2px #198754;
  border-radius: 10px;
  padding: 15px;
  background-color: #212529;
  box-shadow: 6px 9px 9px rgba(0, 0, 0, 0.699);
}
</style>