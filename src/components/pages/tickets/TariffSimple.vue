<template>
  <v-card flat class="transparent mx-auto my-5" width="480">
  <!-- <v-expansion-panels flat>
    <v-expansion-panel>
      <v-expansion-panel-header><b> Tariff </b></v-expansion-panel-header>
      <v-expansion-panel-content> -->
        <v-simple-table dense>
          <template v-slot:default>
            <tbody>
              <tr>
                <td class="tariff">Tariff name</td>
                <td class="tariff"> {{ currentTariff.tariffName || '' }} </td>
              </tr>
              <tr>
                <td class="tariff">Downstream Speed</td>
                <td class="tariff"> {{ currentTariff.downstreamSpeed || '' }} </td>
              </tr>
              <tr>
                <td class="tariff">Upstream Speed</td>
                <td class="tariff"> {{ currentTariff.upstreamSpeed || '' }} </td>
              </tr>
              <tr>
                <td class="tariff">Data Limit</td>
                <td class="tariff"> {{ currentTariff.dataLimit || '' }} </td>
              </tr>
              <tr>
                <td class="tariff">Price</td>
                <td class="tariff"> {{ currentTariff.price || '' }} </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      <!-- </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels> -->
  </v-card>
</template>

<script>

export default {
  name: 'TariffSimple',
  props: ['currentTariff']
}
</script>

<style scoped>
.tariff {
  font-size: 12px!important;
}
</style>
