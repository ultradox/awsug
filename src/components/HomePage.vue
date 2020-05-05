<template>
  <v-container fluid>
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
      <v-card-text>
        <h1 class="title grey--text text--lighten-2">
          Have something on your mind? 🤨
        </h1>
        <p class="subtitle-1 grey--text text--lighten-2">
          Publish your next AWS blog, article or poem using on our fab website.
          <router-link to="signup">Sign up</router-link>, add content using
          MarkDown, submit for review, and voila! Checkout
          <router-link to="blog/getting-started-blog">this blog</router-link>
          for more details ❣️
        </p>
        <br />
        <h1 class="title grey--text text--lighten-2">
          Also, there have been major website changes... but there's a small
          problem 😳
        </h1>
        <ul>
          <li>
            The website repo is now in the public domain - PR's welcome :)
          </li>
          <li>
            Due to some significant backend changes and code refactoring, we had
            to recreate the Cognito user pool!
          </li>
          <li>
            Apologies to everyone who signed up already - you'll have to sign up
            again to get the most out of the site
          </li>
        </ul>
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
