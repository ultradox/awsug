<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row align="end" justify="space-between">
            <h1>
              Weclome <span class="primary--text">{{ userName }} ❣️</span>
            </h1>
            <h2 class="substitle">
              This is your blog personal blog portal, where you can create, edit
              and publish blogs.
            </h2>
            <span class="mx-4">
              <div v-if="userName">
                <v-btn color="info" to="/new-blog">
                  <v-icon class="mx-2" color="yellow">mdi-pen-plus</v-icon>
                  <span class="mr-2">Write a Blog</span>
                </v-btn>
              </div>
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
      <div v-if="blogs.length === 0">
        <br />
        <v-alert type="warning">
          Darn, I haven't written any blogs for this cool website yet...
        </v-alert>
      </div>

      <div v-for="blog in blogs" v-bind:key="blog.anchor">
        <v-row v-if="blog.userName === userName">
          <BlogCard :blog="blog" />
        </v-row>
      </div>

      <div v-if="err">
        <v-alert type="warning">
          <v-icon>mdi-error</v-icon>
          {{ err }}
        </v-alert>
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
import BlogCard from "../components/BlogCard";
import API, { graphqlOperation } from "@aws-amplify/api";
import { draftByCreatedAt } from "../graphql/queries";
import { Auth } from "aws-amplify";
export default {
  name: "BlogPortal",
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
    async authUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        this.user = user;
        this.userName = user.username;
        this.getBlogs();
      } catch (e) {
        this.errGetUser = e;
      }
      if (this.userName) {
        return true;
      } else {
        this.$router.push("/blog");
      }
    },
    async getBlogs() {
      try {
        const result = await API.graphql(
          graphqlOperation(draftByCreatedAt, {
            sortHash: "Sorted",
            sortDirection: "DESC"
          })
        );
        this.blogs = result.data.draftByCreatedAt.items;
        this.loading = false;
      } catch (e) {
        this.err = e;
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
