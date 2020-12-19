import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: {
      accounts: 'mdi-account-box-multiple',
      archive: 'mdi-archive',
      add: 'mdi-note-plus',
      block: 'mdi-checkbox-blank',
      buildings: 'mdi-home-city-outline',
      case: 'mdi-briefcase-variant',
      common: 'mdi-ballot',
      connection: 'mdi-cast-connected',
      connectivity: 'mdi-connection',
      customers: 'mdi-text-account',
      diagnostics: 'mdi-marker-check',
      edit: 'mdi-pencil',
      empty: 'mdi-checkbox-blank-outline',
      error: 'mdi-alert',
      delete: 'mdi-trash-can',
      dropdown: 'mdi-menu-down',
      face: 'mdi-account-circle',
      generalDescription: 'mdi-file-table',
      infrastructure: 'mdi-pencil-ruler',
      instruments: 'mdi-hammer-screwdriver',
      list: 'mdi-view-list',
      map: 'mdi-map',
      marker: 'mdi-map-marker',
      menu: 'mdi-dots-vertical',
      message: 'mdi-message-reply-text',
      window: 'mdi-open-in-new',
      other: 'mdi-folder-table',
      pdf: 'mdi-file-pdf',
      registration: 'mdi-account-plus',
      rightArrow: 'mdi-arrow-right-bold',
      save: 'mdi-content-save',
      send: 'mdi-send',
      tickets: 'mdi-card-text',
      upload: 'mdi-file-upload'
    }
  },
  theme: {
    themes: {
      light: {
        primary: '#881F1A',
        secondary: '#E15240',
        buttons: '#881F1A',
        buttonActive: '#882F1A',
        homefone: '#FBFBFB',
        accent: '#f3f3f3',
        inputs: '#EFEFEF',
        activefield: '#D9D9D9',
        warning: '#FAFF00',
        info: '#fbfbfb'
      },
      dark: {
        primary: '#FF0E00',
        secondary: '#E82F37',
        buttons: '#F54436',
        homefone: '#FEFEFE',
        fields: '#EFEFEF',
        activefield: '#D9D9D9',
        warning: '#FAFF00'
      }
    }
  }
})
