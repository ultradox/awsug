<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-alert type="info" v-if="info">
            <p class="title">{{ info }}</p>
          </v-alert>
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
            <div v-if="userName && !review">
              <v-btn class="ma-2" color="primary" to="/blog-admin">
                <v-icon class="mx-2" color="yellow"
                  >mdi-book-open-page-variant</v-icon
                >
                <span class="mx-2">My blogs</span>
              </v-btn>
              <v-btn
                class="ma-2"
                color="primary"
                :to="{ name: 'authorEditBlog', params: { blog: draft } }"
                :disabled="draft.reqRv"
              >
                <v-icon class="mx-2" color="yellow"
                  >mdi-circle-edit-outline</v-icon
                >
                <span class="mx-2">Edit blog</span>
              </v-btn>
              <v-btn
                class="ma-2"
                color="secondary"
                @click="confirmPublishAlert"
                :disabled="draft.reqRv"
              >
                <v-icon class="mx-2" color="yellow"
                  >mdi-book-plus-multiple-outline</v-icon
                >
                <span class="mx-2">Publish</span>
              </v-btn>
              <v-btn
                class="ma-2"
                color="error darken-2"
                @click="confirmDeleteAlert"
              >
                <v-icon class="mx-2">mdi-delete-circle-outline</v-icon>
                <span class="mx-2">Delete Blog</span>
              </v-btn>
              <div v-if="confirmDelete">
                <br />
                <v-alert prominent type="warning" color="secondary">
                  <v-row align="center">
                    <v-col class="grow"
                      >You are about to permanently delete your blog, please
                      confirm.</v-col
                    >
                    <v-col class="shrink">
                      <v-btn class="ml-4 error" @click="deleteBlog" width="150"
                        >Delete it</v-btn
                      >
                      <br />
                      <br />
                      <v-btn
                        class="ml-4 info"
                        @click="confirmDeleteAlert"
                        width="150"
                        >Don't delete</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-alert>
              </div>
              <div v-if="confirmPublish">
                <br />
                <v-alert prominent type="warning" color="secondary">
                  <v-row align="center">
                    <v-col class="grow"
                      >Once you submit your blog for publication you can no
                      longer edit it until it has been reviewed.</v-col
                    >
                    <v-col class="shrink">
                      <v-btn
                        class="ml-4 error"
                        @click="requestReview"
                        width="150"
                        >Submit</v-btn
                      >
                      <br />
                      <br />
                      <v-btn
                        class="ml-4 info"
                        @click="confirmPublishAlert"
                        width="150"
                        >Cancel</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-alert>
              </div>
            </div>
            <br />
            <v-card>
              <v-card-title>
                <div class="display-2">{{ draft.title }}</div>
              </v-card-title>
              <v-card-subtitle>
                <div class="body-2 accent--text ">
                  <p>
                    Written by {{ draft.author }}<br />
                    Created on {{ customFormatter(draft.createdAt) }}<br />
                    <span v-if="draft.pubDate"
                      ><b class="primary--text"
                        >Published on {{ customFormatter(draft.pubDate) }}</b
                      ></span
                    >
                    <span v-else-if="draft.reqRv">
                      <b class="primary--text">Under review for publication</b>
                    </span>
                    <span v-else><b class="primary--text">In draft</b></span>
                  </p>
                </div>
              </v-card-subtitle>
              <v-card-text>
                <markdown-it-vue :content="draft.content" />
              </v-card-text>
            </v-card>
          </div> </v-col
      ></v-row>
      <pre v-if="error.length > 0">{{ error }}</pre>
    </v-container>
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import API, { graphqlOperation } from "@aws-amplify/api";
import { getDraft } from "../graphql/queries";
import { updateDraft } from "../graphql/mutations";
import { deleteDraft } from "../graphql/mutations";
import { Auth } from "aws-amplify";
import moment from "moment";

import MarkdownItVue from "markdown-it-vue";
import "markdown-it-vue/dist/markdown-it-vue.css";

export default {
  props: {
    anchor: String,
    authAuthor: String,
    review: Boolean
  },
  components: {
    MarkdownItVue
  },
  data() {
    return {
      user: {},
      userName: "",
      userGroup: [],
      draft: {},
      addCommentBool: false,
      showCommentsBool: false,
      componentKey: 0,
      loading: true,
      error: [],
      info: "",
      confirmDelete: false,
      confirmPublish: false
    };
  },
  methods: {
    confirmDeleteAlert() {
      this.confirmDelete = !this.confirmDelete;
    },
    confirmPublishAlert() {
      this.confirmPublish = !this.confirmPublish;
    },
    customFormatter(date) {
      return moment(date).format("dddd DD MMM YYYY, h:mm a");
    },
    async authUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        this.userGroup =
          user.signInUserSession.accessToken.payload["cognito:groups"] || "";
        this.user = user;
        this.userName = user.username;
        if (this.userName === this.authAuthor) {
          this.getBlog();
        } else {
          this.$router.push("/blog");
        }
      } catch (e) {
        this.errGetUser = e;
      }
    },
    async getBlog() {
      try {
        const result = await API.graphql(
          graphqlOperation(getDraft, { anchor: this.anchor })
        );
        this.draft = result.data.getDraft;
        this.loading = false;
      } catch (e) {
        this.err = e;
      }
    },
    async deleteBlog() {
      try {
        const input = { anchor: this.anchor };
        await API.graphql(graphqlOperation(deleteDraft, { input: input }));
        this.$router.push("/blog-admin");
      } catch (e) {
        this.err = e;
      }
    },
    async requestReview() {
      const input = {
        userName: this.draft.userName,
        anchor: this.draft.anchor,
        author: this.draft.author,
        socLink: this.draft.socLink,
        sortHash: "Sorted",
        title: this.draft.title,
        summary: this.draft.summary,
        content: this.draft.content,
        reqRv: true,
        reviewed: false
      };
      try {
        await API.graphql(graphqlOperation(updateDraft, { input }));
        this.info =
          "Awesome 💕 Your blog was submitted for review. You can edit it again once it's been reviewed.";
        this.draft.reqRv = true;
        this.confirmPublish = false;
      } catch (err) {
        this.err = `👾 ${err.errors[0].message}`;
      }
    }
  },
  mounted() {
    this.authUser();
    this.$vuetify.theme.dark = false;
  }
};
</script>

<style lang="scss" scoped>
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>
