const DataLoader = require('dataloader');

const Company = require('../../models/company');
const Product = require('../../models/product');
const User = require('../../models/user');
const Comment = require('../../models/comment');
const { dateToString } = require('../helper/date');


const companyLoader = new DataLoader(companyIds => {
    return companys(companyIds);
});

const userLoader = new DataLoader(userIds => {
    return User.find({ _id: { $in: userIds } });
});

            // manypcomments  Loader
const commentLoader = new DataLoader(commentIds => {
    return commentf(commentIds);
});



            // single  Loader
const productLoader = new DataLoader(ProductIds => {
    return Product.find({ _id: { $in: ProductIds } });

});


// single  Loader
const productLoaderm = new DataLoader(ProductIds => {
    return productsmany(ProductIds);

});




const companys = async companyIds => {
    try {
        const companys = await Company.find({ _id: { $in: companyIds } });
        companys.sort((a, b) => {
            return (
                companyIds.indexOf(a._id.toString()) - companyIds.indexOf(b._id.toString())
            );
        });
        return companys.map(event => {
            return transcompany(event);
        });
    } catch (err) {
        throw err;
    }
};


const productsmany = async eventIds => {
    try {
        const events = await Product.find({ _id: { $in: eventIds } });
        events.sort((a, b) => {
            return (
                eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
            );
        });
        return events.map(event => {
            return transproduct(event);
        });
    } catch (err) {
        throw err;
    }
};


const commentf = async eventIds => {
    try {
        const events = await Comment.find({ _id: { $in: eventIds } });
        events.sort((a, b) => {
            return (
                eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
            );
        });
        return events.map(event => {
            return transcomment(event);
        });
    } catch (err) {
        throw err;
    }
};



const singleCompany = async companyId => {
    try {
        const company = await companyLoader.load(companyId.toString());
        return company;
    } catch (err) {
        throw err;
    }
};

const user = async userId => {
    try {
        const user = await userLoader.load(userId.toString());
        return {
            ...user._doc,
            _id: user.id,
            createdCompany: () => companyLoader.loadMany(user._doc.createdCompany),
            commentids:() => commentLoader.loadMany(user._doc.commentids),
            createdProduct:() => productLoaderm.loadMany(user._doc.createdProduct)

        };
    } catch (err) {
        throw err;
    }
};


const productf = async productId => {
    try {
        const product = await productLoader.load(productId.toString());
        return {
            ...product._doc,
            _id: product.id,
            commentids: () => commentLoader.loadMany(product._doc.commentids)
        };
    } catch (err) {
        throw err;
    }
};

const transcompany = company => {
    return {
        ...company._doc,
        _id: company.id,
        // date: dateToString(company._doc.date),
        creator: user.bind(this, company.creator)
    };
};


const transproduct = productx => {
    return {
        ...productx._doc,
        _id: productx.id,
        // date: dateToString(productx._doc.date),
        creator: user.bind(this, productx.creator),
        commentids : commentf.bind(this, productx.commentids)
    };



};


const transuser = user => {
    return {
        ...user._doc,
        _id: user.id,
        createdCompany: () => companyLoader.loadMany(user._doc.createdCompany),
        commentids:() => commentLoader.loadMany(user._doc.commentids),
        createdProduct:() => productLoaderm.loadMany(user._doc.createdProduct)

    };

};


const transcomment = comment => {
    return {
        ...comment._doc,
        _id: comment.id,
        creator: user.bind(this, comment.creator),
        productids: productf.bind(this, comment.productids)
    };
};



exports.transcompany = transcompany;
exports.transproduct = transproduct;
exports.transcomment = transcomment;
exports.transuser = transuser;


