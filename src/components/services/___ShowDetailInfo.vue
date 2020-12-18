<template>
  <v-card flat class="d-flex flex-column align-center transparent">
    <TableDetail :data="service" :options="options"/>
    <v-card-actions class="py-8">
      <v-btn @click="close"> close </v-btn>
      <v-btn @click="edit" class="mx-8">edit</v-btn>
      <v-btn @click="removeService">remove</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import TableDetail from '@/components/table/TableDetail'

export default {
  props: ['openDetailInfo', 'service', 'showEdit'],
  components: {
    TableDetail
  },
  data () {
    return {
      options: [
        {
          text: 'Service Name',
          prop: 'serviceName'
        },
        {
          text: 'Service Type',
          prop: 'serviceType'
        },
        {
          text: 'Service SLA',
          prop: 'serviceSLA'
        },
        {
          text: 'Downstream Speed',
          prop: 'downstreamSpeed'
        },
        {
          text: 'Upstream Speed',
          prop: 'upstreamSpeed'
        },
        {
          text: 'Data Limit',
          prop: 'dataLimit'
        },
        {
          text: 'NRC',
          prop: 'NRC'
        },
        {
          text: 'MRC',
          prop: 'MRC'
        },
        {
          text: 'Equipment Cost',
          prop: 'equipmentCost'
        },
        {
          text: 'Equipment Required',
          prop: 'equipmentRequired'
        },
        {
          text: 'equipmentType',
          prop: 'equipmentRequired'
        },
        {
          text: 'Contract Term',
          prop: 'contractTerm'
        },
        {
          text: 'Free Trial',
          prop: 'freeTrial'
        },
        {
          text: 'Discount On NRC',
          prop: 'discountOnNRC'
        },
        {
          text: 'Discount On MRC',
          prop: 'discountOnMRC'
        },
        {
          text: 'Number Of Users Per Partner',
          prop: 'numberOfUsersPerPartner'
        },
        {
          text: 'GST_inc_ex',
          prop: 'GST_inc_ex'
        },
        {
          text: 'Service Description',
          prop: 'serviceDescription'
        }
      ]
    }
  },
  computed: {
    // service () {
    //   return Object.entries(this.currentServise)
    // }
  },
  methods: {
    edit () {
      this.$emit('update:openDetailInfo', false)
      this.$emit('update:showEdit', true)
    },
    async removeService () {
      const { deleted, error } = await (
        await fetch(`${process.env.VUE_APP_API_URL}/service/${this.service._id}`, {
          method: 'DELETE',
          headers: {
            Authorization: process.env.VUE_APP_AUTHORIZATION_KEY
          }
        })
      ).json()
      if (!error && deleted) {
        // this.$parent.remove(this.service._id)
        this.$parent.getServices()
        this.$emit('update:openDetailInfo', false)
      }
    },
    close () {
      this.$emit('update:openDetailInfo', false)
      // this.$emit('update:currentServise', null)
    }
  }
}
</script>

<style>
tr,td {
  color:black;
}
</style>
