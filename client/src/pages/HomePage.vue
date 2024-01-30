<template>
  <section class="container-fluid mb-2">
    <section class="row justify-content-center mt-4 align-items-center">
      <div class="col-8 d-flex info-box p-2 rounded-2 justify-content-between align-items-center">
        <div class="w-50">
          <img class="top-img img-fluid rounded-2" src="https://static.ffx.io/images/$zoom_0.135%2C$multiply_0.7725%2C$ratio_1.5%2C$width_756%2C$x_0%2C$y_0/t_crop_custom/q_86%2Cf_auto/6fa631de81437f5f9f66ea5c590371388493dbb1" alt="">
        </div>
        <div class="text-light place d-flex flex-column align-items-center ms-4 info-child">
          <span class="text-center text-success">
            <h4>Looking for a gaming PC?</h4>
            <h5>Start our build walkthrough!</h5>
            <h6>We'll help you build the PC of your dreams!</h6>
          </span>
          <span class="text-center">
            <button class="btn btn-outline-success mt-2">Start your build!</button>
          </span>
        </div>
      </div>
    </section>
    <section class="row mt-4 justify-content-center text-center">
      <div class="col-lg-5 col-8 rounded-2 me-lg-2 m-1 info-box">
        <div class="sticky-top title-bg p-1">
          <h3 class="text-success">Top rated builds <i class="mdi mdi-star text-warning"></i><i class="mdi mdi-star text-warning"></i><i class="mdi mdi-star text-warning"></i></h3>
        </div>
        <div></div>
      </div>
      <div class="col-lg-5 col-8 rounded-2 ms-lg-2 mt-3 mt-lg-1 pb-3 info-box-scroll text-center">
        <div class="sticky-top title-bg p-1">
          <h3 class="text-success">Recent Customer Builds <i class="mdi mdi-check-outline text-success"></i></h3>
        </div>
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

.title-bg{
  backdrop-filter: blur(15px);
}
.place{
  margin-right: 130px;
}
.info-box{
  outline: solid 2px rgb(17, 114, 156);
  background-color: #212529;
  color: white;
  box-shadow: 3px 7px 7px rgba(0, 0, 0, 0.588);
}
.info-box-scroll{
  outline: solid 2px rgb(17, 114, 156);
  background-color: #212529;
  color: white;
  box-shadow: 3px 7px 7px rgba(0, 0, 0, 0.588);
  overflow-y: scroll;
  height: 450px;
}

.info-child{
  outline: solid 2px #0cbc87;
  background-color: black;
  border-radius: 15px;
  padding: 9px;
  box-shadow: 1px 6px 6px black;
}
.top-img{
  height: 240px;
  width: 220px;
}
img {
  height: 90vh;
  width: 100% !important;
  object-fit: cover;
}
</style>
