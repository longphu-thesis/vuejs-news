<template>
    <select class="form-control" v-model="value" @change="onchange(value)">
        <option v-for="category of categories" v-bind:key="category.id" :value="category.id">{{category.name}}</option>
    </select>
</template>

<script>
  import find from 'lodash/find';
  import { query } from '~/apollo/queries/category.js';
  export default {
    props: ['category', 'onchange'],
    data () {
      return {
        categories: [],
        value: this.category
      }
    },
    apollo: {
      categories: {
        query: query,
        fetchPolicy: 'cache-and-network',
      }
    },
  }
</script>
