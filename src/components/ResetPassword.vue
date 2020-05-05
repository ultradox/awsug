<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6" md="8" sm="10" offset-sm="1">
        <div>
          <h2 class="headline font-weight-bold mb-3">
            I forgot my password 😬
          </h2>
        </div>

        <v-form
          ref="forgotPW"
          lazy-validation
          v-model="valid"
          v-if="!formState"
        >
          <v-text-field
            v-model="form.username"
            :rules="usernameRules"
            label="* Username"
            required
          ></v-text-field>
          <v-btn
            large
            :loading="loading"
            :disabled="!checkValidFinal"
            color="primary darken-1"
            @click="forgotPW"
            width="180"
            >Submit <v-icon right dark>mdi-gesture-tap-button</v-icon>
          </v-btn>
        </v-form>
        <v-form ref="confirmForgotPW" lazy-validation v-if="formState">
          <p>
            Did you receive an email with your verification code? Allow up to
            two minutes for this email to arrive.
          </p>
          <v-text-field
            v-model="form.username"
            :rules="usernameRules"
            label="* Username"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.code"
            label="* Verification code"
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="form.password"
            :rules="passwordRules"
            label="* Password"
            required
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="form.passwordConfirm"
            :rules="passwordRulesConfirm"
            label="* Confirm password"
            required
          ></v-text-field>
          <v-btn
            large
            :loading="loading"
            :disabled="!checkValidFinal"
            color="primary darken-1"
            @click="confirmForgotPW"
            width="180"
            >Submit <v-icon right dark>mdi-gesture-tap-button</v-icon>
          </v-btn>
        </v-form>
        <div v-if="err">
          <v-alert type="error">
            {{ err.message }}
          </v-alert>
        </div>
        <v-switch
          label="Enter verification code"
          v-model="formState"
        ></v-switch>
        <v-row>
          <v-col cols="6">
            <p class="my-2">Already have an account?</p>
          </v-col>
          <v-col cols="3">
            <v-btn large class="mx-4" to="/account" width="180">Sign in</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Auth } from "aws-amplify";

export default {
  name: "Signup",
  data() {
    return {
      valid: false,
      formState: false,
      loading: false,
      form: {
        username: "",
        code: "",
        password: "",
        passwordConfirm: ""
      },
      usernameRules: [
        v => !!v || "Username is required",
        v => (v && v.length <= 10) || "Username must be less than 10 characters"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length > 7) || "Password must be greater than 7 characters"
      ],
      passwordRulesConfirm: [
        v => !!v || "Confirm password required",
        v => v === this.form.password || "Passwords do not match"
      ],
      info: "",
      err: ""
    };
  },
  computed: {
    checkValidRequired: function() {
      return !!this.form.username;
    },
    checkValidFinal: function() {
      return !!this.checkValidRequired && !!this.valid;
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    toggle() {
      this.formState = !this.formState;
    },
    async forgotPW() {
      this.loading = true;
      const { username } = this.form;
      Auth.forgotPassword(username)
        .then(data => {
          this.toggle();
          this.info = data;
        })
        .catch(err => {
          this.err = err;
        });
      this.loading = false;
    },
    // After retrieveing the confirmation code from the user
    async confirmForgotPW() {
      this.loading = true;
      const { username, code, password } = this.form;
      Auth.forgotPasswordSubmit(username, code, password)
        .then(data => {
          this.loading = false;
          this.info = data;
          this.$router.push("/account");
        })
        .catch(err => {
          this.err = err;
          this.loading = false;
        });
    }
  },
  mounted() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-property: all;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateX(-25px);
}
</style>
