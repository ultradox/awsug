<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-alert type="info" v-if="info">
            <p class="title">{{ info }}</p>
          </v-alert>
          <!-- <v-alert type="error" v-if="error">
            <p class="title">{{ error }}</p>
          </v-alert> -->
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
            <div>
              <v-btn
                class="ma-2"
                color="secondary"
                @click="approvePub(true)"
                :disabled="!draft.reqRv"
              >
                <v-icon class="mx-2" color="yellow">mdi-check-decagram</v-icon>
                <span class="mx-2">Approve Publication</span>
              </v-btn>
              <v-btn
                class="ma-2"
                color="error darken-2"
                @click="approvePub(false)"
                :disabled="!draft.reqRv"
              >
                <v-icon class="mx-2" color="yellow">mdi-do-not-disturb</v-icon>
                <span class="mx-2">Decline Publication</span>
              </v-btn>
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
import { getPost } from "../graphql/queries";
import { updateDraft } from "../graphql/mutations";
import { updatePost } from "../graphql/mutations";
import { createPost } from "../graphql/mutations";
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
      post: {},
      addCommentBool: false,
      showCommentsBool: false,
      componentKey: 0,
      loading: true,
      error: [],
      info: "",
      pubDate: "",
      confirmDelete: false,
      confirmPublish: false
    };
  },
  methods: {
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
        if (this.userGroup.includes("admin")) {
          this.getDraft();
        } else {
          this.$router.push("/blog");
        }
      } catch (e) {
        this.error += `======> authUser Error: ${e}`;
      }
    },
    async getDraft() {
      try {
        const result = await API.graphql(
          graphqlOperation(getDraft, { anchor: this.anchor })
        );
        this.draft = result.data.getDraft;
        this.loading = false;
      } catch (e) {
        this.error += `======> getDraft Error: ${e}`;
      }
    },
    async getPost() {
      try {
        const data = await API.graphql({
          query: getPost,
          variables: { anchor: this.anchor },
          authMode: "AWS_IAM"
        });
        this.post = data.data.getPost;
      } catch (error) {
        this.err = error;
      }
    },
    async updateDraft(reviewDate) {
      const input = {
        userName: this.draft.userName,
        anchor: this.draft.anchor,
        author: this.draft.author,
        socLink: this.draft.socLink,
        sortHash: this.draft.sortHash,
        title: this.draft.title,
        summary: this.draft.summary,
        content: this.draft.content,
        reqRv: false,
        reviewed: true,
        pubDate: reviewDate || "Publication Declined 🤖"
      };
      console.log("===================> updateDraft");
      console.log(input);
      try {
        await API.graphql(graphqlOperation(updateDraft, { input }));
        this.draft.reqRv = false;
      } catch (err) {
        this.error += `======> updateDraft Error: ${err}`;
      }
    },

    async createPost(pubDate) {
      const input = {
        userName: this.draft.userName,
        anchor: this.draft.anchor,
        author: this.draft.author,
        socLink: this.draft.socLink,
        sortHash: this.draft.sortHash,
        title: this.draft.title,
        summary: this.draft.summary,
        content: this.draft.content,
        pubDate: pubDate
      };
      console.log("===================> createPost");
      console.log(input);
      try {
        await API.graphql(graphqlOperation(createPost, { input }));
        this.info = "New post published 🚀";
      } catch (err) {
        this.error += `======> insertPost Error: ${err}`;
        console.log(err);
      }
    },

    async updatePost(modDate) {
      // Update the Post
      const input = {
        userName: this.draft.userName,
        anchor: this.draft.anchor,
        author: this.draft.author,
        socLink: this.draft.socLink,
        sortHash: this.draft.sortHash,
        title: this.draft.title,
        summary: this.draft.summary,
        content: this.draft.content,
        pubDate: this.post.pubDate, // pubDate no change once published
        lastModified: modDate
      };
      console.log("===================> updatePost");
      console.log(input);
      try {
        await API.graphql(graphqlOperation(updatePost, { input }));
        this.info = "Existing post updated 🤓";
      } catch (err) {
        this.error += `======> updatePost Error: ${err}`;
      }
    },

    async approvePub(bool) {
      // Insert the new version of the Post
      if (bool === true) {
        let dtStamp = new Date().toJSON();
        this.updateDraft(dtStamp);
        if (this.post) {
          this.updatePost(dtStamp);
        } else {
          this.createPost(dtStamp);
        }
      } else {
        this.updateDraft();
      }
    }
  },
  mounted() {
    this.authUser();
    this.getPost();
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
