<template>
    <div>
        <form-user :data="data" :onClick="onclick" v-if="!error_data.message"/>
        <div v-else>
            <span>
                Error get data of user
            </span>
        </div>
    </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { query } from '~/apollo/queries/user'
  import FormUser from '~/components/FormUser.vue';
  import omit from 'lodash/omit';
  import find from 'lodash/find';
  export default {
    async asyncData(context, callback) {
      try {
        const client = context.app.apolloProvider.defaultClient
        const dataUsers = await client.query({query: query})
        callback(null, {
          users: dataUsers.data.users,
        })
      } catch (error) {
        callback(null, {users: []})
      }
    },
    data() {
      return {
        data: {
          role: "Admin"
        },
        loading: true,
        error_data: {}
      }
    },
    async mounted() {
      try {
        if(this.$router.app._route.query.id) {
          const userId = this.$router.app._route.query.id;
          const existUser = find(this.users, function (o) { return o.id === userId});

          if (existUser) {
            this.data = omit(existUser, '__typename')
          } else {
            this.error_data = { message: 'No exist user.' }
          }
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error_data = error;
      }
    },
    methods: {
      ...mapActions({
        editUser: 'user/editUser',
      }),
      onclick(e) {
        this.editUser(this.data);
        e.preventDefault();
      },
    },
    components: {
      FormUser
    },
    middleware: 'authenticated'
  }
</script>
