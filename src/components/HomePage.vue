<template>
  <v-container>
    <v-card>
      <!-- AWSUG Aotearoa Fern Image - normal and wide view -->
      <v-img
        :src="$vuetify.breakpoint.lgAndUp ? card.srcWide : card.src"
        gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.2)"
        :height="$vuetify.breakpoint.mdAndUp ? '250px' : '150px'"
      >
      </v-img>
      <!-- New Zealand's own user-run, user-focused AWS community. -->
      <v-card-title class="headline white--text">{{ card.title }}</v-card-title>
      <v-card-text class="grey--text text--lighten-2">
        <h1 class="title">
          Have something on your mind? 🤨
        </h1>
        <p class="subtitle-1">
          Publish your next AWS blog, article or poem using our fab website
          💕simply
          <router-link to="signup">sign up</router-link>, add content using
          <a
            href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
            >MarkDown</a
          >, submit for review, and voila! Checkout
          <router-link to="blog/aws-user-group-getting-started-blog"
            >this blog</router-link
          >
          for more details ❣️
        </p>
        <br />
        <h1 class="title">
          Changes with consequences
        </h1>
        <ul>
          <li>
            Due to
            <a
              href="https://docs.amplify.aws/lib/auth/getting-started/q/platform/js"
              >@auth</a
            >
            backend changes our
            <a href="https://aws.amazon.com/cognito/">AWS Cognito</a>
            <a
              href="https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html"
              >user pool</a
            >
            was recreated
          </li>
          <li>
            <a
              href="https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-import-users.html"
              >Migrating users</a
            >
            seemed unfeasible with given time constraints
          </li>
          <li>
            <b>Please accept our apologies.</b> Everyone who signed up in the
            past:
            <router-link to="signup"
              ><span class="red--text"
                >you'll have to sign up again</span
              ></router-link
            >
            to access members-only features.
          </li>
        </ul>
        <br />
        <h2 class="title">And finally...</h2>

        <p>
          The <a href="https://github.com/ultradox/awsug">website repo</a> is
          now in the public domain - PR's welcome :)
        </p>
      </v-card-text>

      <!-- Socialite-Mass Surveilance Icons -->
      <v-card-actions>
        <v-row>
          <v-col cols="12" md="6" offset-md="6" xl="4" offset-xl="8">
            <v-btn
              x-large
              href="https://www.meetup.com/Amazon-Web-Services-Wellington-User-Group/"
              target="_blank"
            >
              <v-avatar size="45">
                <img src="../assets/meetup.png" />
              </v-avatar>
            </v-btn>
            <v-btn
              v-for="heroButton in heroButtons"
              :key="heroButton.link"
              x-large
              outlined
              class="ma-3 secondary"
              :href="heroButton.link"
              target="_blank"
            >
              <v-icon x-large class="ma-2">{{ heroButton.icon }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <!-- <v-row>
      <v-col cols="12">
        <SponsorHighlight />
      </v-col>
    </v-row> -->

    <v-row>
      <v-col cols="12" md="4">
        <About />
      </v-col>
      <v-col cols="12" md="4">
        <PastEvents />
      </v-col>
      <v-col cols="12" md="4">
        <JoinUs />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <ImportantLinks />
      </v-col>
      <!-- <v-col cols="12" md="6" class="d-none d-sm-flex">
        <LeaderBoard />
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import About from "./About";
import PastEvents from "./PastEvents";
import JoinUs from "./JoinUs";
import ImportantLinks from "./ImportantLinks";
// import SponsorHighlight from "./SponsorHighlight";
// import LeaderBoard from "./LeaderBoard";

export default {
  components: {
    About,
    PastEvents,
    JoinUs,
    ImportantLinks
    // SponsorHighlight
  },
  data: () => ({
    heroButtons: [
      // {
      //   icon: "mdi-meetup",
      //   link:
      //     "https://www.meetup.com/Amazon-Web-Services-Wellington-User-Group/"
      // },
      {
        icon: "mdi-slack",
        link: "https://slack-inviter-awsugnz.herokuapp.com/"
      },
      {
        icon: "mdi-facebook",
        link: "https://www.facebook.com/awsugnz"
      },
      {
        icon: "mdi-linkedin",
        link: "https://www.linkedin.com/groups/13751121/"
      }
    ],
    card: {
      title: "New Zealand's own user-run, user-focused AWS community.",
      src:
        "https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/logo-onblack-wide.png",
      srcWide:
        "https://awsug-image-bank.s3-ap-southeast-2.amazonaws.com/logo-onblack-xwide.png",
      flex: 12
    }
  })
};
</script>

<style lang="scss" scoped>
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>
