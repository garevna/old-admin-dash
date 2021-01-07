<template>
  <v-container>
    <v-app-bar app>
      <v-toolbar flat class="transparent">
        <v-toolbar-title>
          <h5>
            <v-icon color="#900" class="mr-2">{{ currentIcon || '$rsp' }}</v-icon>
            {{ currentSubject }}
          </h5>
          <h6>{{ currentDescription }}</h6>
        </v-toolbar-title>
        <v-spacer />
        <v-tooltip
          bottom
          color="primary"
          v-for="(item, index) in menuOptions"
          :key="index"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              :color="goto !== item.value ? '#333' : 'primary'"
              dark
              v-on="on"
              @click="goto = item.value"
            >
              <v-icon>{{ item.icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ item.text }}</span>
        </v-tooltip>
        <!-- <Menu :options="menuOptions" :goto.sync="goto" /> -->
      </v-toolbar>
    </v-app-bar>

    <v-row justify="center">
      <Resellers
        :id.sync="currentId"
        :goto="goto"
      />
      <!-- <Reseller v-if="goto === 'reseller'" />
      <EndCustomers v-if="goto === 'customers'" />
      <Traffic v-if="goto === 'traffic'" />
      <Payments v-if="goto === 'payments'"  />
      <Receivables v-if="goto === 'debts'" />
      <Bills v-if="goto === 'bills'" /> -->
    </v-row>
  </v-container>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'RSP',

  components: {
    Resellers: () => import('@/components/pages/users/Resellers')
  },

  data: () => ({
    currentSubject: '',
    currentDescription: '',
    currentIcon: '',
    currentId: null,
    currentRSP: null,
    menuOptions: [
      {
        text: 'Profile',
        description: 'RSP profiles',
        value: 'profile',
        icon: '$rsp'
      },
      {
        text: 'Traffic',
        description: 'Summary trafic of all end customers',
        value: 'traffic',
        icon: '$traffic'
      },
      {
        text: 'End customers',
        description: 'List of RSP\' end customers',
        value: 'customers',
        icon: '$customers'
      },
      {
        text: 'Bills & payments',
        description: 'RSP\' bills and payments',
        value: 'bills',
        icon: '$bills'
      }
    ],
    goto: 'profile'
  }),

  computed: {
    ...mapGetters(['users']),
    rsp () {
      return this.users.filter(user => user.role === 'RSP')
    }
  },

  watch: {
    goto: {
      immediate: true,
      handler (val) {
        const option = this.menuOptions.find(item => item.value === val)
        this.currentSubject = option.text
        this.currentDescription = option.description
        this.currentIcon = option.icon
      }
    }
  }
}
</script>
