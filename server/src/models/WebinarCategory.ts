import mongoose, { Document, Schema } from 'mongoose';

interface IWebinarCategory {
    name: string,
}

const webinarSchema = new Schema<IWebinarCategory>({
    name: { type: String }
});

export interface IWebinarCategoryModel extends Document, IWebinarCategory {}

const WebinarCategory = mongoose.model<IWebinarCategoryModel>('WebinarCategory', webinarSchema as any);

export default WebinarCategory;