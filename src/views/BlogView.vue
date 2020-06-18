<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
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
            <v-card>
              <v-card-title>
                <div class="display-2">{{ blog.title }}</div>
              </v-card-title>
              <v-card-subtitle>
                <div class="body-2 accent--text ">
                  <p>
                    Written by <a :href="blog.socLink">{{ blog.author }}</a
                    ><br />
                    Published on {{ customFormatter(blog.pubDate) }}
                    <span v-if="blog.lastModified">
                      <br />
                      Last updated {{ customFormatter(blog.lastModified) }}
                    </span>
                  </p>
                </div>
              </v-card-subtitle>
              <v-card-text>
                <markdown-it-vue :content="blog.content" />
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-tooltip left>
                  <template v-slot:activator="{ on }">
                    <v-btn fab v-on="on" @click="listComments" class="ma-6">
                      <v-icon color="info"
                        >{{
                          showCommentsBool
                            ? "mdi-chevron-up"
                            : "mdi-chevron-down"
                        }}
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>View Comments</span>
                </v-tooltip>

                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      fab
                      right
                      class="ma-6"
                      color="primary"
                      v-on="on"
                      v-if="userName"
                      @click="addCommentBool = !addCommentBool"
                    >
                      <v-icon color="white"
                        >mdi-comment-text-multiple-outline</v-icon
                      ></v-btn
                    >
                    <span v-else class="info--text"
                      >You can view comments.<br />
                      <router-link to="/signup">Sign Up/In</router-link>
                      to add comments.</span
                    >
                  </template>
                  <span>Add New Comment</span>
                </v-tooltip>
                <v-spacer></v-spacer>
              </v-card-actions>
              <v-row justify="center">
                <v-dialog
                  v-model="addCommentBool"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                  persistent
                >
                  <AddComment
                    v-if="addCommentBool"
                    @refresh-comments="refreshComments"
                    v-bind:anchor="blog.anchor"
                    v-bind:blogTitle="blog.title"
                    v-bind:userName="userName"
                    v-bind:userId="userId"
                  />
                  <v-btn
                    color="secondary darken-1"
                    x-large
                    @click="addCommentBool = false"
                    >Close</v-btn
                  >
                </v-dialog>
              </v-row>
              <v-expand-transition>
                <div v-show="showCommentsBool">
                  <v-divider></v-divider>
                  <ListComments :key="componentKey" v-bind:anchor="anchor" />
                </div>
              </v-expand-transition>
            </v-card>
          </div> </v-col
      ></v-row>
      <div v-if="err">
        <v-alert type="warning">
          <v-icon>mdi-error</v-icon>
          {{ err }}
        </v-alert>
      </div>
    </v-container>
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import API from "@aws-amplify/api";
import { getPost } from "../graphql/queries";
import { Auth } from "aws-amplify";
import moment from "moment";

import MarkdownItVue from "markdown-it-vue";
import ListComments from "../components/CommentsList";
import AddComment from "../components/CommentNew";
import "markdown-it-vue/dist/markdown-it-vue.css";

export default {
  props: {
    anchor: String,
    authAuthor: String,
    review: Boolean
  },
  components: {
    MarkdownItVue,
    ListComments,
    AddComment
  },
  data() {
    return {
      blog: {},
      addCommentBool: false,
      showCommentsBool: false,
      componentKey: 0,
      loading: true,
      err: "",
      info: "",
      userName: "",
      userId: ""
    };
  },
  methods: {
    customFormatter(date) {
      return moment(date).format("dddd DD MMM YYYY, h:mm a");
    },
    async getBlog() {
      try {
        const data = await API.graphql({
          query: getPost,
          variables: { anchor: this.anchor },
          authMode: "AWS_IAM"
        });
        this.blog = data.data.getPost;
        this.loading = false;
      } catch (e) {
        this.err = e.errors[0].message || e;
      }
    },
    listComments() {
      this.showCommentsBool = !this.showCommentsBool;
    },
    refreshComments() {
      this.componentKey += 1;
    },
    authUser() {
      Auth.currentAuthenticatedUser()
        .then(user => {
          this.userName = user.username;
          this.userId = user.attributes.sub;
          this.userGroup =
            user.signInUserSession.accessToken.payload["cognito:groups"];
        })
        .catch(err => (this.err = err));
    }
  },
  mounted() {
    this.$vuetify.theme.dark = false;
    this.getBlog();
    this.authUser();
  }
};
</script>

<style lang="scss" scoped>
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>
