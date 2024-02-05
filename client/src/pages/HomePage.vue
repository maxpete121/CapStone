<template>
  <section class="container-fluid mb-2">
    <section class="row justify-content-center mt-4 align-items-center">
      <div class="col-8 d-flex info-box p-2 rounded-2 justify-content-between align-items-center">
        <div class="w-50">
          <img class="top-img img-fluid rounded-2"
            src="https://static.ffx.io/images/$zoom_0.135%2C$multiply_0.7725%2C$ratio_1.5%2C$width_756%2C$x_0%2C$y_0/t_crop_custom/q_86%2Cf_auto/6fa631de81437f5f9f66ea5c590371388493dbb1"
            alt="">
        </div>
        <div class="text-light place d-flex flex-column align-items-center ms-4 info-child">
          <span class="text-center text-success">
            <h4>Looking for a gaming PC?</h4>
            <h5>Start our build walkthrough!</h5>
            <h6>We'll help you build the PC of your dreams!</h6>
          </span>
          <span class="text-center">
            <router-link :to="{ name: 'Lists' }" class="btn btn-outline-success mt-2">Start your build!</router-link>
          </span>
        </div>
      </div>
    </section>
    <section class="row mt-4 justify-content-center text-center">
      <div class="col-lg-5 col-8 rounded-2 me-lg-2 m-1 info-box-scroll">
        <div class="sticky-top title-bg p-1">
          <h3 class="text-success">Top rated builds <i class="mdi mdi-star text-warning"></i><i
              class="mdi mdi-star text-warning"></i><i class="mdi mdi-star text-warning"></i></h3>
        </div>
        <div v-for="topBuild in topBuilds" class="mt-3 d-flex flex-column align-items-center">
          <HomeBuilds :shareBuild="topBuild" />
        </div>
      </div>
      <div class="col-lg-5 col-8 rounded-2 ms-lg-2 mt-3 mt-lg-1 pb-3 info-box-scroll text-center">
        <div class="sticky-top title-bg p-1">
          <h3 class="text-success">Recent Customer Builds <i class="mdi mdi-check-outline text-success"></i></h3>
        </div>
        <div v-for="sharedBuild in sharedBuilds" class="mt-3 d-flex flex-column align-items-center">
          <HomeBuilds :shareBuild="sharedBuild" />
        </div>
      </div>
    </section>
    <section class="row justify-content-center p-1 mt-2">
      <div class="col-3 info-box mt-3 rounded-2 text-center">
        <h4>About us!</h4>
        <P>The creators, Max Peterson and Skyler Kinney, are two of the industry's leading innovators of robust, dynamic,
          and impactful hardware to software solutions.</P>
      </div>
      <div class="col-3 info-box-two ms-4 me-4 mt-3 rounded-2 text-center p-1">
        <h4>Create a build!</h4>
        <div>
          <p>Start your journey to becoming a gaming legend! Create your build and make the perfect PC for you!</p>
          <router-link :to="{ name: 'Lists' }" class="mt-2 btn btn-outline-success mb-1">Create a build</router-link>
        </div>
      </div>
      <div class="col-3 info-box mt-3 d-flex flex-column rounded-2 text-center align-items-center p-1">
        <h4>Contact us!</h4>
        <div class="d-flex">
          <h5><i class="mdi mdi-phone"></i></h5>
          <h5 class="ms-2 fst-italic">Phone number:</h5>
          <a class="ms-3" href="">208-555-8763</a>
        </div>
        <div class="d-flex">
          <h5><i class="mdi mdi-mail"></i></h5>
          <h5 class="ms-2 fst-italic">Email:</h5>
          <a class="ms-3" href="">FakeEmail@mail.com</a>
        </div>
        <div class="d-flex">
          <h5><i class="mdi mdi-facebook"></i></h5>
          <h5 class="ms-2 fst-italic">Facebook:</h5>
          <a class="ms-3" href="">PCBuildBoi</a>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { computed, onMounted, watch } from 'vue';
import { AppState } from '../AppState';
import { pcService } from '../services/PcService';
import HomeBuilds from '../components/HomeBuilds.vue';
import { savedService } from '../services/SavedService.js'
export default {
  setup() {
    onMounted(() => {
      getSharedBuilds()
      getTopRated()
    })
    let accountWatch = computed(() => AppState.account)
    let shareWatch = computed(() => AppState.sharedBuilds)
    watch(shareWatch, getTopRated)
    watch(accountWatch, getSaved)
    async function getSharedBuilds() {
      await pcService.getSharedBuilds()
    }
    async function getSaved() {
      await savedService.getSaved(accountWatch.value.id)

    }

    async function getTopRated() {
      await pcService.getTopRated()
    }
    return {
      sharedBuilds: computed(() => AppState.sharedBuilds),
      topBuilds: computed(() => AppState.topRated),
    }
  }, components: { HomeBuilds }
}
</script>

<style scoped lang="scss">
.title-bg {
  backdrop-filter: blur(15px);
}

.place {
  margin-right: 130px;
}

.info-box {
  outline: solid 2px rgb(17, 114, 156);
  background-color: #212529;
  color: white;
  box-shadow: 5px 7px 7px rgba(0, 0, 0, 0.588);
}

.info-box-two {
  outline: solid 2px #0cbc87;
  background-color: #212529;
  color: white;
  box-shadow: 5px 7px 7px rgba(0, 0, 0, 0.588);
}

.info-box-scroll {
  outline: solid 2px rgb(17, 114, 156);
  background-color: #212529;
  color: white;
  box-shadow: 5px 7px 7px rgba(0, 0, 0, 0.701);
  overflow-y: scroll;
  height: 450px;
}

.info-child {
  outline: solid 2px #0cbc87;
  background-color: black;
  border-radius: 15px;
  padding: 9px;
  box-shadow: 4px 7px 6px black;
}

.top-img {
  height: 240px;
  width: 220px;
}

img {
  height: 90vh;
  width: 100% !important;
  object-fit: cover;
}
</style>
