<template>
    <div class="cart-card p-2 d-flex justify-content-evenly">
        <div>
            <h5>{{ cartItem.pc.name }}</h5>
            <span class="d-flex">
                <h6 class="ms-2">${{ newPrice }}</h6>
            </span>
        </div>
        <div class="ms-2 d-flex align-items-center mb-4">
            <span class="d-flex">
                <h6>Power:</h6>
                <h6 class="ms-2"><i class="mdi mdi-arm-flex"></i>{{ cartItem.pc.powerScore }}</h6>
            </span>
        </div>
        <div class="ms-2">
            <button @click="deleteItem()" class="btn btn-outline-danger"><i class="mdi mdi-delete"></i></button>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { Cart } from '../models/Cart';
import {cartService} from '../services/CartService.js'
export default {
    props: {cartItem: {type: Cart, required: true}},
    setup(props){
        async function deleteItem(){
            if(window.confirm('Are you sure you want to remove this item from your cart?')){
                await cartService.deleteItem(props.cartItem.id)
            }
        }
    return { 
        deleteItem,
        newPrice: computed(()=>{
            let price = Math.round(props.cartItem.pc.price * 100) / 100
            return price
        })
     }
    }
};
</script>


<style lang="scss" scoped>
.cart-card{
border-bottom: solid 2px black;

}
</style>