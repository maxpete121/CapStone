<template>
    <div class="v-tip text-light">
        <v-tour ref="tour" name="myTour" :steps="steps" :options="myOptions" :callbacks="myCallbacks"></v-tour>
    </div>
</template>
  
<script>
import { inject, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import { Account } from '../models/Account';
import { accountService } from '../services/AccountService';
import { partsService } from '../services/PartsService';
export default {

    setup() {
        const tour = ref(null)
        const tours = inject('tours')
        onMounted(() =>
            startTour()

        )
        async function startTour() {
            await partsService.getParts('cpu')
            tours['myTour'].start()
        }

        const parts = [`gpu`, `motherboard`, `ram`, `storage`, `cpuCooler`, `powerSupply`, `case`, `caseFan`]
        let step = AppState.currentStep
        return {
            tour,
            myCallbacks: {
                onNextStep: async () => {
                    console.log('Going forward a step, also Jerms is the goat');
                    partsService.getParts(parts[step])
                    step++
                    AppState.currentStep = step
                    console.log('step', step)
                    console.log('current step', AppState.currentStep)
                },
                onPreviousStep: () => {
                    console.log('going back a step');
                    partsService.getParts(parts[step])
                    step--
                    AppState.currentStep = step
                    console.log('step', step)
                    console.log('current step', AppState.currentStep)
                },
                onSkip: () => {
                    console.log('skipping tour')
                    accountService.doneTour()
                }
            },
            myOptions: {
                useKeyBoardNavigation: false,
                labels: {
                    buttonSkip: 'Skip Tour?',
                    buttonPrevious: 'Previous Part!',
                    buttonNext: 'Next Part!',
                    buttonStop: 'Finish!'
                }
            },
            steps: [
                // {
                //     target: '#v-step-0',
                //     header: {
                //         title: 'Get Started building your dream PC',
                //     },
                //     params: {
                //         placement: 'top'
                //     }
                // },
                {
                    target: '#v-step-1',
                    content: 'Begin by selecting a CPU!',
                    params: {
                        placement: 'right'
                    }
                },
                {
                    target: '#v-step-2',
                    content: 'Select a GPU!',
                    params: {
                        placement: 'right'
                    }
                },
                {
                    target: '#v-step-3',
                    content: 'Select a MotherBoard!',
                    params: {
                        placement: 'right'
                    },
                },
                {
                    target: '#v-step-4',
                    content: 'Select Ram!',
                    params: {
                        placement: 'right'
                    }
                },
                {
                    target: '#v-step-5',
                    content: 'Select Storage!',
                    params: {
                        placement: 'right'
                    }
                },
                {
                    target: '#v-step-6',
                    content: 'Select Cooling System!',
                    params: {
                        placement: 'right'
                    }
                },
                {
                    target: '#v-step-7',
                    content: 'Select PowerSupply!',
                    params: {
                        placement: 'right'
                    }
                },
                {
                    target: '#v-step-8',
                    content: 'Select a Case!',
                    params: {
                        placement: 'right'
                    }
                },
                {
                    target: '#v-step-9',
                    content: 'Select Fan!',
                    params: {
                        placement: 'right'
                    }
                },
            ],
            options: {
                highlight: true
            }
        }
    }
}
</script>

<style lang="scss">
.v-tip {
    color: rgb(255, 255, 255);
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 20px;
    justify-content: end;
    align-items: end;
    align-self: self-end;
}
</style>


