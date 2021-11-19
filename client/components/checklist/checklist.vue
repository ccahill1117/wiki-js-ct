<template>
  <div class="checklist-container">
    <div>Procedure Options</div>
    <v-btn @click='fetchProcedures()'>Fetch Procedures (gql)</v-btn>
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
      procedureList: ''
    }
  },
  methods: {
    async check() {
      console.log(this.$store.state.procedure)
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
        return results.data.procedures.list
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

  },
  // graph ql
  apollo: {
    procedures: {
      query: listProceduresQuery,
      variables() {
        return {
        }
      },
    }
  }
}
</script>

<style lang='scss'>

.checklist-container {
  padding: 15px;
}

</style>
