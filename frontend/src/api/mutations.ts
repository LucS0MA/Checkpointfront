import { gql } from "@apollo/client";

export const CREATE_NEW_COUNTRY = gql`
mutation createNewCountry($data: NewCountryInput!) {
  addCountry(data: $data) {
    name
    emoji
    code
  }
}
`;

