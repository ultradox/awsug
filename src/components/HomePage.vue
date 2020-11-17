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

      <v-card-title class="headline white--text justify-center">{{ card.title }}</v-card-title>
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
    <v-row justify="center">
      <v-col cols="10" md="8">
        <v-card class="pa-2" outlined tile>
          <v-card-text class="grey--text text--lighten-2">
            <h1>
              AWS User Group Summit on 27 November
            </h1>
            <hr><br>
            <h2>
              Hear from AWS Heroes and leading community members
            </h2>
            <p>
              Date & time: Tuesday, November 3, 2020<br>
              12PM - 3:30PM<br>
              RSVP: <a href="https://lnkd.in/g56FUHA">https://lnkd.in/g56FUHA</a>
            </p>
            <p>
              
            </p>
            <p>
              You’re invited to the first exclusive AWS Australia & New Zealand User Group Summit on 27 November !
            </p>
            <p>
Hear from AWS Heroes and leading community leaders for a jam packed day of exciting breakout sessions, giveaways, recognition awards, announcements around AWS User Group benefits, support programs and much more! 
            </p>
            <p>            
              This inaugural summit is by the community, for the community and will feature growth tips, share success stories and offer technical insights to help you continue to connect with your peers and empower you to innovate.
            <v-img
                src="https://d25nsddk6i6506.cloudfront.net/events/aws-summit.png"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.2)"
                height="250px"
              >
              </v-img>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
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
    ImportantLinks,
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
        link: "https://slack-inviter-awsugnz.herokuapp.com/",
      },
      {
        icon: "mdi-facebook",
        link: "https://www.facebook.com/awsugnz",
      },
      {
        icon: "mdi-linkedin",
        link: "https://www.linkedin.com/groups/13751121/",
      },
    ],
    card: {
      title: "New Zealand's own user-run, user-focused AWS community.",
      src: "https://d25nsddk6i6506.cloudfront.net/logo-onblack-wide.png",
      srcWide: "https://d25nsddk6i6506.cloudfront.net/logo-onblack-xwide.png",
      flex: 12,
    },
  }),
};
</script>

<style lang="scss" scoped>
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>
