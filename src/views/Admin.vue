<template>
  <div class="container">
    <v-layout wrap>
      <v-flex ma-6>
        <div v-if="!userGroup.includes('admin')">
          <h1 class="display-1 font-weight-bold mb-3">
            This page is only for admins
          </h1>
        </div>
        <div v-else>
          <h1 class="display-1 font-weight-bold mb-3">
            Welcome to the admin portal
            <span class="primary--text">{{ userName }}</span> ❣️
          </h1>
          <BlogRevPub />
          <hr />
          <br />
          <SpeakerList />
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import SpeakerList from "./SpeakerList";
import BlogRevPub from "../components/BlogRevPub";

export default {
  name: "Admins",
  components: {
    SpeakerList,
    BlogRevPub
  },
  data: () => ({
    userName: "",
    user: "",
    userGroup: []
  }),
  methods: {
    async authUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        this.user = user;
        this.userName = user.username;
        this.userGroup =
          user.signInUserSession.accessToken.payload["cognito:groups"] ||
          "not-an-admin";
      } catch (e) {
        this.errGetUser = e;
      }
      if (this.userGroup.includes("admin")) {
        return true;
      } else {
        this.$router.push("/members");
      }
    }
  },
  mounted() {
    this.authUser();
    this.$vuetify.theme.dark = true;
  }
};
</script>
