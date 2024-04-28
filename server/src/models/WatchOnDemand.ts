import mongoose, { Document, Schema } from 'mongoose';

interface IWatchOnDemand {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

const watchOnDemandSchema = new Schema<IWatchOnDemand>({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String }
});

export interface IWatchOnDemandModel extends Document, IWatchOnDemand {}

const WatchOnDemand = mongoose.model<IWatchOnDemandModel>('WatchOnDemand', watchOnDemandSchema as any);

export default WatchOnDemand;