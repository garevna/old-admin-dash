<template>
  <v-card flat class="transparent mx-auto my-10" max-width="600">
    <v-simple-table dense flat class="transparent">
      <template v-slot:default>
        <tbody>
          <tr>
            <td><small>Company</small></td>
            <td>{{ reseller.company }}</td>
          </tr>
          <tr>
            <td><small>Name</small></td>
            <td>{{ reseller.name }}</td>
          </tr>
          <tr>
            <td><small>ABN</small></td>
            <td>{{ reseller.abn }}</td>
          </tr>
          <tr>
            <td><small>Address</small></td>
            <td>{{ reseller.address }}</td>
          </tr>
          <tr>
            <td><small>Email</small></td>
            <td>{{ reseller.email }}</td>
          </tr>
          <tr>
            <td><small>Phone</small></td>
            <td>{{ reseller.phone }}</td>
          </tr>
          <tr>
            <td><small>Contact person</small></td>
            <td>{{ reseller.contactPersonDetails }}</td>
          </tr>
          <tr>
            <td><small>Contact Phone</small></td>
            <td>{{ reseller.contactNumber }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  props: ['id'],
  computed: {
    ...mapGetters(['getUserById']),
    reseller () {
      return this.getUserById(this.id)
    }
  }
}
</script>

<style scoped>
small {
  color: #888;
}
h5 {
  font-size: 1.2rem;
  color: #555;
}
</style>
