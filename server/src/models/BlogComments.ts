import mongoose, { Document, Schema } from 'mongoose';

interface IBlogComments {
    comment: string,
    replies: {
        reply: string,
        user: mongoose.Types.ObjectId
    }[],
    user: mongoose.Types.ObjectId;
}

const blogCommentsSchema = new Schema<IBlogComments>({
    comment: { type: String },
    replies: [{
        reply: { type: String },
        user: { type: Schema.Types.ObjectId, ref: 'User' }
    }],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

blogCommentsSchema.pre(['findOne', 'find'], function (next) {
    this.populate({
        path: 'user',
        select: 'firstName lastName image createdAt'
      });
    next();
    // this.populate('user');
    // next();
});

export interface IBlogCommentsModel extends Document, IBlogComments {}

const BlogComments = mongoose.model<IBlogCommentsModel>('BlogComments', blogCommentsSchema as any);

export default BlogComments;