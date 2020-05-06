<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="5" md="6" sm="8" offset-sm="1">
        <div v-if="!userName">
          <h2 class="headline font-weight-bold mb-3">
            Sign in
          </h2>
          <v-form ref="signInForm" lazy-validation>
            <v-text-field
              v-model="form.username"
              :rules="usernameRules"
              label="Username"
              required
            ></v-text-field>
            <v-text-field
              type="password"
              v-model="form.password"
              :rules="passwordRules"
              label="Password"
              required
            ></v-text-field>
            <br />
            <v-btn
              large
              :loading="loading"
              :disabled="!checkValidFinal"
              color="primary darken-1"
              @click="signIn"
              width="180"
              >Submit <v-icon right dark>mdi-gesture-tap-button</v-icon>
            </v-btn>
          </v-form>
          <br />
          <div v-if="err">
            <v-alert type="error">
              {{ err }}
            </v-alert>
          </div>
          <div v-if="info">
            <v-alert type="info">
              {{ info }}
            </v-alert>
          </div>
          <v-row>
            <v-col cols="6">
              <p class="my-2">Need an account?</p>
            </v-col>
            <v-col cols="3">
              <v-btn large class="mx-4" to="/signup" width="180">Sign up</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <p class="my-2">Forgot your password?</p>
            </v-col>
            <v-col cols="3">
              <v-btn large class="mx-4" to="/reset-password" width="180"
                >Reset password</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Auth } from "aws-amplify";
import { AmplifyEventBus } from "aws-amplify-vue";

export default {
  name: "Signin",
  data() {
    return {
      userName: "",
      userId: "",
      user: {},
      err: "",
      errGetUser: "", // storing seperate error message for getUser() otherwise error displays on page load
      info: "",
      loading: false,
      form: {
        username: "",
        password: ""
      },
      usernameRules: [
        v => !!v || "Username is required",
        v => (v && v.length <= 10) || "Username must be less than 10 characters"
      ],
      passwordRules: [v => !!v || "Password is required"]
    };
  },
  computed: {
    checkValidFinal: function() {
      return !!this.form.password && !!this.form.username;
    }
  },
  methods: {
    async getUser() {
      try {
        const user = await Auth.currentUserInfo();
        this.user = user;
        this.userName = user.username;
        this.userId = user.userId;
        this.$router.push("/members");
      } catch (e) {
        this.errGetUser = e;
      }
    },
    async signOut() {
      await Auth.signOut()
        .then(data => (this.info = data))
        .catch(err => (this.err = err));
      this.$router.push("/");
    },
    async signIn() {
      try {
        this.loading = true;
        this.err = "";
        const { username, password } = this.form;
        await Auth.signIn({
          username,
          password
        });
        AmplifyEventBus.$emit("authState", "signIn");
        this.$router.push("/members");
      } catch (err) {
        this.err = "Your credentials are invalid.";
        this.loading = false;
      }
    },
    // After retrieveing the confirmation code from the user
    async confirmSignUp() {
      const { username, code } = this.form;
      Auth.confirmSignUp(username, code, {
        // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        forceAliasCreation: true
      })
        .then(data => {
          this.info = data;
          // this line confuses me so! Where does toggle come in? I only see it in the props, but does it $emit or something? What is its relation with Auth.vue
          this.toggle();
        })
        .catch(err => (this.err = err));
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
