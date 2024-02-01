<template>
  <div class="about text-center text-info ">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded bg-img" :src="account.picture" alt="" />
    <h3>{{ account.email }}</h3>
  </div>
  <div class="container-fluid">
    <section class="row justify-content-center">
      <div class="col-12 text-center d-flex flex-column align-items-center w-25">
        <form @submit.prevent="updateAccount">
          <div class="mb-3">
            <label for="name">Name</label>
            <input v-model="update.name" class="form-control" id="name" type="text" required>
          </div>
          <div class="mb-3">
            <label for="picture">Picture</label>
            <input v-model="update.picture" class="form-control" id="picture" type="url" required>
          </div>
          <!-- <div class="mb-3">
            <label class="mx-2" for="tour">Reset Tour: </label>
            <input v-model="update.tour" id="tour" type="checkbox">
          </div> -->
          <div class="text-center mb-3">
            <button class="btn btn-outline-success" type="submit">Update</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, watch, ref } from 'vue';
import { AppState } from '../AppState';
import { accountService } from '../services/AccountService';
import Pop from '../utils/Pop';
export default {
  setup() {
    const update = ref({})
    const account = computed(() => AppState.account)
    watch(
      account,
      () => {
        update.value = { ...AppState.account }
      },
      { immediate: true }
    )
    return {
      update,
      account,
      async updateAccount() {
        try {
          const accountData = update.value
          await accountService.updateAccount(accountData)
          Pop.success('Updated Account!')
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
label {
  color: #0cbc87;
}

.bg-img {
  height: 80px;
  width: 80px;
  object-fit: contain;
  object-position: center;
}
</style>
