import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { PcBuildSchema } from '../models/PcBuild.js';
import { StockPartSchema } from '../models/StockPart.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  PcBuilds = mongoose.model('PcBuild', PcBuildSchema);

  StockParts = mongoose.model('StockPart', StockPartSchema);
}

export const dbContext = new DbContext()
