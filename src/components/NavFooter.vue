<template>
  <v-footer color="primary" padless>
    <v-row justify="center" no-gutters>
      <!-- <v-btn
        v-for="link in links"
        :key="link.name"
        color="white"
        text
        rounded
        class="my-2"
        :to="link.route"
      >
        {{ link.name }}
      </v-btn> -->
      <div class="secondary text-center white--text">
        <span class="mx-4">
          <v-icon>mdi-copyright</v-icon
          ><strong>
            {{ new Date().getFullYear() }} AWS User Group Aotearoa
          </strong>
        </span>
        <span class="mx-4">
          <a href="mailto:enquiries@awsug.nz">enquiries@awsug.nz</a>
        </span>
        <span class="mx-4">
          <router-link v-if="userName" to="/members">
            <v-chip class="hoverPill ma-2" color="primary" pill>
              <v-icon class="mx-2" small>mdi-account-circle-outline</v-icon>
              <span class="mr-2">{{ userName }}</span>
            </v-chip>
          </router-link>
        </span>
        <span class="mx-4">
          <router-link v-if="userGroup.includes('admin')" to="/admin">
            <v-chip class="hoverPill ma-2" color="warning" pill>
              <v-icon class="mx-2" small>mdi-shield-account-outline</v-icon>
              <span class="mr-2">admin</span>
            </v-chip>
          </router-link>
        </span>
        <span class="mx-4">
          <router-link v-if="err" to="/account">
            <v-chip class="hoverPill ma-2" color="primary" pill>
              <v-icon class="mr-2"></v-icon>
              {{ err }}
            </v-chip>
          </router-link>
        </span>
      </div>
    </v-row>
  </v-footer>
</template>

<script>
import { Auth } from "aws-amplify";

export default {
  data: () => ({
    links: [{ name: "Home", route: "/" }],
    userName: "",
    userGroup: [],
    absolute: false,
    opacity: 1,
    overlay: false,
    err: ""
  }),
  methods: {
    authUser() {
      Auth.currentAuthenticatedUser()
        .then(user => {
          this.userName = user.username;
          this.userGroup =
            user.signInUserSession.accessToken.payload["cognito:groups"];
        })
        .catch(err => (this.err = err));
    }
  },
  mounted() {
    this.authUser();
  }
};
</script>
<style lang="scss" scoped>
.hoverPill:hover {
  cursor: pointer;
}
</style>
