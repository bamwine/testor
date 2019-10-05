const Product = require('../../models/product');
const User = require('../../models/user');
const {transproduct} = require('../helper/helper');

module.exports = {
    Products: async (args) => {
        try {
            const products = await Product.find();
            return products.map(Product => {
                return transproduct(Product);
                // return Product
            });
        } catch (err) {
            throw err;
        }
    },

    AllProducts: async (args) => {
        try {
            const products = await Product.find();
            return products.map(Product => {
                return transproduct(Product);
                // return Product

            });

        } catch (err) {
            throw err;
        }
    },

    createProducts: async (args, req) => {

        const products = new Product({
            selproductname: args.productsInput.selproductname,
            selproductdesc: args.productsInput.selproductdesc,
            creator: args.productsInput.creator
            // creator: req.userId
            // creator: '5d4eddb6136e251818dc57a4'
        });
        let createdCompany;
        try {
            const result = await products.save();
            createdCompany = transproduct(result);
            const creator = await User.findById(args.productsInput.creator);

            if (!creator) {
                throw new Error('User not found.');
            }
            creator.createdProduct.push(products);
            await creator.save();

            return createdCompany;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },




};
