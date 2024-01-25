<template>
    <div class="card border shadow m-2 text-center">
        <div>
            <img :src="part.productImage" :alt="part.name" :title="part.name">
        </div>
        <h2>{{ part.name }}</h2>
        <h3>{{ part.company }}</h3>
        <h4>{{ part.price }}</h4>
        <h5>{{ part.speed }}</h5>
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
img {
    height: 20vh;
    object-fit: contain;
    object-position: center;
}
</style>