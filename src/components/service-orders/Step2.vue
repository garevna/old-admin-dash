<template>
  <v-form disabled>
    <h2>Technical details and Contact details</h2>
    <v-row>
      <v-col cols="12" xs="12" md="6">
        <v-text-field
          v-model="data.fullSiteAddress"
          label="Full Site Address"
        />
        <v-text-field
          v-model="data.serviceDescription"
          label="Service Description (from MSA)"
        />
        <v-text-field v-model="data.vlan" label="VLAN" />
        <v-text-field v-model="data.aEnd" label="A End:" />
      </v-col>
      <v-col cols="12" xs="12" md="6">
        <v-text-field v-model="data.customerName" label="Custumer Name" />
        <v-text-field v-model="data.term" label="Term:" />
        <v-text-field v-model="data.zEnd" label="Z End:" />
      </v-col>
    </v-row>
    <h2>
      *Building / Facilities Manager or Property Manager or Strata or Owner
    </h2>
    <v-row>
      <v-col cols="12" xs="12" md="6">
        <v-text-field v-model="data.name" label="Name" />
        <v-text-field v-model="data.company" label="Company" />
        <v-text-field
          v-model="data.buildingsEmailAddress"
          label="Email Address"
        />
      </v-col>
      <v-col cols="12" xs="12" md="6">
        <v-text-field v-model="data.buildingsPosition" label="Position" />
        <v-text-field v-model="data.contactNumber" label="Contact Number" />
      </v-col>
    </v-row>
    <h2>End Customer & On-Site Contact Details</h2>
    <v-row>
      <v-col cols="12" xs="12" md="6">
        <v-text-field
          v-model="data.endCustomersCompanyName"
          label="Company Name"
        />
        <v-text-field v-model="data.customersPosition" label="Position" />
        <v-text-field
          v-model="data.customersEmailAdress"
          label="Email Address"
        />
      </v-col>
      <v-col cols="12" xs="12" md="6">
        <v-text-field
          v-model="data.siteContactName"
          label="Site Contact Name"
        />
        <v-text-field
          v-model="data.customersContactNumber"
          label="Contact Number"
        />
      </v-col>
      <!-- <v-col cols="12" xs="12">
        <v-card flat class="d-flex transparent">
          <v-btn outlined color="primary" class="btn btn-back" @click="back">
            BACK
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="validate" class="btn"
            >SAVE & CONTINUE</v-btn
          >
        </v-card>
      </v-col> -->
    </v-row>
  </v-form>
</template>

<style lang="sass"></style>

<script>
export default {
  name: 'Step2',

  props: ['data'],

  data: () => ({}),
  computed: {},
  watch: {},
  methods: {},
  mounted () {},
  beforeDestroy () {}
}
</script>

<style></style>
