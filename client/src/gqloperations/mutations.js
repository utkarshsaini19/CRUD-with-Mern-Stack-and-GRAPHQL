import { gql } from "@apollo/client";

export const SIGN_UP = gql`
mutation createUser($userNew:UserInput!) {
    user:signupUser(userNew : $userNew)
    {
      firstName
      lastName
    }
  }
`
export const LOGIN = gql`
mutation LoginUser($userSignIn:UserLoginInput!) {
  user:signinUser(userSignIn : $userSignIn)
  {
    token
  }
}
`

export const CREATE_QUOTE = gql`
mutation CreateQuote($name:String){
  createQuote(name : $name)
}
`

