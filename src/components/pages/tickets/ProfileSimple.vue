<template>
  <v-card flat class="transparent mx-auto my-5" width="480">
    <v-simple-table dense>
      <template v-slot:default>
        <tbody>
          <tr>
            <td>Company name</td>
            <td><b> {{ user.company || user.name }} </b></td>
          </tr>
          <tr>
            <td>Role</td>
            <td> {{ user.role }} </td>
          </tr>
          <tr>
            <td>Address</td>
            <td> {{ user.address }} </td>
          </tr>
          <tr>
            <td>Phone</td>
            <td> {{ user.phone }} </td>
          </tr>
          <tr>
            <td>Email</td>
            <td> {{ user.email }} </td>
          </tr>
          <tr>
            <td>Contact person</td>
            <td> {{ user.contactPersonDetails }} </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>

export default {
  name: 'ProfileSimple',
  // components: {
  //   CorporatePartnerIcon: () => import('@/components/icons/CorporatePartner.vue')
  // },
  props: ['user']
}
</script>
