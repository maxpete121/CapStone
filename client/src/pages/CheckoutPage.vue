<template>
    <div class="container text-center text-info justify-content-center align-items-center">
        <div>
            <h1>Checkout</h1>
        </div>
        <form class="row" @submit.prevent="">
            <div class="mb-3 ">
                <label for="checkout-country">Country</label>
                <input v-model="checkoutData.country" class="form-control" type="text" name="checkout-country"
                    id="create-checkout-country" required minlength="3" maxlength="30">
            </div>
            <div class="mb-3 ">
                <label for="checkout-first-name">First Name</label>
                <input v-model="checkoutData.firstName" class="form-control" type="text" name="checkout-first-name"
                    id="checkout-first-name" required minlength="3" maxlength="30">
            </div>
            <div class="mb-3 ">
                <label for="checkout-last-name">Last Name</label>
                <input v-model="checkoutData.lastName" class="form-control" type="text" name="checkout-last-name"
                    id="checkout-last-name" minlength="5" maxlength="150">
            </div>
            <div class="mb-3 ">
                <label for="checkout-address">Address</label>
                <input v-model="checkoutData.address" class="form-control" type="text" name="checkout-address"
                    id="checkout-address" required minlength="5" maxlength="150">
            </div>
            <div class="mb-3 ">
                <label for="checkout-zip">Zip</label>
                <input v-model="checkoutData.zip" class="form-control" type="text" name="checkout-zip" id="checkout-zip"
                    required min="5" max="5">
            </div>
            <div class="mb-3 ">
                <label for="checkout-city">City</label>
                <input v-model="checkoutData.city" class="form-control" type="text" name="checkout-city" id="checkout-city"
                    required>
            </div>
            <div class="mb-3 ">
                <label for="checkout-state">State</label>
                <input v-model="checkoutData.state" class="form-control" type="text" name="checkout-state"
                    id="checkout-state" required>
            </div>
            <div class="mb-3 ">
                <label for="checkout-number">Phone Number</label>
                <input v-model="checkoutData.number" class="form-control" type="text" name="checkout-number"
                    id="checkout-number" required minlength="10" maxlength="11">
            </div>
            <div class="mb-3 ">
                <label for="checkout-credit">Credit Card Info</label>
                <input title="this is not secure in any way fyi" v-model="checkoutData.credit" class="form-control"
                    type="number" name="checkout-credit" id="checkout-credit" required min="10" max="11">
            </div>
            <div class="mb-3 ">
                <label for="checkout-email">Email</label>
                <input v-model="checkoutData.email" class="form-control" type="text" name="checkout-email"
                    id="checkout-email" required>
            </div>
            <div class="mb-3  d-flex align-items-center justify-content-center">
                <button class="btn btn-primary">Buy Now! <i class="mdi mdi-cash"></i></button>
            </div>
        </form>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
export default {
    setup() {
        const checkoutData = ref({})
        return {
            checkoutData,
        }
    }
};
</script>


<style lang="scss" scoped></style>