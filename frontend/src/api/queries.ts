import { gql } from "@apollo/client"

export const GET_COUNTRY_NAME_AND_EMOJI = gql`
  query getCountryNameAndEmoji {
  countries {
    emoji
    name
    code
  }
}
`;

export const GET_SINGLE_COUNTRY_BY_CODE = gql`
query getSingleCountryByCode($code: String!) {
  country(code: $code) {
    code
    name
    emoji
    continent {
      name
    }
  }
}
`;

export const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      id
      name
    }
  }
`;