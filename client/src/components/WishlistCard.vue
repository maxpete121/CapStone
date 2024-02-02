<template>
    <div class="list-card-s d-flex">
        <div class="power-card-s p-3">
            <div class="power-card-s p-2 text-center">
                <h6>{{ savedBuild.pc.name }}</h6>
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
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { Saved } from '../models/Saved';
export default {
    props: {savedBuild: {type: Saved, required: true}},
    setup(props){
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
</style>