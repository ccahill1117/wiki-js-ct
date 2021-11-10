<template>
  <div>
    <div>hihi</div>
    <v-btn @click='checker'>ok</v-btn>
  </div>
</template>

<script>

export default {
  props: {
    url: {
      type: String,
      default: window.location.url
    },
    title: {
      type: String,
      default: 'Untitled Page'
    },
    description: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      width: 626,
      height: 436,
      left: 0,
      top: 0
    }
  },
  methods: {
    checker() {
      console.log('ok')
    }

  },
  mounted () {


    clip.on('success', () => {
      this.$store.commit('showNotification', {
        style: 'success',
        message: `URL copied successfully`,
        icon: 'content-copy'
      })
    })
    clip.on('error', () => {
      this.$store.commit('showNotification', {
        style: 'red',
        message: `Failed to copy to clipboard`,
        icon: 'alert'
      })
    })

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
