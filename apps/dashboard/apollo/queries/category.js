import gql from 'graphql-tag';

export const query = gql`
  query {
    categories {
      id,
      name,
      image,
      slug,
      created,
      updated,
      status
    }
  }
`;

export const queryPagination = gql`
  query QueryPagination($start: Int!, $length: Int!){
    categoryPagination(start: $start, length: $length) {
      count,
      data {
        id,
        name,
        image,
        slug,
        created,
        updated,
        status
      },
      length,
      start,
      hasNextPage
    }
  }
`;

export const getCategory = gql`
  query categoryQuery($categoryId: ID!) {
    category(categoryId: $categoryId) {
      id,
      name,
      image,
      description,
      slug,
      status
    }
  }
`;

export const editCategory = gql`
  mutation mutationCategory($input: MutationCategoryInput!) {
    mutationCategory(input: $input) {
      id
    }
  }
`;

export const deleteCategory = gql`
  mutation deleteCategory($input: DeleteCategoryInput!) {
    deleteCategory(input: $input) {
      count
    }
  }
`;
