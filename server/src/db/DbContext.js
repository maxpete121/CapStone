import mongoose, { Mongoose } from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { PcBuildSchema } from '../models/PcBuild.js';
import { StockPartSchema } from '../models/StockPart.js';
import { BuildPartSchema } from '../models/BuildPart.js';
import { ReviewSchema } from '../models/Review';
import { CartSchema } from '../models/Cart.js';
import { SavedSchema } from '../models/Saved.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  PcBuilds = mongoose.model('PcBuild', PcBuildSchema);

  StockParts = mongoose.model('StockPart', StockPartSchema);

  NewParts = mongoose.model('NewPart', BuildPartSchema);

  Reviews = mongoose.model('Review', ReviewSchema);

  CartItems = mongoose.model('CartItem', CartSchema);

  Saved = mongoose.model('Saved', SavedSchema);
}

export const dbContext = new DbContext()
