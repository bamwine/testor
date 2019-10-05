const companyresolver = require('./resolvers/companyresolver');
const useresolver = require('./resolvers/useresolver');
const productrsolver = require('./resolvers/productresolver');
const commentrsolver = require('./resolvers/commentresolver');

const rootResolver = {
    ...companyresolver,
    ...useresolver,
    ...productrsolver,
    ...commentrsolver
};

module.exports = rootResolver;