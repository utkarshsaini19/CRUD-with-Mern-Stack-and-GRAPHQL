import {gql} from 'apollo-server-express'


const typeDefs = gql`
    type Query{
        greet:String
        users:[User]
        user(_id:ID!):User
        quotes:[Quote]
        quotebyUser(by:ID!):[Quote]
        getmyProfile:User
    }

    type User{
        _id:ID!
        firstName:String!
        lastName:String!
        email:String!
        quotes:[Quote]
    }

    type Quotedetails{
        _id:String!
        firstName:String!
    }
    
    type Quote{
        name:String
        by:Quotedetails
    }

    type Token{
        token:String
    }

    input UserLoginInput{
        email:String!
        password:String!
    }
    type Mutation{
        signupUser(userNew:UserInput!):User
        signinUser(userSignIn:UserLoginInput!):Token
        createQuote(name:String):String
    }

    input UserInput{
        firstName:String!
        lastName:String!
        email:String!
        password:String!
    }
`

export default typeDefs