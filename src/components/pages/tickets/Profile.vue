<template>
  <v-expansion-panels flat>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <b> <v-icon>$profile</v-icon> Company profile</b>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
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
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>

export default {
  name: 'Profile',
  props: ['user']
}
</script>
