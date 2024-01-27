<template>
  <div class="list-card d-flex justify-content-between">
    <div class="d-flex">
      <span class="me-4">
        <img class="img-fluid product-img" :src="activePart.part.productImage" alt="">
      </span>
      <span class="ms-4">
        <h5>{{ activePart.part.name }}</h5>
        <span class="d-flex">
          <h6 class="me-2">Made by:</h6>
          <h6>{{ activePart.part.company }}</h6>
        </span>
        <span class="d-flex">
          <h6>$</h6>
          <h6>{{ activePart.part.price }}</h6>
        </span>
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
      }
      return {
        deletePart
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .product-img{
    height: 130px;
    width: 130px;
  }
  .list-card{
    outline: solid 2px purple;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 5px 8px 5px rgba(0, 0, 0, 0.54);
  }
</style>