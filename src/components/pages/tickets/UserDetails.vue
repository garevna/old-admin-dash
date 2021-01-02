<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-simple-table dense>
        <template v-slot:default>
          <tbody>
            <!-- <tr>
              <td>Company</td>
              <td>{{ user.company || user.name }}</td>
            </tr> -->
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
              <td>Contact Person</td>
              <td>{{ user.contactPersonDetails }}</td>
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
    </v-col>
    <v-col cols="12" md="6">
      <v-card flat class="transparent">
        <v-card-text class="text-center">
          <v-textarea
            outlined
            label="Message back"
            color="primary"
            @input="$emit('update:message', $event)"
            class="subtitle-1"
            no-resize
          ></v-textarea>
          <v-select
            :items="roles"
            label="Select role"
            @input="$emit('update:role', $event)"
            color="primary"
            class="rounded subtitle-1"
            outlined
          ></v-select>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <!-- </v-card> -->
</template>

<script>

export default {
  name: 'UserDetails',
  props: ['user', 'role', 'message'],
  data: () => ({
    roles: ['Corporate partner', 'RSP']
  })
}
</script>
