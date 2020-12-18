<template>
  <div v-if="resellerId">
    <Button
      :clicked.sync="acceptBtn"
      icon="delete"
      color="#900"
      text="accept"
    />

    <Button
      :clicked.sync="rejectBtn"
      icon="delete"
      color="#900"
      text="reject"
    />

    <Button
      :clicked.sync="sendBtn"
      icon="delete"
      color="#900"
      text="send"
    />

    <Button
      :click="
        () => {
          to({ name: 'ClientsOfReseller', params: { id: params.id } })
        }
      "
      icon="delete"
      color="#900"
      text="Clients of reseller"
    />

    <Button
      :click="
        () => {
          to({ name: 'EndCustomers', params: { id: params.id } })
        }
      "
      icon="delete"
      color="#900"
      text="End customers"
    />

    <Button
      :click="
        () => {
          to({ name: 'Traffic', params: { id: params.id } })
        }
      "
      icon="delete"
      color="#900"
      text="Traffic"
    />

    <Button
      :click="
        () => {
          to({ name: 'Payments', params: { id: params.id } })
        }
      "
      icon="delete"
      color="#900"
      text="Payments"
    />

    <Button
      :click="
        () => {
          to({ name: 'Receivables', params: { id: params.id } })
        }
      "
      icon="delete"
      color="#900"
      text="Receivables"
    />

    <Button
      :click="
        () => {
          to({ name: 'BillsBills', params: { id: params.id } })
        }
      "
      icon="delete"
      color="#900"
      text="Bills"
    />

    <Button
      :click="
        () => {
          to({ name: 'Reseller', params: { id: params.id } })
        }
      "
      icon="delete"
      color="#900"
      text="Reseller"
    />
  </div>
  <!-- <div
          v-if="resellerId"
        >
          <Button
            :click="() => { to({ name: 'Reseller', params: { id: params.id } }) }"
            icon="delete"
            color="#900"
            text="Reseller"
          />
          <Button
            :click="console"
            icon="delete"
            color="#900"
            text="Reseller"
          />
          <v-btn
            @click="to({ name: 'ClientsOfReseller', params: { id: params.id } })"
          >
            Clients of reseller
          </v-btn>
          <v-btn
            @click="to({ name: 'EndCustomers', params: { id: params.id } })"
          >
            End customers
          </v-btn>
          <v-btn
            @click="to({ name: 'Traffic', params: { id: params.id } })"
          >
            Traffic
          </v-btn>
          <v-btn
            @click="to({ name: 'Payments', params: { id: params.id } })"
          >
            Payments
          </v-btn>
          <v-btn
            @click="to({ name: 'Receivables', params: { id: params.id } })"
          >
            Receivables
          </v-btn>
          <v-btn
            @click="to({ name: 'BillsBills', params: { id: params.id } })"
          >
            Bills
          </v-btn>
          <v-btn
            @click="to({ name: 'Reseller', params: { id: params.id } })"
          >
            Reseller
          </v-btn>
        </div> -->
</template>

<script>
import Button from '@/components/Button'

export default {
  name: 'RSPBtnGroup',
  props: ['accept', 'reject', 'send'],

  components: {
    Button
  },

  data: () => ({
    name: '',
    params: {},
    resellerId: null
  }),

  computed: {
    acceptBtn: {
      get () {
        return this.accept
      },
      set (val) {
        this.$emit('update:accept', val)
      }
    },
    rejectBtn: {
      get () {
        return this.reject
      },
      set (val) {
        this.$emit('update:reject', val)
      }
    },
    sendBtn: {
      get () {
        return this.send
      },
      set (val) {
        this.$emit('update:send', val)
      }
    }
  },

  methods: {
    to (obj) {
      this.$RSPLayoutRouter.to(obj)
    },
    show (name) {
      return this.name === name
    },
    callBack ({ name, params }) {
      this.name = name
      this.params = params
      this.resellerId = params.id
    }
  },
  created () {
    this.$RSPLayoutRouter.addListener(this.callBack)
    this.params = this.$RSPLayoutRouter.getParams()
    this.name = this.$RSPLayoutRouter.getRouteName()
  },
  destroyed () {
    this.$RSPLayoutRouter.removeListener(this.callBack)
  }
}
</script>
