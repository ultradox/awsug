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

      <v-card-title class="headline white--text">{{ card.title }}</v-card-title>
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
              AWS Security Workshop - You'll Need Own Laptop & AWS Account
            </h1>
            <br>
            <h3>
              AWS Security workshop this October in Wellington at BNZ on The Terrace 🔐👍
            </h3>
            <p>
              Level: Beginner to Intermediate.
            </p>
            <hr><br>
            <p>
              Hello fellow AWS Users! We'd like to remind you that on Tuesday, October 6th is our Monthly meetup!
            </p>
            <p>
              This month we will have a <a href="https://awssecworkshops.com/">security hands-on workshop about Access Delegation</a> (Level 200). We will learn how to use Amazon IAM to delegate access to services and promote the Principle of Least Privilege - giving users the minimum level of privilege they need to do their tasks.
            </p>
            <p>
              We will:
            </p>
            <ul>
              <li>Build the environment using AWS CloudFormation</li>
              <li>Perform further customization on the environments to restrict the capabilities</li>
              <li>Test your customizations</li>
            </ul>
            <br>
            <p>
              What you'll need:
            </p>
            <ul>
              <li>Your own AWS Account.</li>
              <li>Your own laptop and charger</li>
            </ul>
            <br>
            <p>
              <a href="https://www.meetup.com/Amazon-Web-Services-Wellington-User-Group/events/273291388/">Book now</a> on Meetup.com
            </p>
              <v-img
                src="https://d25nsddk6i6506.cloudfront.net/events/security.jpg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.2)"
                height="250px"
              >
              </v-img>
            <p>
              Pizza / Drinks to follow at 5:30 pm. If Wellington is still at Covid-19 Level 2, then we'll be limiting general attendees to 90 (to allow 10 facilitators).
            </p>
            <p>
              Date & time: 4:30pm - 5:30pm, Tuesday 6 Oct 2020 
            </p>
            <p>
              Location: BNZ, 96 The Terrace, Wellington
            </p>
            <p>
              Our sincere thanks to BNZ for sponsoring the Venue!
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10" md="8">
        <v-card class="pa-2" outlined tile>
          <v-card-text class="grey--text text--lighten-2">
            <h1>
              Christchurch User Group Notice
            </h1>
            <hr><br>
            <h2>
              AWS Meet Up: Deep Racer Lunch & Learn 🏎
            </h2>
            <p>
              The Christchurch team at Consegna are hosting a free AWS DeepRacer
              Lunch & Learn for all those that are interested in getting their
              foot in the door with DeepRacer specifically, or are just
              interested in knowing more about the Machine Learning behind it.
              <v-img
                src="https://d25nsddk6i6506.cloudfront.net/events/deep-learner.jpeg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.2)"
                height="250px"
              >
              </v-img>
            </p>
            <p>
              This introductory session is meant to bring those that are keen,
              up to speed with DeepRacer modelling and how to get started. All
              are welcome to come along, and there will be lunch & light
              refreshments provided.
            </p>
            <p>
              Date & time: 12:00pm - 1:30pm, Friday 14th Oct 2020
            </p>
            <p>
              Location: The George Hotel, 50 Park Terrace, Christchurch Central
            </p>
            <br />
            <p>
              If this sounds like you, please
              <a href="https://bit.ly/2R6VAs9">register today</a>
              as space is limited.
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
