<template>
  <div v-if="show('Common')">
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

    <!-- <Button
      :click="
        () => {
          to({ name: 'RouteName', params: { id: params.id } })
        }
      "
      icon="delete"
      color="#900"
      text="RouteName"
    /> -->
  </div>
</template>

<script>
import Button from '@/components/Button'

export default {
  name: 'TicketsBtnGroup',
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
    this.$ticketLayoutRouter.addListener(this.callBack)
    this.params = this.$ticketLayoutRouter.getParams()
    this.name = this.$ticketLayoutRouter.getRouteName()
  },
  destroyed () {
    this.$ticketLayoutRouter.removeListener(this.callBack)
  }
}
</script>
