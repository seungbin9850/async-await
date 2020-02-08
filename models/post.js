const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    name: String,
    title: String,
    text: String,
    userId: String,
});

Post.statics.create = function (name, title, text, userId) {
    const content = new this({
        name,
        title,
        text,
        userId,
    });

    return content.save();
}

Post.statics.findOneByid = function(_id) {
    return this.findOne({
        _id
    }).exec();
}

Post.statics.findAll = function() {
    return this.find().exec();
}

module.exports = mongoose.model('Post', Post);