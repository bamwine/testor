const Company = require('../../models/company');
const User = require('../../models/user');
const {transcompany} = require('../helper/helper');

module.exports = {
    Company: async (args) => {
        try {
            const companys = await Company.find();

            return companys.map(company => {
                return transcompany(company);
                // return company
            });
        } catch (err) {
            throw err;
        }
    },

    AllCompany: async () => {
        try {
            const companys = await Company.find();
            return companys.map(company => {
                return transcompany(company);
                // return company
            });
        } catch (err) {
            throw err;
        }
    },

    createCompany: async (args, req) => {

        const companys = new Company({
            selbusinessname: args.companyInput.selbusinessname,
            busineslogo: args.companyInput.busineslogo,
            // seltypeofbusiness:args.companyInput.seltypeofbusiness,
            // selbusinessdesc: args.companyInput.selbusinessdesc,
            // selemail: args.companyInput.selemail,
            // selnumberofproducts: args.companyInput.selnumberofproducts,
            // selnumberofollwers: args.companyInput.selnumberofollwers,
            // seldatereg: new Date(),
            creator:  args.companyInput.creator
            // creator: '5d56eeb4e450983f4c3a2b5e'
        });
        let createdCompany;
        try {
            const result = await companys.save();
            createdCompany = transcompany(result);
            const creator = await User.findById( args.companyInput.creator);

            if (!creator) {
                throw new Error('User not found.');
            }
            creator.createdCompany.push(companys);
            await creator.save();

            return createdCompany;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },



};
