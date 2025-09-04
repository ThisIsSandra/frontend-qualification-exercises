import { gql } from "@apollo/client";

export const GET_MEMBERS = gql`
  query GetMembers {
    members(first: 10) {
      edges {
        node {
          id
          ... on Member {
            name
            status
            domain
            verificationStatus
            emailAddress
            mobileNumber
            dateTimeCreated
            dateTimeLastActive
          }
        }
      }
    }
  }
`;
