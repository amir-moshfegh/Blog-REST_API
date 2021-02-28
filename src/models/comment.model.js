const mongoose = require('mongoose');
const { Post, User } = require('./index');
const { status } = require('../config/enums');
const { toJSON, paginate } = require('./plugins');

const commentSchema = mongoose.Schema(
    {
        post: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: Post,
            require: true,
        },
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: User,
            require: true,
        },
        content: {
            type: String,
            require: true,
        },
        status: {
            type: String,
            default: status.DISABLE,
        }
    },
    {
        timespatms: true,
    }
);


commentSchema.plugin(toJSON);
commentSchema.plugin(paginate);

const Comment = mongoose.model('tblComment', commentSchema);

module.exports = Comment;