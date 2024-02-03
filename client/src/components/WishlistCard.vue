<template>
    <div class="list-card-s d-flex justify-content-between align-items-center">
        <div class="power-card-s p-3 ms-4">
            <div class="power-card-s p-2 text-center">
                <h5 class="fst-italic">{{ savedBuild.pc.name }}</h5>
            </div>
            <div class="power-card-s p-2 mt-3 d-flex justify-content-center align-items-center">
                <h6 class="me-2">Price:</h6>
                <h6 class="text-success">${{ newPrice }}</h6>
            </div>
            <div class="power-card-s p-2 mt-3 d-flex justify-content-center align-items-center">
                <h6 class="me-2">Power Score:</h6>
                <h6 class="text-danger"><i class="mdi mdi-arm-flex"></i>{{ savedBuild.pc.powerScore }}</h6>
            </div>
        </div>
        <div class="list-child-s d-flex flex-column p-3 justify-content-center me-3">
            <button class="btn btn-outline-success mb-2 button-s">Add To Cart</button>
            <button class="btn btn-outline-danger mt-2 button-s">Remove</button>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { Saved } from '../models/Saved';
export default {
    props: {savedBuild: {type: Saved, required: true}},
    setup(props){

        async function deleteSaved(){}
    return { 
        newPrice: computed(()=>{
            let price = props.savedBuild.pc.price
            let rounded = Math.round(price * 100) / 100
            return rounded
        })
     }
    }
};
</script>


<style lang="scss" scoped>
.list-card-s {
  outline: solid 2px #198754;
  border-radius: 10px;
  padding: 15px;
  background-color: rgb(0, 0, 0);
  color: white;
  box-shadow: 6px 9px 9px rgba(0, 0, 0, 0.699);
}

.power-card-s {
  background-color: #212529;
  color: rgb(13, 155, 176);
  border-radius: 15px;
  padding-top: 5px;
  outline: solid 2px rgb(13, 155, 176);
  box-shadow: 3px 9px 9px rgba(0, 0, 0, 0.777);
}

.list-child-s{
    background-color: #212529;
    outline: solid 2px #198754;
    border-radius: 10px;
    height: 50%;
}

.button-s{
    box-shadow: 2px 5px 5px black;
}
</style>