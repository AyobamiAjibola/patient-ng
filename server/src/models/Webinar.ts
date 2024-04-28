import mongoose, { Document, Schema } from 'mongoose';

interface IWebinar {
    category: string[],
    title: string,
    webinarLink: string,
    summary: string,
    speakers: {
        fullName: string,
        title: string,
        speakerImage: string | null,
    }[],
    hostedBy: {
        hostedByImage: string | null,
        name: string
    }[],
    user: mongoose.Types.ObjectId
}

const webinarSchema = new Schema<IWebinar>({
    category: [{ type: String }],
    title: { type: String },
    webinarLink: { type: String },
    summary: { type: String },
    speakers: [
        {
            fullName: { type: String },
            title: { type: String },
            image: { type: String }
        }
    ],
    hostedBy: [
        {
            image: { type: String, allowNull: true },
            name: { type: String }
        }
    ],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

export interface IWebinarModel extends Document, IWebinar {}

const Webinar = mongoose.model<IWebinarModel>('Webinar', webinarSchema as any);

export default Webinar;