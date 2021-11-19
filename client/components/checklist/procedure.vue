<template>
  <div class="procedure-container">
    <div>Procedures in Flight</div>
    <div v-bind='getProcedureState'>{{getProcedureState}}</div>


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
