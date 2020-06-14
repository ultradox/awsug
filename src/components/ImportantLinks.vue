<template>
  <v-container grid-list-xs class="ma-0 pa-0">
    <v-card class="mx-auto" shaped raised>
      <v-row>
        <v-col cols="12" md="6">
          <v-list class="ma-0 pa-0">
            <v-subheader class="headline white--text"
              >Important Links<v-icon class="ml-4"
                >mdi-progress-clock</v-icon
              ></v-subheader
            >
            <v-list-item-group v-model="item" color="accent">
              <v-list-item v-for="(item, i) in items" :key="i">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <router-link :to="item.link">
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </router-link>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="12" md="6">
          <!-- <v-list class="ma-0 pa-0">
            <v-subheader
              class="headline white--text d-none d-md-flex"
            ></v-subheader>
            <v-sheet
              :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
              class="px-3 pt-3 pb-3 ma-2"
            >
              <v-skeleton-loader
                class="mx-auto"
                max-width="300"
                type="list-item-three-line"
              ></v-skeleton-loader>
            </v-sheet> -->
          <!-- <v-list-item-group v-model="link" color="accent">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-calendar-search</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <a
                    href="https://www.meetup.com/Amazon-Web-Services-Wellington-User-Group/"
                    target="_blank"
                    ><v-list-item-title>Events</v-list-item-title></a
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-ruler-square-compass</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <a href="/code-of-coduct"
                    ><v-list-item-title>Code of Conduct</v-list-item-title></a
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>-->
          <!-- </v-list> -->
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  inject: ["theme"],
  data: () => ({
    item: "",
    link: "",
    items: [
      {
        text: "Constitution",
        icon: "mdi-ruler-square-compass",
        link: "/constitution"
      },
      {
        text: "Register as a Speaker",
        icon: "mdi-account-voice",
        link: "/speaker"
      }
      // { text: "Contact the Organisers", icon: "mdi-send", link: "/" }
    ]
  })
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
