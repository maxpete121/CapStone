<template>
    <section class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-5 list-card-s text-light text-center mt-3">
                <h3>Welcome to your saved builds</h3>
            </div>
        </div>
        <div class="row">
            <div></div>
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
export default {
    setup(){
    return {  }
    }
};
</script>


<style lang="scss" scoped>
.list-card-s {
  outline: solid 2px #198754;
  border-radius: 10px;
  padding: 15px;
  background-color: #212529;
  box-shadow: 6px 9px 9px rgba(0, 0, 0, 0.699);
}
</style>