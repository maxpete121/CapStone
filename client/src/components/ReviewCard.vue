<template>
    <section class="row">
        <div class="text-center text-dark justify-content-center my-2">
            <p>{{ review.body }}</p>
            <span>{{ review.rating }}</span>
            <div class="mt-2">
                <button @click="deleteReview(review.id)" v-if="review.creatorId == account.id" class="btn btn-danger"><i
                        class="mdi mdi-delete">Delete?</i></button>
            </div>
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { Review } from '../models/Review';
import Pop from '../utils/Pop';
import { reviewsService } from '../services/ReviewsService';
import { pcService } from '../services/PcService';
export default {
    props: { review: { type: Review, required: true } },
    setup(props) {
        return {
            account: computed(() => AppState.account),
            async deleteReview(reviewId) {
                try {
                    if (await Pop.confirm('Do you really want to take this back?')) {
                        await reviewsService.deleteReview(reviewId)
                        await pcService.updateReview(props.review.creatorId, props.review.pc)
                        Pop.success('Review Deleted')
                    } else {
                        Pop.error('We will just leave this here then.')
                    }
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped></style>