<template>
  <v-card class="transparent" v-if="edited">
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon>$edit</v-icon> {{ edited.serviceName.value }}
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="save">
        <v-icon>$save</v-icon>
      </v-btn>

      <v-btn icon @click="$emit('update:showEdit', false)">
        <v-icon>$close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-text-field label="Service Name" v-model="edited.serviceName.value" />
    </v-card-text>
    <v-card-text>
      <v-text-field label="Service Type" v-model="edited.serviceType.value" />
    </v-card-text>
    <v-card-text>
      <v-file-input
        label="service SLA"
        v-model="sla"
        prepend-icon="$upload"
      />
      <ShowPDF :fileData="edited.serviceSLA.value" />
    </v-card-text>
    <v-card-text>
      <v-textarea label="Service Description" v-model="edited.serviceDescription.value" />
    </v-card-text>
    <v-card-text>
      <v-text-field
        label="downstream speed"
        v-model="edited.downstreamSpeed.value"
        :rules="[rules.onlyDigits]"
      />
    </v-card-text>
    <v-card-text>
      <v-text-field
        label="upstream speed"
        v-model="edited.upstreamSpeed.value"
        :rules="[rules.onlyDigits]"
      />
    </v-card-text>
    <v-card-text>
      <v-text-field label="Data Limit" v-model="edited.dataLimit.value" />
    </v-card-text>
    <v-card-text>
      <v-text-field
        label="MRC"
        v-model="edited.MRC.value"
        :rules="[rules.onlyDigits]"
      />
    </v-card-text>
    <v-card-text>
      <v-text-field
        label="NRC"
        v-model="edited.NRC.value"
        :rules="[rules.onlyDigits]"
      />
    </v-card-text>
    <v-card-text>
      <v-text-field
        label="Equipment Cost"
        v-model="edited.equipmentCost.value"
        :rules="[rules.onlyDigits]"
      />
    </v-card-text>
    <v-card-text>
      <v-checkbox v-model="edited.equipmentRequired.value" label="Equipment Required" />
    </v-card-text>
    <v-card-text>
      <v-text-field label="Equipment Type" v-model="edited.equipmentType.value" />
    </v-card-text>
    <v-card-text>
      <v-text-field label="Contract Term" v-model="edited.contractTerm.value" />
    </v-card-text>
    <v-card-text>
      <v-text-field
        label="Free Trial"
        v-model="edited.freeTrial"
        :rules="[rules.onlyDigits]"
      />
    </v-card-text>
    <v-card-text>
      <v-text-field label="Discount on NRC" v-model="edited.discountOnNRC.value" />
    </v-card-text>
    <v-card-text>
      <v-text-field label="Discount on MRC" v-model="edited.discountOnMRC.value" />
    </v-card-text>
    <v-card-text>
      <v-text-field
        label="Number of Users per Parther"
        v-model="edited.numberOfUsersPerPartner.value"
      />
    </v-card-text>
    <v-card-text>
      <v-text-field label="GST inc ex" v-model="edited.gstIncEx.value" />
    </v-card-text>
  </v-card>
</template>

<script>

import { mapMutations, mapActions } from 'vuex'

export default {
  props: ['id', 'service'],
  components: {
    ShowPDF: () => import('@/components/ShowPDF.vue')
  },
  data () {
    return {
      sla: null,
      rules: {
        required: v => !!v || 'input is required',
        onlyDigits: v => !/\D/g.test(v) || 'input should consist only of digits'
      }
    }
  },
  computed: {
    edited: {
      get () {
        return this.service
      },
      set (val) {
        this.$emit('update:service', val)
      }
    }
  },
  watch: {
    sla: {
      deep: true,
      handler (file) {
        this._readFile(file).then((result) => {
          if (!result.error) this.edited.serviceSLA.value = result.body
        })
      }
    },
    edited: {
      immediate: true,
      deep: true,
      handler (val) {
        val && this.$emit('update:service', val)
      }
    }
  },
  methods: {
    ...mapActions('services', {
      createService: 'ADD_NEW_SERVICE',
      updateService: 'UPDATE_SERVICE'
    }),
    ...mapMutations({
      showErrorMessage: 'ERROR'
    }),
    async upload (file) {
      const response = await this._readFile(file)
      console.log(response)
      if (response.error) {
        this.showErrorMessage({
          error: true,
          errorType: 'Upload file',
          errorMessage: 'Operation failed...'
        })
        return null
      }

      return response
    },
    async save () {
      const formData = new FormData()
      this.data.forEach(item => {
        formData.set()
      })
      // const fd = new FormData()
      // Object.entries(this.data).forEach(([name, value]) => {
      //   if (value instanceof File) fd.append('file', value)
      //   else if (value) fd.append(name, value)
      //   fd.append(name, value)
      // })
      const res = await (
        await fetch(!this.id ? `${process.env.VUE_APP_API_URL}/service` : `${process.env.VUE_APP_API_URL}/service/${this.id}`, {
          method: this.id ? 'PUT' : 'POST',
          body: JSON.stringify(this.data),
          headers: {
            'Content-type': 'application/json',
            Authorization: process.env.VUE_APP_AUTHORIZATION_KEY
          }
        })
      ).json()
      if (!res.error) {
        // this.$parent.replaceServiceId({ ...this.data, _id: this.id })
        this.$parent.getServices()
        this.$emit('update:showEdit', false)
      }
    }
  }
}
</script>

<style>
.v-select > .v-input__control > .v-input__slot {
  border: unset;
  height: unset;
}
</style>
