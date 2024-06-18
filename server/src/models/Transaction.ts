import mongoose, { Document, Schema } from 'mongoose';

interface ITransactions {
    reference: string,
    amount: number,
    status: string,
    type: string,
    serviceStatus: string | null,
    authorizationUrl: string | null,
    last4: string | null,
    expMonth: string | null,
    expYear: string | null,
    channel: string | null,
    cardType: string | null,
    bank: string | null,
    countryCode: string,
    brand: string | null,
    currency: string,
    paidAt: Date,
    user: mongoose.Types.ObjectId;
    crowedFunding: mongoose.Types.ObjectId;
};

const transactionSchema = new Schema<ITransactions>({
    reference: { type: String },
    amount: { type: Number },
    status: { type: String },
    type: { type: String },
    serviceStatus: { type: String, allowNull: true },
    authorizationUrl: { type: String, allowNull: true },
    last4: { type: String, allowNull: true },
    expMonth: { type: String, allowNull: true },
    expYear: { type: String, allowNull: true },
    channel: { type: String, allowNull: true },
    cardType: { type: String, allowNull: true },
    bank: { type: String, allowNull: true },
    countryCode: { type: String },
    brand: { type: String, allowNull: true },
    currency: { type: String },
    paidAt: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    crowedFunding: { type: Schema.Types.ObjectId, ref: 'CrowdFunding' }
});

transactionSchema.pre(['findOne', 'find'], function (next) {
    this.populate({
        path: 'user',
        select: 'firstName lastName'
      });
    next();
});

transactionSchema.pre(['findOne', 'find'], function (next) {
    this.populate({
        path: 'crowedFunding',
        select: 'title fundraisingFor'
      });
    next();
});
  
export interface ITransactionModel extends Document, ITransactions {}
  
const Transaction = mongoose.model<ITransactionModel>('Transaction', transactionSchema as any);

export default Transaction