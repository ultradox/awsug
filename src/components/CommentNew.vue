<template>
  <div>
    <v-card>
      <v-card-title>
        <v-img
          class="white--text align-end"
          height="250px"
          src="https://s3-ap-southeast-2.amazonaws.com/sunriseministries.life.imagebank/web/newdawn/peace.jpg"
          ><v-card-title class="headline">2 Timothy 2:23-26</v-card-title>
        </v-img>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-snackbar
            v-model="snackbar"
            :timeout="5000"
            :top="true"
            :right="true"
            color="info"
          >
            <p class="title">{{ info }}</p>
          </v-snackbar>

          Hi <span class="error--text">{{ userName }} </span>, please enter your
          comment below and hit the <v-icon>mdi-check-outline</v-icon> icon to
          save it.
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <u class="primary--text">Take note of the comments policy</u>
              </div>
            </template>
            <span>
              <ul>
                <li>Your username will be shown with your comments</li>
                <li>
                  Respect others and their viewpoints.
                </li>
                <li>
                  Comments containing profanity are not allowed.
                </li>
                <li>
                  Comments that attack or harass anyone are not allowed.
                </li>
                <li>
                  The site administrator reserves the right to remove comments
                  that do not comply with these guidelines.
                </li>
              </ul>
            </span>
          </v-tooltip>

          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            disabled="disableForm"
          >
            <br />
            <v-textarea
              v-model="form.content"
              auto-grow
              rows="1"
              :counter="2500"
              :rules="bodyRules"
              label="Add your Comment"
            >
            </v-textarea>
          </v-form>
          <v-card-actions>
            <v-btn
              :disabled="!checkValid"
              color="success darken-2"
              small
              fab
              right
              class="mx-2"
              @click="submit(form)"
            >
              <v-icon>mdi-check-outline</v-icon></v-btn
            >
            <v-btn
              small
              fab
              color="error darken-2"
              class="mx-4"
              @click="reset()"
            >
              <v-icon>mdi-undo-variant</v-icon></v-btn
            >
          </v-card-actions>
          <v-card-text>
            You can use
            <a
              href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
              >Markdown</a
            >
            to format your comment, create links, add images, etc.
          </v-card-text>
          <br />

          <v-alert v-if="err" prominent type="error">
            {{ err }}
          </v-alert>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import API, { graphqlOperation } from "@aws-amplify/api";
import { createComment } from "../graphql/mutations";

export default {
  name: "CreateComment",
  props: {
    anchor: String,
    userName: String,
    userId: String
  },
  data: () => ({
    valid: false,
    snackbar: false,
    info: "",
    err: "",
    form: {
      content: ""
    },
    disableForm: false,
    bodyRules: [
      v => !!v || "Comment can't be blank",
      v =>
        (v && v.length <= 2500) ||
        "Your comment must be less than 2500 characters"
    ],
    select: null,
    checkbox: false
  }),
  computed: {
    checkValid: function() {
      return (
        !!this.form.content && !!this.valid && !!this.userId && !!this.userName
      );
    }
  },
  methods: {
    async submit() {
      const input = {
        postAnchor: this.anchor,
        userId: this.userId,
        userName: this.userName,
        content: this.form.content
      };
      // console.log(input);
      try {
        await API.graphql(graphqlOperation(createComment, { input }));
        this.info = "Comment added 🌼";
      } catch (err) {
        this.err = `😬 ${err.errors[0].message}`;
        this.info = err.errors[0].message;
      }
      //   this.info = "Your information has been saved";
      this.reset();
      this.$emit("refresh-comments", "xxx");
      this.snackbar = true;
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style lang="scss" scoped></style>
