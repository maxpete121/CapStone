<template>
  <div class="list-card-m d-flex w-75 justify-content-center align-items-center">
    <div class="power-card-m p-3 me-4 d-flex flex-column justify-content-center">
      <div class="power-card-m">
        <h5 class="fst-italic">{{ shareBuild.name }}</h5>
      </div>
      <div class="d-flex power-card-m justify-content-between align-items-center mt-3">
        <h6 class="ms-2 me-2">Power Score: </h6>
        <h6 class="me-2 text-danger"><i class="mdi mdi-arm-flex"></i>{{ shareBuild.powerScore }}</h6>
      </div>
      <div class="d-flex power-card-m justify-content-center align-items-center mt-3">
        <h6 class="me-2">Price:</h6>
        <h6 class="text-warning">${{ shareBuild.price }}</h6>
      </div>
      <div class="power-card-m mt-3">
        <h6 class="text-warning" v-if="shareBuild.rating == 5"><i class="mdi mdi-star"></i>
          <i class="mdi mdi-star"></i>
          <i class="mdi mdi-star"></i>
          <i class="mdi mdi-star"></i>
          <i class="mdi mdi-star"></i>
        </h6>
        <h6 v-else-if="shareBuild.rating == 'No reviews' || shareBuild.rating == 0">No Reviews
        </h6>
        <h6 class="text-warning" v-else-if="shareBuild.rating < 5 && shareBuild.rating >= 4.5"><i class="mdi mdi-star"></i>
          <i class="mdi mdi-star"></i>
          <i class="mdi mdi-star"></i>
          <i class="mdi mdi-star"></i>
          <i class="mdi mdi-star-half"></i>
        </h6>
        <h6 class="text-warning" v-else-if="shareBuild.rating == 4"><i class="mdi mdi-star"></i>
          <i class="mdi mdi-star"></i>
          <i class="mdi mdi-star"></i>
          <i class="mdi mdi-star"></i>
        </h6>
        <h6 class="text-warning" v-else-if="shareBuild.rating < 4 && shareBuild.rating >=3.5"><i class="mdi mdi-star"></i>
          <i class="mdi mdi-star"></i>
          <i class="mdi mdi-star"></i>
          <i class="mdi mdi-star-half"></i>
        </h6>
        <h6 class="text-warning" v-else-if="shareBuild.rating == 3"><i class="mdi mdi-star"></i>
          <i class="mdi mdi-star"></i>
          <i class="mdi mdi-star"></i>
        </h6>
        <h6 class="text-warning" v-else-if="shareBuild.rating >= 2.5"><i class="mdi mdi-star"></i>
          <i class="mdi mdi-star"></i>
          <i class="mdi mdi-star-half"></i>
        </h6>
        <h6 class="text-warning" v-else-if="shareBuild.rating == 2"><i class="mdi mdi-star"></i>
          <i class="mdi mdi-star"></i>
        </h6>
        <h6 class="text-warning" v-else-if="shareBuild.rating >= 1.5"><i class="mdi mdi-star"></i>
          <i class="mdi mdi-star-half"></i>
        </h6>
        <h6 class="text-warning" v-else-if="shareBuild.rating == 1"><i class="mdi mdi-star"></i></h6>
      </div>
    </div>
    <div class="justify-content-center ms-4">
      <div class="price-card-m d-flex flex-column p-3">
        <button @click="addItem()" class="btn btn-outline-success button-m">Add to cart</button>
        <button @click="getPcReviews()" class="btn btn-outline-success button-m mt-2" data-bs-toggle="modal"
          :data-bs-target="target">
          Reviews
        </button>
        <div class="modal fade" :id="catchId" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content bg-dark">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{ shareBuild.name }}</h5>
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
                    <option class="text-capitalize my-2" v-for="rating in ratings" :value="rating">{{ rating }}</option>
                  </select>
                  <div class="mb-3 d-flex align-items-end justify-content-center">
                    <button class="btn btn-primary my-2">Create Reviews <i class="mdi mdi-plus"></i></button>
                  </div>
                </form>
              </div>
              <div v-for="review in reviews" :key="review.id">
                <ReviewCard :review="review" />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <button @click="viewBuild()" class="btn btn-outline-success mt-2 button-m">Details</button>
        <button class="btn btn-outline-success mt-2 button-m">Whishlist</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { PcList } from '../models/PcList'
import { pcService } from '../services/PcService'
import { router } from '../router';
import Pop from '../utils/Pop';
import { useRoute } from 'vue-router';
import { reviewsService } from '../services/ReviewsService.js';
import { cartService } from '../services/CartService'
import ReviewCard from './ReviewCard.vue'
export default {
  props: { shareBuild: { type: PcList, required: true } },
  setup(props) {
    const reviewData = ref({})
    const route = useRoute()
    async function viewBuild() {
      await pcService.viewBuild(props.shareBuild.id)
      router.push({ name: 'ViewBuild', params: { PcId: props.shareBuild.id } })
    }

    async function getPcReviews() {
      try {
        await reviewsService.getPcReviews(props.shareBuild.id)
      } catch (error) {
        Pop.error(error)
      }
    }

    async function createReview() {
      try {
        // reviewData.value.pcId = props.shareBuild.id
        await reviewsService.createReview(reviewData.value, props.shareBuild.id)
        reviewData.value = {}
        await reviewMath(props.shareBuild.id ,props.shareBuild)
        pcService.getTopRated()
        Pop.success('Review Posted!')
      } catch (error) {
        Pop.error(error)
      }

    }

    async function reviewMath(pcId, buildData){
      await pcService.reviewMath(pcId, buildData)
    }


    async function addItem() {
      await cartService.addItem(props.shareBuild.id)
      Pop.success('Item added')
    }
    return {
      viewBuild,
      reviewData,
      ratings: [1, 2, 3, 4, 5],
      account: computed(() => AppState.account),
      reviews: computed(() => AppState.reviews),
      createReview,
      getPcReviews,
      addItem,
      target: computed(()=>{
        let pc = "#mod"
        pc += `${props.shareBuild.id}`
        return pc
      }),
      catchId: computed(()=>{
        let pc = "mod"
        pc += `${props.shareBuild.id}`
        return pc
      })

    }
  },
  components: { ReviewCard }
}
</script>

<style lang="scss" scoped>
.button-m {
  box-shadow: 0px 5px 5px black;
}

.price-card-m {
  background-color: #212529;
  color: white;
  border-radius: 15px;
  padding-top: 5px;
  padding-left: 7px;
  padding-right: 7px;
  outline: solid 2px #0cbc87;
  box-shadow: 0px 9px 9px rgba(0, 0, 0, 0.729);
}

.power-card-m {
  background-color: #212529;
  color: rgb(13, 155, 176);
  border-radius: 15px;
  padding-top: 5px;
  outline: solid 2px rgb(13, 155, 176);
  box-shadow: 3px 9px 9px rgba(0, 0, 0, 0.777);
}

.list-card-m {
  outline: solid 2px #198754;
  border-radius: 10px;
  padding: 15px;
  background-color: rgb(0, 0, 0);
  color: black;
  box-shadow: 6px 9px 9px rgba(0, 0, 0, 0.699);
}
</style>