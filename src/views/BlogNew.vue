<template>
  <div>
    <v-container>
      <v-card>
        <v-card-text>
          <v-snackbar
            v-model="snackbar"
            :timeout="5000"
            :top="true"
            :right="true"
            color="info"
          >
            <p class="title">{{ info }}</p>
          </v-snackbar>
          <transition name="fade">
            <div v-if="!form.agreePolicy">
              <h1 class="display-1 font-weight-bold mb-3">
                Thanks for submitting content,
                <span class="primary--text">{{ userName }}</span> ❣️
              </h1>
              <h2 class="subtitle-1">
                Note that all fields are required. You can save your blog and
                come back at any time. Once you submit your blog for publication
                the internal organisers will be notified and review your blog.
                Once approved we'll publish, and once published, any subsequent
                changes to your blog will go through another review.
              </h2>
            </div>
          </transition>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            :disabled="disableForm"
          >
            <v-checkbox
              v-model="form.agreePolicy"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="By submitting this blog for publication on the site,
                            I confirm that the content of my blog adheres to community standards, including:"
              required
              v-if="!distractionFree"
            ></v-checkbox>
            <transition name="fade">
              <ul v-if="!form.agreePolicy">
                <li>
                  The work is my own, and I give accreditation and references
                  where they are due.
                </li>
                <li>
                  My blog does no attack or harass any individual or
                  organisation, or reveal any confidential information.
                </li>
                <li>
                  My blog is free from all forms of profanity or indecency.
                </li>
                <li>
                  The site administrators reserve the right to remove my blog
                  without notice.
                </li>
                <li>
                  I ackonwledge that publication of my blog is at the sole
                  discretion of the internal organisers of the AWS User Group
                  organisers.
                </li>
                <li>
                  I agree to share a link to a social media identity (LinkedIn,
                  Facebook, Twitter, etc.), and that this will be published with
                  my blog
                </li>
              </ul>
            </transition>

            <h1 class="headlne"></h1>

            <!-- 1) Blog Title -->
            <v-text-field
              v-model="form.title"
              :rules="titleRules"
              label="Blog Title"
              :disabled="!form.agreePolicy"
              v-if="!distractionFree"
              required
            ></v-text-field>
            <!-- 1) Blog Author -->
            <v-text-field
              v-model="form.author"
              :rules="authorRules"
              label="Author name"
              :disabled="!form.agreePolicy"
              v-if="!distractionFree"
              required
            ></v-text-field>
            <!-- 1) Social Media link -->
            <v-text-field
              v-model="form.socLink"
              :rules="socialMediaRules"
              label="Link to e.g. Facebook, LinkedIn, Twitter, etc."
              :disabled="!form.agreePolicy"
              v-if="!distractionFree"
              required
            ></v-text-field>

            <!-- 3) Blog Summary -->
            <v-textarea
              name="blog-summary"
              label="Blog summary"
              rows="8"
              v-model="form.summary"
              :counter="1000"
              :rules="summaryRules"
              hint="A brief summary of what your blog's about; we recommend you include a include a single, landscape image. No more than one image allowed in the blog summary."
              :disabled="!form.agreePolicy"
              v-if="!distractionFree"
              required
            ></v-textarea>
            <!-- 4) Blog Content -->
            <v-checkbox
              v-model="distractionFree"
              label="Distraction free mode"
              :disabled="!form.agreePolicy"
            ></v-checkbox>
            <v-textarea
              name="blog-content"
              label="Content"
              :rows="modeRows"
              v-model="form.content"
              :counter="0"
              :rules="contentRules"
              :disabled="!form.agreePolicy"
              hint="What's on your mind today?"
            ></v-textarea>
          </v-form>
          <v-alert v-if="err" prominent type="error">
            {{ err }}
          </v-alert>
          <v-alert v-if="info" prominent type="success">
            {{ info }}
          </v-alert>
          <v-card-actions v-if="!distractionFree">
            <v-btn
              v-if="!hideStuff"
              :disabled="!checkValidFinal"
              color="secondary"
              class="px-4"
              @click="submit()"
            >
              Save <v-icon right dark>mdi-check-outline</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <span>
              <router-link to="/blog-admin">
                <v-btn color="primary">
                  <v-icon class="mx-2" color="yellow"
                    >mdi-book-open-page-variant</v-icon
                  >
                  <span class="mr-2">My blogs</span>
                </v-btn>
              </router-link>
            </span>
          </v-card-actions>
          <v-card-text v-if="!distractionFree">
            Use
            <a
              href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
              >Markdown</a
            >
            to format your comment, create links, add images, etc.
          </v-card-text>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import API, { graphqlOperation } from "@aws-amplify/api";
