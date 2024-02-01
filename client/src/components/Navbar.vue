<template>
  <nav class="navbar navbar-expand-sm px-3 nav-edit">
    <router-link v-if="account.id" class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center text-light">
        <h2 class="text-success">💻PC Build Bois</h2>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'Lists' }" class="btn text-success lighten-30 selectable text-uppercase">
            My Builds
          </router-link>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <button v-if="account.id" class="btn btn-primary" type="button" data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" @click="getCartItems()">Cart</button>
      <div>
        <button class="btn text-light" @click="toggleTheme"><i class="mdi"
            :class="theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></i></button>
      </div>
      <Login />
    </div>
  </nav>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasRightLabel">Your Cart</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div v-for="cartItem in cartItems">
        <CartItem class="mt-3" :cartItem="cartItem" />
      </div>
    </div>
    <div class="offcanvas-footer d-flex justify-content-between align-items-baseline">
      <div class="m-2 d-flex">
        <h5 class="me-2">Cart Total:</h5>
        <h5>${{ total }}</h5>
      </div>
      <div class="m-2">
        <RouterLink :to="{ name: 'Checkout' }" class="btn btn-outline-success">Checkout</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';
import { AppState } from '../AppState';
import { cartService } from '../services/CartService.js';
import CartItem from './CartItem.vue';
export default {
  setup() {
    const theme = ref(loadState('theme') || 'light')
    let accountId = computed(() => AppState.account)
    onMounted(() => {
      document.documentElement.setAttribute('data-bs-theme', theme.value)
    })
    async function getCartItems() {
      await cartService.getCartItems(accountId.value.id)
    }
    return {
      theme,
      toggleTheme() {
        theme.value = theme.value == 'light' ? 'dark' : 'light'
        document.documentElement.setAttribute('data-bs-theme', theme.value)
        saveState('theme', theme.value)
      },
      account: computed(() => AppState.account),
      cartItems: computed(() => AppState.cartItems),
      getCartItems,
      total: computed(() => {
        let cart = AppState.cartItems
        let price = 0
        for (let i = 0; i < AppState.cartItems.length; i++) {
          price += cart[i].pc.price
        }
        return Math.round(price * 100) / 100
      })
    }
  },
  components: { Login, CartItem }
}
</script>

<style scoped>
.nav-edit {
  border-bottom: solid 2px rgb(17, 114, 156);
  background-color: #212529;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.453);
}

a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {

  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
