<template>
  <div class="list-card d-flex justify-content-between">
    <div class="d-flex align-items-center">
      <span class="me-4">
        <img class="img-fluid product-img rounded-circle" :src="activePart.part.productImage" alt="">
      </span>
      <span class="ms-4">
        <span class="d-flex">
          <h6 class="me-2">▪️</h6>
          <h6>{{ activePart.part.name }}</h6>
        </span>
        <span class="d-flex">
          <h6 class="me-2">▪️</h6>
          <h6>$</h6>
          <h6>{{ activePart.part.price }}</h6>
        </span>
        <span class="d-flex">
          <h6 class="me-2">▪️</h6>
          <h6>{{ activePart.part.company }}</h6>
        </span>
      </span>
      <span class="power d-flex align-items-baseline p-2">
        <h6 class="mt-1">Power:</h6>
        <h6 class="text-danger me-2"><i class="mdi mdi-arm-flex"></i>{{ activePart.part.powerScore }}</h6>
      </span>
    </div>
    <div class="ms-3">
      <button v-if="account.id == activePart.accountId" @click="deletePart()" class="btn btn-outline-danger"><i class="mdi mdi-delete"></i></button>
    </div>
  </div>
  </template>
  
  <script>
  import { computed } from 'vue'
  import { AppState } from '../AppState'
  import { AuthService } from '../services/AuthService'
import { NewPart } from '../models/NewPart'
import {partsService} from '../services/PartsService.js'
import { pcService } from '../services/PcService'
  export default {
    props:{activePart: {type: NewPart, required: true}},
    setup(props) {
      async function deletePart(){
        if(window.confirm('Are you sure you want to delete this part?')){
          await pcService.updateDelete(props.activePart.part)
          await partsService.deletePart(props.activePart.id)
          scrollTo(0, 0)
        }
      }
      return {
        deletePart,
        account: computed(()=> AppState.account)
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .power{
    position: absolute;
    margin-left: 250px;
    margin-top: 30px;
    background-color: black;
    color: white;
    border-radius: 10px;
    outline: solid 2px #0cbc87;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.562);
  }
  .product-img{
    height: 70px;
    width: 70px;
  }
  .list-card{
    outline: solid 2px rgb(13, 155, 176);
    background-color: #212529;
    color: #0cbc87;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 5px 8px 5px rgba(0, 0, 0, 0.54);
  }
</style>