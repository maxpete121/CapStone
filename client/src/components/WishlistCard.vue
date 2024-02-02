<template>
    <div class="list-card-s">
        <h3>{{ savedBuild.pc.name }}</h3>

    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { Saved } from '../models/Saved';
export default {
    props: {savedBuild: {type: Saved, required: true}},
    setup(props){
    return {  }
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
</style>