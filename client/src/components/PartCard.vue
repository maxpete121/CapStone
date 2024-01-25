<template>
    <div :title="`Add ${part.name} to build`" class="list-card border shadow m-2 text-center">
        <div>
            <img class="img-fluid" :src="part.productImage" :alt="part.name">
        </div>
        <div class="spec-card">
            <h2>{{ part.name }}</h2>
            <h3>{{ part.company }}</h3>
            <h4>{{ part.price }}</h4>
            <h5>{{ part.speed }}</h5>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { StockPart } from '../models/StockPart.js';
export default {
    props: { part: { type: StockPart, required: true } },
    setup() {
        return {}
    }
};
</script>


<style lang="scss" scoped>
.list-card{
    outline: solid 2px purple;
    border-radius: 10px;
    padding: 15px;
    background-color: white;
    box-shadow: 5px 8px 5px rgba(0, 0, 0, 0.54);
  }
  .list-card:hover{
    outline: solid 2px purple;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 5px 8px 5px rgba(0, 0, 0, 0.54);
    background-color: white;
    transform: scale(1.02);
    cursor: pointer;
  }

  .spec-card{
    background-color: whitesmoke;
    color: black;
    border-radius: 15px;
    padding: 10px;
    outline: solid 2px purple;
    box-shadow: 3px 5px 3px rgba(0, 0, 0, 0.658);
}
img {
    height: 20vh;
    object-fit: contain;
    object-position: center;
}
</style>