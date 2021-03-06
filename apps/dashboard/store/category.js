import { query, editCategory, deleteCategory, queryPagination } from '~/apollo/queries/category.js';

export const state = () => ({
  loading: false,
  error: {},
});

export const mutations = {
  fetchRequest(state) {
    state.loading = true;
    state.error = {};
  },
  editSuccess(state) {
    state.loading = false;
  },
  deleteSuccess(state) {
    state.loading = false;
  },
  fetchError(state, error) {
    state.loading = false;
    state.error = error;
  }
};

export const actions = {
  editCategory(context, data) {
    let client = this.app.apolloProvider.defaultClient;
    context.commit('fetchRequest');
    client.mutate({ mutation: editCategory, variables: {input : data} })
      .then((res) => {
        return res.data;
      })
      .then(data => {
        context.commit('editSuccess');
        this.app.context.redirect('/catalog/category');
      })
      .catch(error => context.commit('fetchError', error));
  },
  deleteCategory({commit}, value) {
    let client = this.app.apolloProvider.defaultClient;
    client.mutate({
      mutation: deleteCategory,
      variables: {input: {categoryId: value.id}},
      refetchQueries: [{
        query: queryPagination,
        variables: {start : value.start, length: value.length} ,
      }]
    })
      .then((res) => {
        return res.data;
      })
      .then(data => {
        commit('deleteSuccess');
      })
      .catch(error => commit('fetchError', error));
  }
};

