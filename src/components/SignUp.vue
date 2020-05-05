<template>
  <v-container wrap>
    <v-row>
      <v-col cols="12" lg="6" md="8" sm="10" offset-sm="1">
        <div>
          <h2 class="headline font-weight-bold mb-3">
            {{ !signUpState ? "Sign up" : "Confirm Sign Up" }}
          </h2>
        </div>

        <v-form
          ref="signUpRef"
          lazy-validation
          v-model="valid"
          v-if="!signUpState"
        >
          <p>
            Many site features require that you signup as a member.
          </p>
          <p>
            Your email address is needed to verify your account. We will never
            send unsolicited emails, or share user information with third
            parties.
          </p>
          <p>
            Please complete the form below, and click on the "Submit" button.
            You'll be redirected to a page where you must enter a verification
            code which will be emailed to you. You should allow up to 2 minutes
            for this email to arrive, and it might end up in your spam folder.
          </p>
          <p>
            After entering your verification code, you'll be directed to the
            sign in page.
          </p>
          <p>
            The verification process is once-off.
          </p>
          <v-text-field
            v-model="form.username"
            :rules="usernameRules"
            label="* Username"
            required
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
          <v-text-field
            v-model="form.email"
            :rules="emailRules"
            label="* E-mail"
            required
          ></v-text-field>
          <v-btn
            :disabled="!checkValidFinal"
            color="blue-grey"
            class="mr-4"
            @click="signUp"
            :loading="loading"
            >Submit</v-btn
          >
        </v-form>
        <v-form ref="confirmSignUpRef" lazy-validation v-if="signUpState">
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
            label="Verification code"
          ></v-text-field>
          <v-btn
            color="blue-grey"
            class="mr-4"
            @click="confirmSignUp"
            :loading="loading"
          >
            Submit
          </v-btn>
        </v-form>
        <v-switch
          label="Enter verification code"
          v-model="signUpState"
        ></v-switch>

        Already have an account?
        <v-btn large text to="/account">Sign in</v-btn>
        <div v-if="err">
          <br />
          <v-alert type="error">
            {{ err.message }}
          </v-alert>
          <br />
        </div>
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
      signUpState: false,
      loading: false,
      form: {
        username: "",
        password: "",
        passwordConfirm: "",
        email: ""
      },
      usernameRules: [
        v => !!v || "Username is required",
        v => (v && v.length <= 10) || "Username must be less than 10 characters"
      ],
      passwordRules: [v => !!v || "Password is required"],
      passwordRulesConfirm: [
        v => !!v || "Confirm password required",
        v => v === this.form.password || "Passwords do not match"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      info: "",
      err: ""
    };
  },
  computed: {
    checkValidRequired: function() {
      return !!this.form.username && !!this.form.password && !!this.form.email;
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
      this.signUpState = !this.signUpState;
    },
    async signUp() {
      this.loading = true;
      const { username, password, email } = this.form;
      try {
        await Auth.signUp({
          username,
          password,
          attributes: { email }
        });
        this.toggle();
        this.loading = false;
      } catch (e) {
        this.err = e;
        this.loading = false;
      }
    },
    // After retrieveing the confirmation code from the user
    async confirmSignUp() {
      this.loading = true;
      const { username, code } = this.form;
      Auth.confirmSignUp(username, code, {
        // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        forceAliasCreation: true
      })
        .then(data => {
          this.info = data;
          this.loading = false;
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
