import { reactive, ref } from 'vue'
import { PcList } from './models/PcList.js'
import { NewPart } from './models/NewPart.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/StockPart.js').StockPart[]} */
  currentStock: [],
  /**@type {PcList[]} */
  userBuilds: [],
  /**@type {PcList} */
  activeBuild: {},

  currentStep: 0,

  reviews: [],

  /**@type {NewPart[]} */
  activeParts: [],

  tourActive: true,

  sharedBuilds: [],

  topReviewed: [],

  cartItems: []
})
