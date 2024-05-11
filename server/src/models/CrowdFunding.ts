import mongoose, { Document, Schema } from 'mongoose';

interface ICrowdFunding {
    title: string,
    body: string,
    isAllowed: boolean;
    status: string;
    image: string;
    video: string;
    user: mongoose.Types.ObjectId;
    donations: {
        user: mongoose.Types.ObjectId;
        amount: string;
        date: Date;
    }[],
    amountRaised: string;
    amountWithdrawn: number;
    amountNeeded: string;
    fundraisingFor: string;
    account: {
        accountName: string,
        bank: string,
        accountNumber: string,
        bankCode: string
    };
    location: {
        state: string,
        lga: string
    }
}

const crowdFundingSchema = new Schema<ICrowdFunding>({
    title: { type: String },
    body: { type: String },
    isAllowed: { type: Boolean, default: false },
    image: { type: String },
    status: { type: String, default: 'in-progress' },
    video: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    donations: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        amount: { type: String },
        date: { type: Date }
    }],
    amountNeeded: { type: String },
    amountWithdrawn: { type: Number, default: 0 },
    amountRaised: { type: String },
    fundraisingFor: { type: String },
    account: {
        accountName: { type: String },
        bank: { type: String },
        accountNumber: { type: String },
        bankCode: { type: String }
    },
    location: {
        state: { type: String },
        lga: { type: String }
    }
}, { timestamps: true });

crowdFundingSchema.pre(['findOne', 'find'], function (next) {
    this.populate({
        path: 'user',
        select: 'firstName lastName image email.'
      });
    next();
});

export interface ICrowdFundingModel extends Document, ICrowdFunding {}

const CrowdFunding = mongoose.model<ICrowdFundingModel>('CrowdFunding', crowdFundingSchema as any);

export default CrowdFunding;