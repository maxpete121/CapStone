<template>
    <section class="row">
        <div class="text-center justify-content-center my-2">
            <p>{{ review.body }}</p>
            <span>{{ review.rating }}</span>
            <!-- <button v-if="review.creatorId == account.id" class="btn btn-danger"><i
    class="mdi mdi-delete"></i>Delete?</button> -->
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { Review } from '../models/Review';
export default {
    props: { review: { type: Review, required: true } },
    setup() {
        return {}
    }
};
</script>


<style lang="scss" scoped></style>