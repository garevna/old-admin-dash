<template>
  <v-card class="white pb-4 mb-10" v-if="edited">
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
    <v-card-text
      class="pa-0"
      v-for="item in service"
      :key="item.label"
    >
      <v-col>
        <v-text-field
          v-if="item.type === 'string' || item.type === 'number'"
          :value="item.value"
          :label="item.label"
          v-model="item.value"
          :rules="item.type==='number' ? [rules.onlyDigits, rules.required] : [rules.required]"
          dense
        ></v-text-field>
      </v-col>
      <v-col v-if="item.type === 'boolean'">
        <v-checkbox
          :value="item.value"
          :label="item.label"
          v-model="item.value"
        ></v-checkbox>
      </v-col>
      <v-col
        v-if="item.type==='file'"
      >
        <v-file-input
          :label="item.label"
          prepend-icon="$upload"
          v-model="sla"
        ></v-file-input>
        <ShowPDF :fileData="item.value" />
      </v-col>
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
      updateService: 'UPDATE_SERVICE'
    }),
    ...mapMutations({
      showErrorMessage: 'ERROR'
    }),
    async upload (file) {
      const response = await this._readFile(file)
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
      this.updateService(this.id, this.service)
    }
  }
}
</script>
