<template>
  <div>
    <br />
    <router-link
      :to="{
        name: 'viewBlog',
        params: {
          anchor: blog.anchor,
          authAuthor: blog.userName
        }
      }"
    >
      <v-card max-width="1200">
        <v-card-title>
          <div class="display-2">{{ blog.title }}</div>
        </v-card-title>
        <v-card-subtitle>
          <div class="body-2 accent--text ">
            <p>
              Written by <a :href="blog.socLink">{{ blog.author }}</a
              ><br />
              <span v-if="blog.pubDate"
                >Published on {{ customFormatter(blog.pubDate) }}</span
              >
              <span v-if="blog.lastModified">
                <br />
                Last updated {{ customFormatter(blog.lastModified) }}
              </span>
            </p>
          </div>
        </v-card-subtitle>
        <v-card-text>
          <markdown-it-vue :class="md_text" :content="blog.summary" />
        </v-card-text>
        <v-card-actions>
          <v-alert width="100%" color="grey" class="text-center headline">
            Read More
          </v-alert>
        </v-card-actions>
      </v-card>
    </router-link>
  </div>
</template>

<script>
import MarkdownItVue from "markdown-it-vue";
import "markdown-it-vue/dist/markdown-it-vue.css";
import moment from "moment";
export default {
  components: {
    MarkdownItVue
  },
  props: {
    blog: Object,
    review: Boolean
  },
  methods: {
    customFormatter(date) {
      return moment(date).format("dddd DD MMM YYYY, h:mm a");
    }
  },
  computed: {
    currentTheme() {
      return this.$vuetify.theme.dark;
    },
    md_text() {
      return this.currentTheme ? "white--text" : "black--text";
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
pre {
  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>
