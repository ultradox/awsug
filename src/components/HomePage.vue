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
              March 2021 Event 💛🧡
            </h1>
            <p>
              Date & time: Tuesday, March 2, 2021<br>
              4:30 PM to 6:30 PM GMT+13<br>
              BNZ, 96 The Terrace<br>
              RSVP: <a href="https://www.meetup.com/Amazon-Web-Services-Wellington-User-Group/events/276435488/">Meetup.com</a>
            </p>
            <h1>
              Amazon QuickSight (Beginner Level)
            </h1>
             <h2>
              by Gopinath Gandu Sekar, database professional at Contact Energy
            </h2>
            <hr><br>
            <p>
              Gopi has over 14 years of IT experience in Database Architecture, administration, performance and security.
            </p>
            <p>
              Gopi will give a beginner friendly teaching about QuickSight.
            </p>
            <p>
              Amazon QuickSight is a scalable, serverless, embeddable, machine learning-powered business intelligence (BI) service built for the cloud. QuickSight lets you easily create and publish interactive BI dashboards that include Machine Learning-powered insights. QuickSight dashboards can be accessed from any device, and seamlessly embedded into your applications, portals, and websites.
            </p>  
            <p>
              <v-img
                src="https://d25nsddk6i6506.cloudfront.net/events/quicksight.jpg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.2)"
                height="250px"
              >
              </v-img>
            </p>          
            <br><br>
            <h1>Associate Level AWS Certification (Beginner to Intermediate Level)</h1>
            <h2>
              by Sebastian Kruger, Partner at Deloitte Digital New Zealand
            </h2>
            <hr><br>
            <p>
              As an AWS practitioner since 2014, Sebastian is always a hands-on-tools technology leader who doesn't hesitate to roll up the sleeves and write some code. AWS certified since 2014, continuously.
            </p>
            <p>
              Are you interested in getting one, two or three of the AWS Associate Certifications? The come along and Sebastian will talk through these certifications including study options, essential learning and more to help you on your AWS Certification journey.
            </p>
            <p>
              <v-img
                src="https://d25nsddk6i6506.cloudfront.net/events/study.jpg"
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
      }
    ],
    card: {
      title: "New Zealand's own user-run, user-focused AWS community, Wellington Chapter.",
      src: "https://d25nsddk6i6506.cloudfront.net/logo-onblack-wide.png",
      srcWide: "https://d25nsddk6i6506.cloudfront.net/logo-onblack-xwide.png",
      flex: 12,
    }
  }),
};
</script>

<style lang="scss" scoped>
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>
