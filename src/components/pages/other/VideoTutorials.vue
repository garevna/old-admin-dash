<template>
    <v-card flat class="transparent text-center" with="100%" height="80%">
      <v-toolbar>
        <v-toolbar-title>
          <h6>{{ currentVideo.title }}</h6>
        </v-toolbar-title>
        <v-spacer />
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in videoList"
              :key="index"
              @click="currentVideoIndex = index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
      <video ref="video" :width="playerWidth" :height="playerHeight" controls>
        <source :src="currentVideo.ref" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <v-card-text>
        {{ currentVideo.description }}
      </v-card-text>
    </v-card>
</template>

<script>

export default {
  name: 'VideoTutorials',
  data: () => ({
    playerWidth: 360,
    playerHeight: 360,
    currentVideoIndex: 0,
    videoList: [
      {
        title: 'General info about building',
        description: 'How to edit general info about building from the list of buildings',
        ref: require('@/assets/list-common-info.mp4')
      },
      {
        title: 'Create new building',
        description: 'How to create new building from the list of buildings',
        ref: require('@/assets/list-new-building.mp4')
      },
      {
        title: 'Remove building from the list',
        description: 'How to remove building from the list of buildings',
        ref: require('@/assets/list-remove-building.mp4')
      },
      {
        title: 'Create building on the map',
        description: 'How to create new building on the map',
        ref: require('@/assets/map-new-marker.mp4')
      },
      // {
      //   title: 'Remove building from the map',
      //   description: 'How to remove building from the map',
      //   ref: ''
      // },
      {
        title: 'Building Infrastructure and levels',
        description: 'How to edit info about building\' infrastructure and levels from the map',
        ref: require('@/assets/map-infrastructure-and-levels.mp4')
      },
      {
        title: 'Uploads',
        description: 'How to upload building\' pdf files and images from the map',
        ref: require('@/assets/map-uploads.mp4')
      }
    ]
  }),
  computed: {
    currentVideo () {
      console.log(typeof this.currentVideoIndex)
      if (typeof this.currentVideoIndex !== 'number') return this.videoList[0]
      return this.videoList[this.currentVideoIndex]
    }
  },
  watch: {
    currentVideo (val) {
      this.$refs.video.load()
      console.log(val, this.videoList[this.currentVideoIndex].title)
      console.log(this.videoList[this.currentVideoIndex].ref)
    }
  },
  methods: {
    resize () {
      this.playerWidth = window.innerWidth * 0.7
      this.playerHeight = window.innerHeight * 0.7
    }
  },
  mounted () {
    this.resize()
    window.addEventListener('resize', this.resize.bind(this))
  }
}
</script>
