<template>
  <div>{{ activePart.part }}L</div>
  </template>
  
  <script>
  import { computed } from 'vue'
  import { AppState } from '../AppState'
  import { AuthService } from '../services/AuthService'
import { NewPart } from '../models/NewPart'
  export default {
    props:{activePart: {type: NewPart, required: true}},
    setup() {
      return {
      }
    }
  }
  </script>
  
  <style lang="scss" scoped></style>