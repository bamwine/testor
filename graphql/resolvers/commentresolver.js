const Product = require('../../models/product');
const User = require('../../models/user');
const Comment = require('../../models/comment');
const {transcomment} = require('../helper/helper');

module.exports = {
    Comments: async (args) => {
        try {
            const comments = await Comment.find();
            return comments.map(comment => {
                return transcomment(comment);

            });
        } catch (err) {
            throw err;
        }
    },

    AllComments: async (args) => {
        try {
            const comments = await Comment.find();
            return comments.map(comment => {
                return transcomment(comment);

            });
        } catch (err) {
            throw err;
        }
    },

    createComments: async (args, req) => {

        const comments = new Comment({
            selcommentmessage: args.commentsInput.selcommentmessage,
            selcommenttime: args.commentsInput.selcommenttime,
            creator: args.commentsInput.creator,
            productids: args.commentsInput.productids
            // creator: req.userId
            // creator: '5d4edf41aaa6bd056cd2cb75',
            // productids:'5d4ee02967346e1c08c36d9c'
        });
        let createdComment;
        try {
            const result = await comments.save();
            createdComment = transcomment(result);
            const creator = await User.findById(args.commentsInput.creator);
            const product = await Product.findById(args.commentsInput.productids);
            if (!creator && !product) {
                throw new Error('User or product not found.');
            }
            creator.commentids.push(comments);
            product.commentids.push(comments);
            await creator.save();
            await product.save();

            return createdComment;
        } catch (err) {

            throw err;
        }
    },




};
