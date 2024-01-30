<template>
  <section class="container-fluid">
    <section class="row justify-content-center mt-4">
      <div class="col-8 d-flex info-box p-2 rounded-2 justify-content-between">
        <div class="w-50">
          <img class="top-img rounded-2" src="https://revolutionized.com/wp-content/uploads/sites/5/2021/08/person_building_a_PC-transformed.jpg" alt="">
        </div>
        <div class="text-light place d-flex flex-column align-items-center ms-4">
          <span class="text-center">
            <h4>Looking for a gaming PC?</h4>
            <h5>Start our build walkthrough!</h5>
            <h6>We'll help you build the PC of your dreams!</h6>
          </span>
          <span class="text-center">
            <button class="btn btn-outline-light mt-2">Start your build!</button>
          </span>
        </div>
      </div>
    </section>
    <section class="row mt-4 justify-content-center text-center">
      <div class="col-5 rounded-2 me-2 m-1 info-box">
        <h3 class="text-success">Top rated builds <i class="mdi mdi-star text-warning"></i><i class="mdi mdi-star text-warning"></i><i class="mdi mdi-star text-warning"></i></h3>
        <div></div>
      </div>
      <div class="col-4 rounded-2 ms-2 m-1 p-3 info-box text-center">
        <h3 class="text-success">Recent Customer Builds <i class="mdi mdi-check-outline text-success"></i></h3>
        <div v-for="sharedBuild in sharedBuilds" class="mt-3 d-flex flex-column align-items-center">
          <HomeBuilds :shareBuild="sharedBuild"/>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { pcService } from '../services/PcService';
import HomeBuilds from '../components/HomeBuilds.vue';
export default {
  setup() {
    onMounted(()=>{
      getSharedBuilds()
    })
    async function getSharedBuilds(){
      await pcService.getSharedBuilds()
    }
    return {
      sharedBuilds: computed(()=> AppState.sharedBuilds)
    }
  }, components: {HomeBuilds}
}
</script>

<style scoped lang="scss">
.place{
  margin-right: 130px;
  margin-top: 55px;
}
.info-box{
  outline: solid 2px rgb(17, 114, 156);
  background-color: #212529;
  color: white;
  box-shadow: 3px 7px 7px rgba(0, 0, 0, 0.588);
}
.top-img{
  height: 260px;
  width: 260px;
}
img {
  height: 90vh;
  width: 100% !important;
  object-fit: cover;
}
</style>
