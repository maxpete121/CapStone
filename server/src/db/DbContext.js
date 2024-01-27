import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { PcBuildSchema } from '../models/PcBuild.js';
import { StockPartSchema } from '../models/StockPart.js';
import { BuildPartSchema } from '../models/BuildPart.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  PcBuilds = mongoose.model('PcBuild', PcBuildSchema);

  StockParts = mongoose.model('StockPart', StockPartSchema);

  NewParts = mongoose.model('NewPart', BuildPartSchema);
}

export const dbContext = new DbContext()
