<template>
  <v-layout wrap>
    <v-flex ma-6>
      <v-container>
        <div>
          <h2>Manage my Password</h2>
        </div>

        <v-form ref="signUpRef" lazy-validation v-model="valid">
          <v-text-field
            v-model="form.username"
            label="Username"
            disabled
          ></v-text-field>
          <v-text-field
            type="Password"
            v-model="form.oldPassword"
            :rules="passwordRulesOld"
            label="Old Password"
            required
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="form.newPassword"
            :rules="passwordRules"
            label="New Password"
            required
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="form.passwordConfirm"
            :rules="passwordRulesConfirm"
            label="Confirm New Password"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.email"
            :rules="emailRules"
            label="E-mail"
            disabled
          ></v-text-field>
          <v-btn
            large
            :disabled="!checkValidFinal"
            color="success"
            class="mr-4"
            @click="manageProfile"
            >Submit</v-btn
          >
        </v-form>
        <div v-if="err">
          <br />
          <v-alert type="error">
            {{ err.message }}
          </v-alert>
          <br />
        </div>
        <div v-if="info">
          <br />
          <v-alert type="info">
            {{ info }}
          </v-alert>
          <br />
        </div>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { Auth } from "aws-amplify";

export default {
  name: "ManageProfile",
  data() {
    return {
      valid: false,
      userId: "",
      form: {
        username: "",
        oldPassword: "",
        newPassword: "",
        passwordConfirm: "",
        email: "",
        user: {}
      },
      passwordRulesOld: [
        v => !!v || "Old password is required",
        v =>
          v !== this.form.newPassword ||
          "Your old password is the same as the new password"
      ],
      passwordRules: [
        v => !!v || "New password is required",
        v =>
          (v && v.length > 5) || "Password must be at least 6 characters long",
        v =>
          v !== this.form.oldPassword ||
          "Your new password is the same as the old password"
      ],
      passwordRulesConfirm: [
        v => !!v || "Confirm password required",
        v => v === this.form.newPassword || "Passwords do not match"
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
      return (
        !!this.form.username &&
        !!this.form.newPassword &&
        !!this.form.passwordConfirm &&
        !!this.form.oldPassword &&
        !!this.form.email
      );
    },
    checkValidFinal: function() {
      return !!this.checkValidRequired && !!this.valid;
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    async manageProfile() {
      const { user, oldPassword, newPassword } = this.form;
      try {
        await Auth.changePassword(user, oldPassword, newPassword);
        this.info = "Your password was updated successfully";
        this.err = "";
      } catch (e) {
        this.err = e;
      }
    },
    async getUser() {
      try {
        const user = await Auth.currentUserPoolUser();
        this.form.user = user;
        this.form.username = user.username;
        this.form.email = user.attributes.email;
      } catch (e) {
        this.errGetUser = e;
      }
    }
  },
  mounted: function() {
    this.getUser();
  }
};
</script>
