<template>
  <div class="container">
    <h1>
      Welcome
      <span v-if="userName" class="primary--text">{{ userName }}</span> ❣️
    </h1>
    <h2 class="headline">
      We're thrilled you'd like to present at our user group 😻
    </h2>
    <br />
    <v-form ref="form" v-model="valid" lazy-validation v-if="!hideStuff">
      <p class="headline">
        Please take a moment to complete the form below and we'll be in touch.
      </p>
      <br />
      <!-- 1) Firstname -->
      <v-text-field
        v-model="state.name"
        :counter="30"
        :rules="nameRules"
        label="First name"
        required
      ></v-text-field>
      <!-- 2) Surname -->
      <v-text-field
        v-model="state.surname"
        :counter="30"
        :rules="surnameRules"
        label="Surname"
        required
      ></v-text-field>
      <!-- 3) email -->
      <v-text-field
        v-model="state.email"
        :rules="emailRules"
        label="Email address"
        required
      ></v-text-field>
      <!-- 4) Mobile -->
      <v-text-field
        v-model="state.mobile"
        :rules="mobileRules"
        label="Mobile number"
        required
      ></v-text-field>

      <!-- 5) Description -->
      <v-textarea
        v-model="state.description"
        :rules="[v => !!v || 'A basic description of your topic is required']"
        label="Description of speaker topic"
      ></v-textarea>
      <!--  6) Estimated Length -->
      <v-select
        v-model="state.estimatedLength"
        :items="estimatedLengthItems"
        label="Estimated Length of Talk"
        :rules="[v => !!v || 'Estimated Length is required']"
        required
      ></v-select>
      <!-- Preferred Speaking Engagement Date #1 -->
      <p class="info--text">
        First Tuesday you'd like to speak
      </p>
      <v-menu
        v-model="menuDatePicker"
        :close-on-content-click="true"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="state.preferredSpeakerDate"
            label="Proposed Speaker Date"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="state.preferredSpeakerDate"
          class="mt-4"
          :min="today"
          :allowed-dates="allowedDates"
        ></v-date-picker>
      </v-menu>
      <!-- Preferred Speaking Engagerment Date #2 -->
      <p class="info--text">
        (Optional) Alternate first Tuesday of the month to speak
      </p>
      <v-menu
        v-model="menuDatePicker2"
        :close-on-content-click="true"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="state.preferredSpeakerDate2"
            label="Alternate Speaker Date"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="state.preferredSpeakerDate2"
          class="mt-4"
          :min="today"
          :allowed-dates="allowedDates"
        ></v-date-picker>
      </v-menu>

      <hr />
      <h3>Form submission</h3>
      <p>
        Once you click on the Submit button your form will be securely stored in
        a database, and the User Group internal organisers will be notified.
      </p>
      <!-- Checkbox -->
      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="By submitting this form, I verify that the AWS User Group Aotearoa and its representatives may contact me via email or telephone."
        required
      ></v-checkbox>
      <v-btn
        large
        v-if="!hideStuff"
        :disabled="!checkValidFinal"
        color="success"
        class="mr-4"
        @click="submitForm"
      >
        Submit <v-icon right dark>mdi-gesture-tap-button</v-icon>
      </v-btn>

      <v-btn large color="error" class="mr-4" @click="reset">
        Reset Form <v-icon right dark>mdi-file-undo-outline</v-icon>
      </v-btn>
    </v-form>
    <div v-if="graphQLInfo">
      <v-alert type="success">
        {{ graphQLInfo }}
      </v-alert>
    </div>
    <div v-if="res">
      <v-alert type="info">
        {{ res }}
      </v-alert>
    </div>
    <div v-if="emailing" class="text-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
      Sending email notifcation to the internal organisers...
    </div>
    <div v-if="graphQLError">
      <v-alert type="error">
        {{ graphQLError }}
      </v-alert>
    </div>
    <v-img
      :src="require('../assets/logo-onwhite.png')"
      class="my-3"
      contain
      height="200"
    ></v-img>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import API, { graphqlOperation } from "@aws-amplify/api";
