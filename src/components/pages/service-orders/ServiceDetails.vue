<template>
  <v-card flat class="wrap">
    <v-card flat class="pr-10 pl-10 wrap">
      <Step1 v-if="currentStep === 1" :data="data" />
      <Step2 v-if="currentStep === 2" :data="data" />
    </v-card>
    <v-card flat class="px-10 py-4 btn-container">
      <!-- <v-card flat class="empty-btn" v-if="currentStep === 1" /> -->
      <v-btn outlined color="primary" class="btn btn-back" @click="back">
        BACK
      </v-btn>
      <v-btn color="primary" @click="forward" class="btn">FORWARD</v-btn>
    </v-card>
  </v-card>
</template>

<style scoped lang="scss">
.wrap {
  background-color: #f3f3f3 !important;
}

.btn-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
}
.btn {
  position: relative;
  padding: 10px 50px !important;
}
.btn-back {
  // background-image: url(../../assets/arrow.svg);
  background-position: 15% 48%;
}
</style>

<script>
/* eslint-disable no-unused-vars */
import Step1 from './Step1'
import Step2 from './Step2'
export default {
  name: 'ServiceDetails',
  props: ['data'],
  components: {
    Step1,
    Step2
  },
  data: () => ({
    steps: 2,
    currentStep: 1
  }),
  computed: {},
  watch: {},
  methods: {
    back () {
      if (this.currentStep > 1) this.currentStep -= 1
    },
    forward () {
      if (this.currentStep < this.steps) {
        this.currentStep += 1
        this.validation = false
      }
    }
  },
  beforeMount () {},
  mounted () {},
  destroyed () {}
}
</script>
