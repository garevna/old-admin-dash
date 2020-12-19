<template>
  <v-form disabled>
    <h2>Agreement under which this Service Order is made</h2>
    <v-row>
      <v-col cols="12" xs="12" md="6">
        <v-text-field
          v-model="data.product"
          label="Product / Service type (i.e. Point to Point, Layer 3 Internet etc)"
        />
        <v-text-field v-model="data.abn" label="ABN" />
        <v-text-field
          v-model="data.contactPersonDetails"
          label="Contact person details"
        />
      </v-col>
      <v-col cols="12" xs="12" md="6">
        <v-text-field v-model="data.companyName" label="Company name" />
        <v-text-field v-model="data.companyAddress" label="Company address" />
      </v-col>
    </v-row>
    <h2>
      DGTEK PTY LTD <span class="digital-number">(ABN 61600 896 115)</span>
    </h2>
    <v-row>
      <v-col cols="12" xs="12" md="6">
        <v-text-field v-model="data.phone" label="Phone" />
        <v-text-field v-model="data.email" label="Email" />
      </v-col>
      <v-col cols="12" xs="12" md="4" offset-md="2">
        <v-checkbox v-model="data.deposit" label="Deposit" class="pa-0 ma-0" />
        <v-checkbox
          v-model="data.bankGuarantee"
          label="Bank Guarantee"
          class="pa-0 ma-0"
        />
        <v-checkbox
          v-model="data.generalSequrityAgreement"
          label="General Security Agreement"
          class="pa-0 ma-0"
        />
        <v-checkbox
          v-model="data.noneRequired"
          label="None required"
          class="pa-0 ma-0"
        />
      </v-col>
      <!-- <v-col cols="12" xs="12">
        <v-card flat class="d-flex justify-end transparent">
          <v-btn color="primary" @click="validate" class="btn"
            >SAVE & CONTINUE</v-btn
          >
        </v-card>
      </v-col> -->
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: 'Step1',

  props: ['data'],

  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  mounted () {},
  beforeDestroy () {}
}
</script>

<style lang="scss" scoped>
.digital-number {
  font-weight: 300;
  // font-size: 20px;
}
</style>