import { getDraft } from "../graphql/queries";
import { createDraft } from "../graphql/mutations";
import { Auth } from "aws-amplify";

export default {
  name: "CreateBlog",
  data: () => ({
    distractionFree: false,
    user: "",
    userName: "",
    hideStuff: "",
    valid: false,
    snackbar: false,
    info: "",
    err: "",
    anchorTaken: false,
    form: {
      agreePolicy: false,
      anchor: "",
      author: "",
      socLink: "",
      title: "",
      summary: "",
      content: ""
    },
    disableForm: false,
    summaryRules: [
      v => !!v || "Blog summary is required",
      v =>
        (v && v.length <= 1000) ||
        "Blog summary must be less than 1000 characters",
      v =>
        (v && v.length > 150) || "Blog summary must be at least 150 characters"
    ],
    bodyRules: [v => !!v || "Content can't be blank"],
    titleRules: [v => !!v || "Proposed operation is required"],
    authorRules: [v => !!v || "Author is required"],
    contentRules: [
      v => !!v || "Blog content is required",
      v =>
        (v && v.length > 1000) ||
        "Your blog post should be no less than 1000 characters"
    ],
    socialMediaRules: [v => !!v || "Link to social media is required"],
    select: null
  }),
  computed: {
    checkValid: function() {
      return (
        !!this.valid &&
        !!this.userName &&
        !!this.form.socLink &&
        !!this.form.title &&
        !!this.form.summary &&
        !!this.form.content
      );
    },
    checkValidFinal: function() {
      return !!this.checkValid && !!this.valid;
    },
    modeRows: function() {
      return this.distractionFree ? 20 : 8;
    }
  },
  methods: {
    async authUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        this.user = user;
        this.userName = user.username;
      } catch (e) {
        this.errGetUser = e;
      }
      if (this.userName) {
        return true;
      } else {
        this.$router.push("/blog");
      }
    },
    createAnchor(title) {
      title = title.replace(/\s+/g, "-").toLowerCase(); // replace all spaces with a hyphen
      title = title.replace(/[^a-zA-Z0-9/-]/g, "");
      this.form.anchor = title;
    },
    async getDraft(anchor) {
      try {
        const result = await API.graphql(
          graphqlOperation(getDraft, { anchor: anchor })
        );
        if (result.data.getDraft) {
          this.anchorTaken = true;
        } else {
          this.anchorTaken = false;
        }
      } catch (e) {
        this.err = `Get Blog Error: ${e}`;
        this.anchorTaken = true;
      }
    },
    async submit() {
      this.createAnchor(this.form.title);
      await this.getDraft(this.form.anchor);
      if (this.anchorTaken == false) {
        const input = {
          userName: this.userName,
          anchor: this.form.anchor,
          author: this.form.author,
          socLink: this.form.socLink,
          sortHash: "Sorted",
          title: this.form.title,
          summary: this.form.summary,
          content: this.form.content,
          reqRv: false,
          reviewed: false
        };
        try {
          await API.graphql(graphqlOperation(createDraft, { input }));
          this.info = "Your content has been saved 🌼";
          this.snackbar = true;
          this.$router.push("/blog-admin");
        } catch (err) {
          this.err = `👾 ${err.errors[0].message}`;
        }
      } else {
        this.err = "Sorry, the title you have chosen has already been reserved";
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  },
  mounted() {
    this.authUser();
    this.$vuetify.theme.dark = false;
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
