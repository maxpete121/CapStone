<template>
    <section class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-lg-4 col-10 bg-light d-flex flex-column align-items-center list-card mt-2">
                <span class="d-flex">
                    <h3 class="me-2">Hello</h3>
                    <h3>{{ account.name }}</h3>
                </span>
                <span>
                    <h4>Welcome to your PC builds!
                    </h4>
                </span>
                <span class="mt-2 text-center">
                    <form @submit.prevent="createNewList()" action="" class="d-flex flex-column">
                        <label for="">New Build Name</label>
                        <input v-model="listData.name" type="text" required>
                        <button class="btn btn-outline-dark mt-2">Create New Build</button>
                    </form>
                </span>
            </div>
        </div>
        <div class="row flex-column align-items-center">
            <div class="col-5 list-card mt-3" v-for="list in lists">
                <PcListCard :list="list"/>
            </div>
        </div>
    </section>
  </template>
  
  <script>
  import { computed, onMounted, ref, watch } from 'vue';
  import { AppState } from '../AppState';
  import { pcService } from '../services/PcService.js';
  import PcListCard from '../components/PcListCard.vue';
  export default {
    setup() {
        let listData = ref({})
        let accountId = computed(()=> AppState.account)
        watch(accountId, getLists)
        async function createNewList(){
            await pcService.createNewList(listData.value)
        }

        async function getLists(){
            await pcService.getLists(accountId.value.id)
        }
      return {
        account: computed(()=> AppState.account),
        lists: computed(()=> AppState.userBuilds),
        listData,
        createNewList
      }
    }, components: {PcListCard}
  }
  </script>
  
  <style scoped>
  .list-card{
    outline: solid 2px purple;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 5px 8px 5px rgba(0, 0, 0, 0.54);
  }
  img {
    max-width: 100px;
  }
  </style>