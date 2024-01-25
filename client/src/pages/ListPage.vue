<template>
    <section class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-4 bg-light d-flex flex-column align-items-center list-card mt-2">
                <span class="d-flex">
                    <h3 class="me-2">Hello</h3>
                    <h3>{{ account.name }}</h3>
                </span>
                <span>
                    <h4>Welcome to your PC builds!
                    </h4>
                </span>
                <span class="mt-2 text-center">
                    <form action="" class="d-flex flex-column">
                        <label for="">New Build Name</label>
                        <input type="text" required>
                        <button class="btn btn-outline-dark mt-2">Create New Build</button>
                    </form>
                </span>
            </div>
        </div>
        <div class="row"></div>
    </section>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { AppState } from '../AppState';
  export default {
    setup() {

        async function createNewList(){
            
        }
      return {
        account: computed(()=> AppState.account)
      }
    }
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