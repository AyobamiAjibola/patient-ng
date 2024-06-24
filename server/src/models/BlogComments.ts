import mongoose, { Document, Schema } from 'mongoose';

interface IBlogComments {
    comment: string,
    replies: {
        reply: string,
        user: mongoose.Types.ObjectId
    }[],
    user: mongoose.Types.ObjectId;
    likes: mongoose.Types.ObjectId[];
    blog: mongoose.Types.ObjectId;
}

const blogCommentsSchema = new Schema<IBlogComments>({
    comment: { type: String },
    replies: [{
        reply: { type: String },
        user: { type: Schema.Types.ObjectId, ref: 'User' }
    }],
    likes: [{ type: String }],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    blog: { type: Schema.Types.ObjectId, ref: 'Blog' }
}, { timestamps: true });

blogCommentsSchema.pre(['findOne', 'find'], function (next) {
    this.populate({
        path: 'user',
        select: 'firstName lastName image createdAt'
      }).populate({
        path: 'replies.user',
        select: 'firstName lastName image createdAt'
      })
    next();
});

export interface IBlogCommentsModel extends Document, IBlogComments {}

const BlogComments = mongoose.model<IBlogCommentsModel>('BlogComments', blogCommentsSchema as any);

export default BlogComments;