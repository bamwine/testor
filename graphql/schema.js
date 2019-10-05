const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Company {
        _id: ID!
        selbusinessname:String!
        busineslogo:String!
        businesvectorimage: String!
        seltypeofbusiness:String!
        selbusinessdesc: String!
        selemail: String!
        selnumberofproducts: Float
        selnumberofollwers: Float
        seldatereg: String!
        creator: User! 
        }

input CompanyInput {
        selbusinessname:String!
        busineslogo:String!
        creator:String!
        
}

 type Products {
         _id: ID!
        selproductname:String!
        selproductdesc:String!
        selproductdatereg:String!
        selproductamount:Float!
        seleproductlikes:Float!
        selproductviews:Float!
        selproductimages:String!
        selproductimagesothers:[String]
        seleproductcomments:[String]
        creator: User!
        commentids: [Comments!]

}


 input ProductsInput {

        selproductname:String!
        selproductdesc:String!
        creator:String!
        

}

type Comments{
         _id: ID!
        selcommentprodid:String!
        selcommentperson:String!
        selcommentmessage:String!
        selcommenttime: String!
        creator: User! 
        productids: Products!
               

}

input CommentsInput {
        
        selcommentmessage:String!
        selcommenttime: String!
        creator:String!
        productids:String!
}

type User {
  _id: ID!
  email: String!
  password: String
  createdCompany: [Company!]
  createdProduct: [Products!]
  
}

input UserInput {
  email: String!
  password: String!
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
  createdCompany: [Company!]
}


type RootQuery {
    Company(companyid: String!): [Company!]!
    Products(companyid: String!):[Products!]!
    Comments(productid: String!):[Comments!]!
    AllProducts:[Products!]!
    AllCompany: [Company!]!
    login(email: String!, password: String!): AuthData!
    AllUser:[User!]!
    
     
}

type RootMutation {
    createCompany(companyInput: CompanyInput): Company
    createProducts(productsInput: ProductsInput): Products
    createComments(commentsInput: CommentsInput): Comments
    createUser(userInput: UserInput): User
    
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
