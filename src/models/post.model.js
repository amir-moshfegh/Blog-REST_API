const mongoose = require('mongoose');
const User = require('./user.model');
const { status } = require('../config/enums');
const { toJSON, paginate } = require('./plugins');

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
            trim: true,
        },
        content: {
            type: String,
            trim: true,
        },
        tags: [{
            type: String,
            trim: true,
        }],
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: User,
            require: true,
        },
        status: {
            type: String,
            default: status.DISABLE,
        },
    },
    {
        timestamps: true,
    }
);

postSchema.plugin(toJSON);
postSchema.plugin(paginate);

/**
 * TODO:: generate slug and save automaticly
 * I want to create manually slug generator but I couldn't
 */

const Post = mongoose.model('tblPost', postSchema);

module.exports = Post;