<template>
  <div class="procedure-container">
    <v-card
      class="mx-auto"
      max-width="400"
    >
      <v-toolbar
        dark
      >
        <v-toolbar-title>Procedure in flight</v-toolbar-title>
        <v-toolbar-subtitle> &nbsp;&nbsp;Is procedure active: {{getProcedureState.isActive}}</v-toolbar-subtitle>

        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list
        flat
        subheader
        three-line
      >
      <v-subheader>Procedure Steps</v-subheader>
        <v-list-item v-for="item in getProcedureState.content" :key="item">
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{item}}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </div>





</template>

<script>
import { get, sync } from 'vuex-pathify'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'getProcedureState',
    ])
  },
  props: {

  },
  watch: {
    'this.$store.state.procedure': function() {
      console.log('ok')
    }
  },

  data () {
    return {

    }
  },
  methods: {
    async check() {

    },

  },


  mounted () {

  },

}
</script>

<style lang='scss'>

.procedure-container {
  padding: 15px;
}

</style>
