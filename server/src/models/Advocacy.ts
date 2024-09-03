import mongoose, { Document, Schema } from 'mongoose';

interface IAdvocacy {
    hospitalName: string;
    hospitalAddress: string;
    complaints: string;
    user: mongoose.Types.ObjectId;
    status: string;
    reference: string;
    category: string;
};

const advocacySchema = new Schema<IAdvocacy>({
    hospitalName: { type: String },
    hospitalAddress: { type: String },
    reference: { type: String },
    complaints: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: "pending" },
    category: { type: String },
}, { timestamps: true });

advocacySchema.pre(['findOne', 'find'], function (next) {
    this.populate({
        path: 'user',
        select: '_id firstName lastName email phone'
      });
    next();
});
  
export interface IAdvocacyModel extends Document, IAdvocacy {}
  
const Advocacy = mongoose.model<IAdvocacyModel>('Advocacy', advocacySchema as any);

export default Advocacy