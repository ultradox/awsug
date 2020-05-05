<template>
  <div>
    <!-- Side Navbar (mobile apps) -->
    <v-navigation-drawer app temporary v-model="sideNav">
      <v-toolbar dark>
        <v-app-bar app color="secondary">
          <router-link to="/" tag="span" style="cursor: pointer">
            <div class="d-flex align-center">
              <v-img
                alt="AWSUG Logo"
                src="../assets/logo-onblack.png"
                transition="scale-transition"
                width="130"
              />
            </div>
          </router-link>
        </v-app-bar>
      </v-toolbar>
      <v-divider></v-divider>
      <!-- Side Navbar links -->
      <v-list>
        <v-list-item-group color="secondary">
          <v-list-item
            v-for="item in NavItems"
            :key="item.title"
            :to="item.link"
          >
            <v-list-item-content>{{ item.title }}</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- Horizontal Navbar -->
    <v-toolbar
      dark
      prominent
      src="https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/pawel-czerwinski2-nav.jpg"
    >
      <v-app-bar-nav-icon
        @click="toggleSideNav"
        class="d-flex d-sm-none"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <div class="headline d-none d-md-none d-md-flex">
          <router-link to="/">
            <v-img
              alt="AWS User Group Logo"
              class="mr-3 mt-5"
              src="https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/logo-onblack-simple.png"
              transition="scale-transition"
              :width="$vuetify.breakpoint.mdAndUp ? 184 : 130"
            />
          </router-link>
          <router-link to="/" style="color: white; text-decoration: none;">
            <p
              :class="{
                'display-2 mt-4': $vuetify.breakpoint.mdAndUp,
                'display-1 mt-4': $vuetify.breakpoint.smAndDown
              }"
            >
              AOTEAROA
            </p>
          </router-link>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="d-none d-sm-flex">
        <v-btn
          v-for="item in NavItems"
          :key="item.title"
          :to="item.link"
          class="pt-8"
          text
        >
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
    </v-toolbar>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";

export default {
  data: () => ({
    pathways: "Pathways",
    sideNav: false,
    userName: "",
    userId: "",
    NavItems: [
      { title: "Home", link: "/" },
      { title: "Blog", link: "/blog" },
      { title: "Members", link: "/members" }
    ]
  }),
  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    },
    async getUser() {
      try {
        const user = await Auth.currentUserInfo();
        this.userName = user.username;
        this.userId = user.attributes.sub;
      } catch (e) {
        this.err = e;
      }
    }
  },
  computed: {}
};
</script>

<style lang="scss">
.v-toolbar__content {
  padding-top: 0 !important;
}
</style>
