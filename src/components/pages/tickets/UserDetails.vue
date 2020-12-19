<template>
  <v-card class="transparent pa-8" max-width="600">
    <v-toolbar flat class="transparent">
      <v-toolbar-title>
        <small class="primary--text">{{ user.createdAt }}</small>
      </v-toolbar-title>
      <v-spacer />
      <v-btn dark color="primary" class="mr-2" @click="accept">
        Accept
      </v-btn>
      <v-btn dark color="primary" @click="reject">
        Reject
      </v-btn>
    </v-toolbar>
    <v-simple-table
      dark
      height="75%"
    >
      <template v-slot:default>
        <tbody>
          <tr>
            <td>Company</td>
            <td>{{ user.company || user.name }}</td>
          </tr>
          <tr class="my-2">
            <td>Address</td>
            <td>{{ user.address }}</td>
          </tr>
          <tr>
            <td>ABN</td>
            <td>{{ user.abn }}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{{ user.email }}</td>
          </tr>
          <tr v-if="user.additionalEmail">
            <td>Additional email</td>
            <td>{{ user.additionalEmail }}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{{ user.phone }}</td>
          </tr>
          <tr>
            <td>Contact Phone</td>
            <td>{{ user.contactNumber }}</td>
          </tr>
          <tr>
            <td>Site</td>
            <td>{{ user.site }}</td>
          </tr>

          <tr v-if="user.message">
            <td>Message</td>
            <td>{{ user.message }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-card flat class="transparent">
      <v-card-text class="text-center">
        <v-textarea
          outlined
          label="Message back"
          color="primary"
          v-model="message"
          :rules="[rules.required]"
          class="subtitle-1"
          no-resize
        ></v-textarea>
        <v-select
          :items="roles"
          label="Select role"
          v-model="role"
          :rules="[rules.required]"
          color="primary"
          class="rounded subtitle-1"
          outlined
        ></v-select>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>

import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'UserDetails',
  props: ['user', 'action'],
  data: () => ({
    message: '',
    role: null,
    parent: null,
    roles: ['Corporate partner', 'RSP'],
    rules: {
      required: v => !!v || 'input required'
    }
  }),

  methods: {
    ...mapMutations({
      showMessage: 'MESSAGE',
      showError: 'ERROR'
    }),
    ...mapActions('registration', {
      acceptRequest: 'ACCEPT_TICKET',
      rejectRequest: 'REJECT_TICKET'
    }),
    accept () {
      if (!this.role) {
        this.showError({
          error: true,
          errorType: 'Role required',
          errorMessage: 'To accept request you should select a role'
        })
        return
      }
      this.acceptRequest({
        id: this.user._id,
        payload: {
          accepted: true,
          role: this.role,
          message: this.message
        }
      })
      this.$emit('update:user', null)
    },
    reject () {
      this.rejectRequest({
        id: this.user._id,
        payload: {
          message: this.message
        }
      })
      this.$emit('update:user', null)
    }
  }
}
</script>

<style scoped>
td, th {
  color: #fff !important;
}
</style>
