<template>
  <div>
    <div v-if="loading">
      <v-sheet class="px-3 pt-3 pb-3">
        <v-skeleton-loader
          class="mx-auto"
          max-width="1200"
          type="card"
        ></v-skeleton-loader>
      </v-sheet>
    </div>
    <div v-else>
      <div v-if="comments.length >= 1">
        <v-container v-for="comment in comments" v-bind:key="comment.id">
          <v-card class="mx-auto">
            <v-card-text>
              <p class="subtitle-1 blue-grey--text text--lighten-2">
                <b>{{ comment.userName }}</b> wrote on
                {{ customFormatter(comment.createdAt) }}
              </p>
              <p class="body-1">
                <markdown-it-vue :class="md_text" :content="comment.content" />
              </p>
            </v-card-text>
            <v-card-actions>
              <!-- Edit Comment -->
              <!-- <v-btn
                small
                fab
                right
                class="mx-2"
                color="secondary darken-2"
                @click="comment.editCommentBool = !comment.editCommentBool"
                v-if="comment.userId === userId"
              >
                <v-icon color="warning">mdi-square-edit-outline</v-icon></v-btn
              > -->
              <!-- Delete Comment -->
              <!-- <v-btn
                small
                fab
                right
                color="warning darken-1"
                class="mx-2"
                @click="deleteComment(comment.id)"
                v-if="comment.userId === userId"
              >
                <v-icon color="black">mdi-delete-outline</v-icon></v-btn
              > -->
            </v-card-actions>
          </v-card>
        </v-container>
      </div>
      <div v-else>
        <v-alert prominent text type="warning">
          <p class="error--text">
            There are no comments yet - be the first.
          </p>
        </v-alert>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownItVue from "markdown-it-vue";
import moment from "moment";

import API, { graphqlOperation } from "@aws-amplify/api";
import { Auth } from "aws-amplify";
import { commentByCreatedAt } from "../graphql/queries";
import awsmobile from "../aws-exports";

API.configure(awsmobile);

export default {
  props: {
    anchor: String
  },
  components: {
    MarkdownItVue
  },
  data() {
    return {
      comments: [],
      loading: true,
      error: "",
      userId: "",
      userName: ""
    };
  },
  methods: {
    async getComments(anchor) {
      try {
        const result = await API.graphql(
          graphqlOperation(commentByCreatedAt, {
            postAnchor: anchor,
            sortDirection: "ASC"
          })
        );
        this.comments = result.data.commentByCreatedAt.items;
        this.comments.map(comment => {
          comment.editCommentBool = false;
          comment.deleteCommentBool = false;
        });
        this.loading = false;
      } catch (e) {
        this.error = e;
      }
    },
    // deleteComment(id) {
    //   console.log(id);
    // },
    customFormatter(date) {
      return moment(date).format("dddd DD MMM YYYY, h:mm a");
    },
    async getUser() {
      try {
        const user = await Auth.currentUserInfo();
        this.userName = user.username;
        this.userId = user.attributes.sub;
      } catch (err) {
        this.err = `💩💩 ${err.errors[0].message}`;
        this.info = err.errors[0].message;
      }
    }
  },
  computed: {
    currentTheme() {
      return this.$vuetify.theme.dark;
    },
    md_text() {
      return this.currentTheme ? "white--text" : "black--text";
    }
  },
  created() {
    this.getComments(this.anchor);
    this.getUser();
  }
};
</script>

<style lang="scss" scoped></style>
