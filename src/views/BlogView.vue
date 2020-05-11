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
      blog: {},
      addCommentBool: false,
      showCommentsBool: false,
      componentKey: 0,
      loading: true,
      err: "",
      info: ""
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
    }
  },
  mounted() {
    this.$vuetify.theme.dark = false;
    this.getBlog();
  }
};
</script>

<style lang="scss" scoped>
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>
