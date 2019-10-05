var express = require('express');

const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const morgan = require('morgan');            // log requests to the console (express4)    
const methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
const bodyparser  = require('body-parser');
const graphQlSchema = require('./graphql/schema');
const graphQlResolvers = require('./graphql/resolvers');
const cors = require('cors');
var app = express();

app.use(morgan('dev')); 
app.use(methodOverride());
app.use(bodyparser.json());
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});


app.use(
    '/graphql',cors(),
    graphqlHttp({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true
    })
);

var options = {     user: '',     pass: '',useNewUrlParser: true,    useCreateIndex: true,  }

mongoose.connect('mongodb+srv://bamwine:bamwine@cluster0-jv1b1.mongodb.net/tests?retryWrites=true&w=majority', options).then( () => {app.listen(process.env.PORT || 8080)}).catch(err => {console.log(err)});

//mongoose.connect('mongodb+srv://bamwine:bamwine@cluster0-jv1b1.mongodb.net/tests?retryWrites=true&w=majority', options).then( () => {app.listen(3000)}).catch(err => {console.log(err)});

//mongoose.connect('mongodb://localhost:27017/work', options).then( () => {app.listen(3000)}).catch(err => {console.log(err)});

mongoose.Promise=global.Promise;
//mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io
// app.listen(3000, () => console.log('Example app listening on port 3000!'))