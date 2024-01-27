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
      <span class="power d-flex">
        <h6 class="">Power: ⚡</h6>
        <h6>{{ activePart.part.powerScore }}</h6>
      </span>
    </div>
    <div class="ms-3">
      <button @click="deletePart()" class="btn btn-outline-dark"><i class="mdi mdi-delete"></i></button>
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
        await partsService.deletePart(props.activePart.id)
        pcService.updateDelete(props.activePart.part)
        document.getElementById(`${props.activePart.part.type}`).style.display= 'inline'
      }
      return {
        deletePart,
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
    padding: 5px;
    border-radius: 10px;
    outline: solid 2px purple;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.562);
  }
  .product-img{
    height: 70px;
    width: 70px;
  }
  .list-card{
    outline: solid 2px purple;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 5px 8px 5px rgba(0, 0, 0, 0.54);
  }
</style>