import { createSpeakerEoi } from "../graphql/mutations";
import awsmobile from "../aws-exports";
import moment from "moment";

API.configure(awsmobile);

var tuesdays = [
  "2020-04-07",
  "2020-05-05",
  "2020-06-02",
  "2020-07-07",
  "2020-08-04",
  "2020-09-01",
  "2020-10-06",
  "2020-11-03",
  "2020-12-01"
];

export default {
  name: "SpeakerEOI",
  data: () => ({
    userName: "",
    graphQLError: "",
    graphQLInfo: "",
    res: "",
    emailing: "",
    hideStuff: false,
    valid: false,
    menuDatePicker: false,
    menuDatePicker2: false,
    state: {
      name: "",
      surname: "",
      email: "",
      mobile: "",
      description: "",
      estimatedLength: "",
      preferredSpeakerDate: "",
      preferredSpeakerDate2: "Not specified",
      sortHash: "Sorted"
    },

    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 30) || "Name must be less than 30 characters"
    ],
    surnameRules: [
      v => !!v || "Surname is required",
      v => (v && v.length <= 30) || "Surname must be less than 30 characters"
    ],
    mobileRules: [
      v => !!v || "Mobile number is required",
      v => (v && v.length <= 15) || "Mobile must be less than 15 characters"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    estimatedLengthItems: ["15 minutes", "30 minutes", "45 minutes"],
    checkbox: false
  }),
  computed: {
    checkValidRequired: function() {
      return (
        !!this.state.name &&
        !!this.state.surname &&
        !!this.state.email &&
        !!this.state.preferredSpeakerDate &&
        !!this.state.estimatedLength &&
        !!this.checkbox
      );
    },
    checkValidFinal: function() {
      return !!this.checkValidRequired && !!this.valid;
    },
    today: function() {
      return moment().format("YYYY-MM-DD");
    }
  },
  methods: {
    allowedDates: val => tuesdays.indexOf(val) !== -1,
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
      this.state.preferredSpeakerDate = "";
      this.graphQLError = "";
      this.graphQLInfo = "";
      this.hideStuff = false;
    },
    async submitForm() {
      const speakerEOI = {
        name: this.state.name,
        surname: this.state.surname,
        email: this.state.email,
        mobile: this.state.mobile,
        description: this.state.description,
        estimatedLength: this.state.estimatedLength,
        dateOption1: this.state.preferredSpeakerDate,
        dateOption2: this.state.preferredSpeakerDate2,
        sortHash: this.state.sortHash
      };
      try {
        await API.graphql(
          graphqlOperation(createSpeakerEoi, {
            input: speakerEOI
          })
        );
      } catch (err) {
        this.hideStuff = true;
        this.graphQLError = err;
        return;
      }
      this.graphQLInfo = "Your information has been securely stored.";
      this.hideStuff = true;
      const reqbody = {
        body: {
          name: this.state.name + " " + this.state.surname,
          email: this.state.email,
          mobile: this.state.mobile,
          description: this.state.description,
          estimatedLength: this.state.estimatedLength,
          dateOption1: this.state.preferredSpeakerDate,
          dateOption2: this.state.preferredSpeakerDate2
        }
      };
      this.emailing = true;
      this.sendMail(reqbody);
    },
    async sendMail(reqbody) {
      try {
        const result = await API.post("awsugautomailer", "/sendmail", reqbody);
        let res = JSON.stringify(result.result);
        if (res === '"Success"') {
          this.res =
            "You're awesome 💖 Your information has been sent to the internal organisers and they'll be in touch soon :)";
          this.emailing = false;
        }
      } catch (e) {
        this.err = e;
      }
    },
    authUser() {
      Auth.currentAuthenticatedUser()
        .then(user => (this.userName = user.username))
        .catch(err => (this.err = err));
    }
  },
  mounted() {
    this.authUser();
    this.$vuetify.theme.dark = false;
  }
};
</script>
<style lang="scss" scoped>
.vdatetime-input {
  border: 1px solid red;
}
</style>
