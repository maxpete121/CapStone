<template>
  <div class="list-card-m d-flex w-75 justify-content-center">
    <div class="price-card-m p-2 me-4 d-flex flex-column justify-content-center">
      <div class="">
        <h5 class="fst-italic text-success">{{ shareBuild.name }}</h5>
      </div>
      <div class="d-flex price-card-m justify-content-between align-items-center mt-2">
        <h6 class="ms-2">Power Score: </h6>
        <h6 class="me-2">⚡{{ shareBuild.powerScore }}</h6>
      </div>
      <div class="d-flex price-card-m justify-content-center align-items-center mt-3">
        <h6 class="me-2">Price:</h6>
        <h6>${{ shareBuild.price }}</h6>
      </div>
    </div>
    <div class="justify-content-center ms-4">
      <div class="power-card-m d-flex flex-column p-3">
        <h5 class="me-2">Review Score</h5>
        <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Reviews
        </button>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form v-if="account.id" class="row" @submit.prevent="createReview()">
                  <label class="text-center my-2" for="review-body">Make a Review!</label>
                  <input v-model="reviewData.body" class="form-control" type="text" name="review-body"
                    id="create-review-body" required minlength="5" maxlength="150">
                  <label for="review-rating" class="text-center my-2">Give the build a rating!</label>
                  <select v-model="reviewData.rating" name="review-rating" id="review-rating" class="form-control">
                    <option value="" selected disabled>Pick a rating for this build</option>
                    <option class="text-capitalize" v-for="rating in ratings" :value="rating">{{ rating }}</option>
                  </select>
                  <div class="mb-3 d-flex align-items-end justify-content-center">
                    <button class="btn btn-primary">Create Reviews <i class="mdi mdi-plus"></i></button>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        <button @click="viewBuild()" class="btn btn-outline-success mt-2">Details</button>
        <button class="btn btn-outline-success mt-2">Add to cart</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import { computed, ref } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { PcList } from '../models/PcList'
import { pcService } from '../services/PcService'
import { router } from '../router';
import Pop from '../utils/Pop'
import { useRoute } from 'vue-router'
import { reviewsService } from '../services/ReviewsService'
export default {
  props: { shareBuild: { type: PcList, required: true } },
  setup(props) {
    const reviewData = ref({})
    const route = useRoute()
    async function viewBuild() {
      await pcService.viewBuild(props.shareBuild.id)
      router.push({ name: 'ViewBuild', params: { PcId: props.shareBuild.id } })
    }
    return {
      viewBuild,
      reviewData,
      ratings: [1, 2, 3, 4, 5],
      account: computed(() => AppState.account),
      async createReview() {
        try {
          reviewData.value.PcId = route.params.PcId
          await reviewsService.createReview(reviewData.value)
          Pop.success('Review Posted!')
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>
  
<style lang="scss" scoped>
.price-card-m {
  background-color: black;
  color: white;
  border-radius: 15px;
  padding-top: 5px;
  padding-left: 7px;
  padding-right: 7px;
  outline: solid 2px purple;
  box-shadow: 3px 5px 3px rgba(0, 0, 0, 0.658);
}

.power-card-m {
  background-color: black;
  color: white;
  border-radius: 15px;
  padding-top: 5px;
  outline: solid 2px purple;
  box-shadow: 3px 5px 3px rgba(0, 0, 0, 0.658);
}

.list-card-m {
  outline: solid 2px purple;
  border-radius: 10px;
  padding: 15px;
  background-color: whitesmoke;
  color: black;
  box-shadow: 0px 5px 6px rgba(255, 255, 255, 0.488);
}
</style>