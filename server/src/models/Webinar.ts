import mongoose, { Document, Schema } from 'mongoose';

interface IWebinar {
    category: string,
    title: string,
    webinarLink: string,
    webinarDateTime: Date,
    summary: string,
    status: string,
    duration: string,
    speakers: {
        speakerName: string,
        occupation: string,
        image: string,
    }[],
    user: mongoose.Types.ObjectId
}

const webinarSchema = new Schema<IWebinar>({
    category: { type: String },
    webinarDateTime: { type: Date },
    title: { type: String },
    duration: { type: String },
    status: { type: String, default: "pending" },
    webinarLink: { type: String },
    summary: { type: String },
    speakers: [
        {
            speakerName: { type: String },
            occupation: { type: String },
            image: { type: String }
        }
    ],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

webinarSchema.pre(['findOne', 'find'], function (next) {
    this.populate({
        path: 'user',
        select: '_id firstName lastName image email'
      });
    next();
});

export interface IWebinarModel extends Document, IWebinar {}

const Webinar = mongoose.model<IWebinarModel>('Webinar', webinarSchema as any);

export default Webinar;