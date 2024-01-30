<template>
    <div class="list-card-m">
        <div class="d-flex">
            <div class="price-card-m align-items-center me-3">
                <h5 class="fst-italic text-success">{{ shareBuild.name }}</h5>
            </div>
            <div class="d-flex price-card-m justify-content-between align-items-center me-3">
                <h6 class="ms-2">Power Score: </h6>
                <h6 class="me-2">⚡{{ shareBuild.powerScore }}</h6>
            </div>
            <div class="d-flex price-card-m justify-content-center align-items-center me-3">
                <h6>Price: $</h6>
                <h6>{{ shareBuild.price }}</h6>
            </div>
          </div>
          <div class="d-flex mt-3 justify-content-center">
            <div class="power-card-m p-2 d-flex align-items-center ps-3 pe-3">
              <h5 class="me-2">Review Score</h5>
              <button class="btn btn-outline-light">Reviews</button>
              <button @click="viewBuild()" class="btn btn-outline-light ms-3 me-3">Details</button>
              <button class="btn btn-outline-success">Add to cart</button>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue'
  import { AppState } from '../AppState'
  import { AuthService } from '../services/AuthService'
import { PcList } from '../models/PcList'
import { pcService } from '../services/PcService'
import { router } from '../router';
  export default {
    props: {shareBuild: {type: PcList, required: true}},
    setup(props) {
        async function viewBuild(){
            await pcService.viewBuild(props.shareBuild.id)
            router.push({name: 'ViewBuild', params:{PcId: props.shareBuild.id}})
        }
      return {
        viewBuild
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>


.price-card-m{
    background-color: black;
    color: white;
    border-radius: 15px;
    padding-top: 5px;
    padding-left: 7px;
    padding-right: 7px;
    outline: solid 2px purple;
    box-shadow: 3px 5px 3px rgba(0, 0, 0, 0.658);
}
.power-card-m{
    background-color: black;
    color: white;
    border-radius: 15px;
    padding-top: 5px;
    outline: solid 2px purple;
    box-shadow: 3px 5px 3px rgba(0, 0, 0, 0.658);
}

.list-card-m{
    outline: solid 2px purple;
    border-radius: 10px;
    padding: 15px;
    background-color: whitesmoke;
    color: black;
    box-shadow: 0px 5px 6px rgba(255, 255, 255, 0.488);
  }
</style>