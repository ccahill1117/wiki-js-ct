<template>
  <div>
    <div>Procedures in Flight</div>
    <v-btn @click='fetchProcedures()'>ok</v-btn>

  </div>
</template>

<script>
import { get, sync } from 'vuex-pathify'
import listProceduresQuery from 'gql/procedures/procedures-query-list.gql'
import gql from 'graphql-tag'


export default {
  computed: {
    userEmail: get('user/email'),
    userId: get('user/id')

  },
  props: {

  },
  data () {
    return {
      procedures: ''

    }
  },
  methods: {
    async createProcedure() {
      console.log('id', this.userId)
      console.log('store', this.$store)
      console.log('process')
    },
    async FetchProcedureHTTPS() {
      axios.post("http://localhost:3030/procedures")
        .then(response => console.log(response));
    },

    async fetchProcedures() {
      this.$store.commit(`loadingStart`, 'comments-edit')
      this.isBusy = true
      try {
        const results = await this.$apollo.query({
          query: gql`
            query {
              procedures {
                list {
                  filename
                  pageId
                }
              }
            }
          `,
          fetchPolicy: 'network-only'
        })
        console.log('results',results.data.procedures.list)
      } catch (err) {
        console.warn(err)
        console.log(results)
        this.$store.commit('showNotification', {
          style: 'red',
          message: err.message,
          icon: 'alert'
        })
      }
      this.isBusy = false
      this.$store.commit('showNotification', {
          style: 'green',
          message: 'procedures loaded',
          icon: 'success'
        })
    },

  },


  mounted () {
    /**
     * Center the popup on dual screens
     * http://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen/32261263
     */
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

    const width = window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width)
    const height = window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height)

    this.left = ((width / 2) - (this.width / 2)) + dualScreenLeft
    this.top = ((height / 2) - (this.height / 2)) + dualScreenTop
  },
  apollo: {
    procedures: {
      query: listProceduresQuery,
      variables() {
        return {
          // folderId: this.currentFolderId,
          kind: 'ALL'
        }
      },
      throttle: 1000,
      fetchPolicy: 'network-only',
      update: (data) => data.procedures,
      watchLoading (isLoading) {
        this.loading = isLoading
        this.$store.commit(`loading${isLoading ? 'Start' : 'Stop'}`, 'editor-media-list-refresh')
      }
    }
  }
}
</script>
