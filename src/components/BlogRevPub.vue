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
    <div v-if="blogs.length === 0">
      <br />
      <v-alert type="warning">
        Sadly there are no blogs ready to be reviewed and published 😢
      </v-alert>
    </div>

    <div v-for="blog in blogs" v-bind:key="blog.anchor">
      <v-row>
        <BlogCard :blog="blog" :review="true" />
      </v-row>
    </div>

    <div v-if="err">
      <v-alert type="warning">
        <v-icon>mdi-error</v-icon>
        {{ err }}
      </v-alert>
    </div>
  </div>
</template>

<script>
import API, { graphqlOperation } from "@aws-amplify/api";
import { listDrafts } from "../graphql/queries";
import BlogCard from "./BlogCard";

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
    async getBlogs() {
      try {
        const result = await API.graphql(
          graphqlOperation(
            listDrafts,
            {
              filter: {
                reqRv: {
                  eq: true
                }
              }
            },
            {
              sortHash: "Sorted",
              sortDirection: "DESC"
            }
          )
        );
        this.blogs = result.data.listDrafts.items;
        this.loading = false;
      } catch (e) {
        this.err = e;
      }
    }
  },
  mounted() {
    this.getBlogs();
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
