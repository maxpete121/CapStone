<template>
    <div class="v-tip text-dark">
        <v-tour name="myTour" :steps="steps" :options="options"></v-tour>
    </div>
</template>
  
<script>
export default {
    name: 'my-tour',
    data() {
        return {
            steps: [
                {
                    target: '#v-step-0',
                    header: {
                        title: 'Get Started building your dream PC',
                    },
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '#v-step-1',
                    content: 'Begin by selecting a CPU!',
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '#v-step-2',
                    content: 'Select a GPU',
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '#v-step-3',
                    content: 'Select a MotherBoard',
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '#v-step-4',
                    content: 'Select Ram',
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '#v-step-5',
                    content: 'Select Storage',
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '#v-step-6',
                    content: 'Select Cooling System!',
                    params: {
                        placement: 'bottom'
                    }
                },
                {
                    target: '#v-step-7',
                    content: 'Select PowerSupply!',
                    params: {
                        placement: 'bottom'
                    }
                },
                {
                    target: '#v-step-8',
                    content: 'Select a Case!',
                    params: {
                        placement: 'bottom'
                    }
                },
                {
                    target: '#v-step-9',
                    content: 'Select Fan!',
                    params: {
                        placement: 'bottom'
                    }
                },
            ],
            options: {
                highlight: true
            }
        }
    },
    mounted: function () {
        this.$tours['myTour'].start()
    }
}
</script>

<style scoped lang="scss">
.v-tip {
    background-color: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 13px;
}
</style>


