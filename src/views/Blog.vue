<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row align="end" justify="space-between" v-if="userName">
            <h1>
              Weclome <span class="primary--text">{{ userName }} ❣️</span>
            </h1>
            <span class="mx-4">
              <router-link to="/blog-admin">
                <v-btn color="primary">
                  <v-icon class="mx-2" color="yellow"
                    >mdi-book-open-page-variant</v-icon
                  >
                  <span class="mr-2">My blogs</span>
                </v-btn>
              </router-link>
            </span>
          </v-row>
        </v-col>
      </v-row>

      <div v-if="loading">
        <v-sheet class="px-3 pt-3 pb-3">
          <v-skeleton-loader
            class="mx-auto"
            max-width="1200"
            type="card"
          ></v-skeleton-loader>
        </v-sheet>
      </div>

      <div v-for="blog in blogs" v-bind:key="blog.anchor">
        <v-row>
          <BlogCard :blog="blog" />
        </v-row>
      </div>
    </v-container>
    <v-img
      :src="require('../assets/logo-onwhite.png')"
      class="my-3"
      contain
      height="200"
    ></v-img>
  </div>
</template>

<script>
import API from "@aws-amplify/api";
import BlogCard from "../components/BlogCard";
import { postByPubDate } from "../graphql/queries";
import { Auth } from "aws-amplify";
// import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
// import awsConfig from "./aws-exports";

// Amplify.configure(awsConfig);

// Client 1 uses API_KEY as auth type
// const apiKeyClient = new AWSAppSyncClient({
//   url: awsConfig.aws_appsync_graphqlEndpoint,
//   region: awsConfig.aws_appsync_region,
//   auth: { type: AUTH_TYPE.API_KEY, apiKey: awsConfig.aws_appsync_apiKey },
//   disableOffline: true
// });

export default {
  name: "Blogs",
  components: {
    BlogCard
  },
  data: () => ({
    fab: true,
    blogs: [],
    loading: true,
    err: "",
    userName: "",
    alignment: "center",
    dense: false,
    justify: "center"
  }),
  methods: {
    authUser() {
      Auth.currentAuthenticatedUser()
        .then(user => (this.userName = user.username))
        .catch(err => (this.err = err));
    },
    async getBlogs() {
      try {
        const data = await API.graphql({
          query: postByPubDate,
          variables: {
            sortHash: "Sorted",
            sortDirection: "DESC"
          },
          authMode: "AWS_IAM"
        });
        this.blogs = data.data.postByPubDate.items;
        this.loading = false;
      } catch (error) {
        this.err = error;
      }
    }
  },
  mounted() {
    this.authUser();
    this.getBlogs();
    this.$vuetify.theme.dark = false;
  }
};
</script>
<style lang="scss" scoped>
pre {
  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
.hoverPill:hover {
  cursor: pointer;
}
</style>
