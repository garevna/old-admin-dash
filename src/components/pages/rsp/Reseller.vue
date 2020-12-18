<template>
  <v-card min-width="360" max-width="480">
    <v-simple-table dark height="75vh">
      <template v-slot:default>
        <tbody>
          <tr>
            <td>Company</td>
            <td>{{ reseller.company }}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{{ reseller.name }}</td>
          </tr>
          <tr>
            <td>ABN</td>
            <td>{{ reseller.abn }}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{{ reseller.address }}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{{ reseller.email }}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{{ reseller.phone }}</td>
          </tr>
          <tr>
            <td>Contact person</td>
            <td>{{ reseller.contactPersonDetails }}</td>
          </tr>
          <tr>
            <td>Contact Phone</td>
            <td>{{ reseller.contactNumber }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Reseller',

  props: ['id'],

  computed: {
    ...mapState({
      resellersData: 'rsp'
    }),
    reseller () {
      return this.resellersData.find(reseller => reseller._id === this.id)
    }
  }
}
</script>
