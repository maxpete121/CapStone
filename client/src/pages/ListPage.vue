<template>
    <section class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-lg-4 col-10 d-flex flex-column align-items-center list-card-l mt-4">
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
                        <input class="form-control" v-model="listData.name" type="text" required>
                        <span>
                            <button class="btn btn-outline-success mt-2">Create New Build</button>
                        </span>
                    </form>
                </span>
            </div>
        </div>
        <div class="row flex-column align-items-center mb-3">
            <div class="col-4 list-card-l mt-4" v-for="list in lists">
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
        onMounted(()=>{
            getLists()
            scrollTo(0, 0)
        })
        watch(accountId, getLists)
        async function createNewList(){
            await pcService.createNewList(listData.value)
            listData.value = {}
        }

        async function getLists(){
            try {
                await pcService.getLists(accountId.value.id)
            } catch (error) {
                Error('No Id found.')
            }
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
  .list-card-l{
    outline: solid 2px rgb(13, 155, 176);
    border-radius: 10px;
    padding: 15px;
    color: #0cbc87;
    background-color: #212529;
    box-shadow: 5px 8px 5px rgba(0, 0, 0, 0.54);
  }
  img {
    max-width: 100px;
  }
  </style>