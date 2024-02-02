<template>
  <section class="">
    <div class="container-fluid">
      <section class="row justify-content-center">
        <div class="col-12 text-center list-card d-flex flex-column align-items-center w-25 mt-4">
          <div class="about text-center text-info ">
            <h1>Welcome {{ account.name }}</h1>
            <img class="rounded bg-img" :src="account.picture" alt="" />
            <h3>{{ account.email }}</h3>
          </div>
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
  </section>
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

.list-card{
    outline: solid 2px #0cbc87;
    border-radius: 10px;
    padding: 15px;
    background-color: #212529;
    box-shadow: 5px 8px 5px rgba(0, 0, 0, 0.54);
  }
.bg-img {
  height: 80px;
  width: 80px;
  object-fit: contain;
  object-position: center;
}
</style>
