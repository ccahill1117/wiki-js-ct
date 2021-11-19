<template>
  <div class="checklist-container">
    <div>Procedures in Flight</div>
    <v-btn @click='fetchProcedures()'>FetchProcedures</v-btn>

    <v-btn @click='startProcedure()'>Start Procedure</v-btn>

    <v-btn @click='check()'>checker</v-btn>



  </div>
</template>

<script>
import { get, sync } from 'vuex-pathify'
import listProceduresQuery from 'gql/procedures/procedures-query-list.gql'
import gql from 'graphql-tag'


export default {
  computed: {
    userEmail: get('user/email'),
    userId: get('user/id'),
    page: get('page')

  },
  props: {

  },
  data () {
    return {
      procedures: ''
    }
  },
  methods: {
    async check() {
      console.log(this.$store.get('procedure'))
    },


    async startProcedure() {
      let content = this.parser()
      let options = {}
      options.content = content
      options.isActive = true
      this.$store.commit(`updateProcedure`, options)
    },

    parser(content) {
      let collection = (document.getElementsByClassName("checklist"))
      let array = [...collection]
      let returnArray = []
      array.map(elm => returnArray.push(elm.innerHTML))
      return returnArray
    },

    async fetchProcedures() {
      try {
        const results = await this.$apollo.query({
          query: gql`
            query {
              procedures {
                list {
                  id
                  filename
                  pageId
                }
              }
            }
          `,

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

<style lang='scss'>

.checklist-container {
  padding: 15px;
}

</style>
