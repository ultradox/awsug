<template>
  <v-container grid-list-xs class="ma-0 pa-0">
    <v-card class="mx-auto" shaped raised>
      <h1 class="headline white--text ml-6 pt-6">
        Leaderboard - coming May 2020
        <v-icon class="ml-4">mdi-progress-clock</v-icon>
      </h1>
      <v-sheet class="px-3 pt-3 pb-3">
        <v-skeleton-loader
          class="mx-auto"
          type="table-tbody"
        ></v-skeleton-loader>
      </v-sheet>
    </v-card>
  </v-container>
</template>

<script>
export default {
  // Vuetify components provide
  // a theme variable that is
  // used to determine dark
  inject: ["theme"]
};
</script>

<style lang="scss" scoped></style>
