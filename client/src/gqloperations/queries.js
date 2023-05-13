import { gql } from "@apollo/client";

export const GET_ALL_QUOTES = gql`
query getAllQuotes {
    quotes {
      name
      by {
        _id
        firstName
      }
    }
  }
`

export const GET_MY_PROFILE = gql`
query getUserDetails {
  user:getmyProfile {
    firstName
    lastName
    email
    quotes {
      name
    }
  }
}
`

export const GET_USER_PROFILE = gql`
query getUser($userid:ID!) {
  user(_id: $userid) {
    firstName
    lastName
    email
    quotes {
      name
    }
  }
}

`