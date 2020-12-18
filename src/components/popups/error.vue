<template>
  <v-dialog v-model="dialog" max-width="480px" class="pa-4">
    <v-card flat>
      <v-toolbar dark dense color="#900">
        <v-icon class="mr-4"> $error </v-icon>
        <v-toolbar-title> Error </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon large> $close </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="text-center mt-10">
        <h4>{{ errorType || 'Unknown error type' }}</h4>
      </v-card-text>
      <v-card-text class="text-center">
        <p>{{ errorMessage || 'Unknown Error' }}</p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
  name: 'ErrorMessage',
  computed: {
    ...mapState(['error', 'errorMessage', 'errorType']),
    dialog: {
      get () {
        return this.error
      },
      set (val) {
        !val && this.resetError()
      }
    }
  },
  methods: {
    ...mapMutations({
      setError: 'ERROR'
    }),
    resetError () {
      this.setError(null)
    }
  }
}
</script>
