<template>
  <v-card flat class="transparent video">
    <youtube
      :video-id="videoId"
      @ready="ready"
      player-width="100%"
      player-height="800"
    ></youtube>

    <!-- <video-embed
      src="https://www.youtube.com/watch?v=s4ObxcdXoFE"
      class="mx-auto mt-12"
      width="80%"
      height="80%"
    ></video-embed> -->
  </v-card>
</template>

<script>

export default {
  name: 'VideoTutorials',
  data: () => ({
    videoId: 's4ObxcdXoFE',
    player: null,
    playerWidth: '800px',
    playerHeight: '800px'
  }),
  methods: {
    ready (event) {
      this.player = event.target
      console.log(this.player)
    },
    resize () {
      this.playerWidth = `${window.innerWidth - 48}px`
      this.playerHeight = `${window.innerHeight - 160}px`
    }
  },
  mounted () {
    this.resize()
    window.addEventListener('resize', this.resize.bind(this))
  }
}
</script>

<style scoped>
.video {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  height:80vh;
  /* margin-top: 780px; */
}
</style>
