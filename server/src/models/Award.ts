import mongoose, { Document, Schema } from 'mongoose';

interface IAward {
    awardName: string;
    recipient: string;
    nominees: string[];
    dateRecieved: Date;
};

const awardSchema = new Schema<IAward>({
    awardName: { type: String },
    recipient: { type: String },
    nominees: [{ type: String }],
    dateRecieved: { type: Date, default: new Date() }
}, { timestamps: true });
  
export interface IAwardModel extends Document, IAward {}
  
const Award = mongoose.model<IAwardModel>('Award', awardSchema as any);

export default Award