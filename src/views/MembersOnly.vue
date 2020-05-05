<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <p class="display-1 font-weight-light">
            Welcome <span class="error--text">{{ userName }}</span> ❣️
          </p>
          <v-btn fixed left large fab color="error darken-2" @click="signOut">
            <v-icon>mdi-logout</v-icon></v-btn
          >
          <p class="subtitle-1 grey--text text--lighten-2">
            Welcome to the members only page.
          </p>

          <v-btn to="/profile">Change my password</v-btn>
        </v-col>
      </v-row>
      <amplify-photo-picker
        v-bind:photoPickerConfig="photoPickerConfig"
      ></amplify-photo-picker>
    </v-container>
    <v-img
      :src="require('../assets/logo-onblack.png')"
      class="my-3"
      contain
      height="200"
    ></v-img>
  </div>
</template>

<script>
import { AmplifyEventBus } from "aws-amplify-vue";
import { Auth } from "aws-amplify";

// Storage.configure({ level: "private " });
const photoPickerConfig = {
  header: "Certification Upload",
  path: "certs/",
  storageOptions: { level: "private" }
};
const s3AlbumConfig = {
  storageOptions: { level: "private" }
};

export default {
  name: "App",

  data: () => ({
    photoPickerConfig,
    s3AlbumConfig,
    userName: "",
    userId: "",
    instruction: "mdi-school",
    justify: "space-around",
    align: "start",
    err: ""
  }),
  methods: {
    async signOut() {
      await Auth.signOut()
        .then(data => (this.info = data))
        .catch(err => (this.err = err));
      AmplifyEventBus.$emit("authState", "signOut");
      this.$router.push("/");
    },
    async getUser() {
      try {
        const user = await Auth.currentUserInfo();
        this.userName = user.username;
        this.userId = user.attributes.sub;
        // const idToken = cognitoUserSession.getIdToken();
        // return idToken.getJwtToken();
      } catch (e) {
        this.err = e;
      }
    }
  },
  created: function() {
    this.getUser();
  },
  mounted() {
    this.$vuetify.theme.dark = true;
  }
};
</script>

<style lang="scss" scoped></style>
