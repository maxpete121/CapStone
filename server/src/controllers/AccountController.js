import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { pcService } from '../services/PcService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/:pcId', this.getAccountsPcs)
      .put('/:accountId', this.updateTour)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAccountsPcs(request, response, next){
    try {
      let pcId = request.params.pcId
      let foundPc = await pcService.getAccountsPcs(pcId)
      response.send(foundPc)
    } catch (error) {
      next(error)
    }
  }

  async updateTour(request, response, next){
    try {
      let accountId = request.params.accountId
      let updated = await accountService.updateTour(accountId)
      response.send(updated)
    } catch (error) {
      next(error)
    }
  }
}
