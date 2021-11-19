<template>
  <div>
    <div>hihi</div>
    <v-btn @click='checker'>ok</v-btn>
  </div>
</template>

<script>
import { get, sync } from 'vuex-pathify'


export default {
  computed: {
    userEmail: get('user/email'),
    userId: get('user/id')

  },
  props: {

  },
  data () {
    return {

    }
  },
  methods: {
    checker() {
      console.log('id', this.userId)
      console.log('email', this.userEmail)
      console.log('process')

    }

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
  }
}
</script>
