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

      <v-card-title class="headline white--text justify-center">{{
        card.title
      }}</v-card-title>
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
                <img src="../assets/meetup.png" alt="meetup" />
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
              August 2021 Event 💛🧡
            </h1>
            <p>
              Date & time: Tuesday, August 3, 2021<br />
              4:30 PM to 6:30 PM GMT+13<br />
              BNZ, 96 The Terrace<br />
              RSVP:
              <a
                href="https://www.meetup.com/Amazon-Web-Services-Wellington-User-Group/events/279282938/"
                >Meetup.com</a
              >
            </p>
            <h1>
              Application Containerization with ECS and Fargate
            </h1>
            <h3>
              by Lilupa Karu, Tech Lead at Fronde
            </h3>
            <hr />
            <br />
            <p>
              Learn how to use EC2 and Fargate to take your applications and
              containerize them. This will include a demo.
            </p>
            <p>
              <v-img
                src="https://d25nsddk6i6506.cloudfront.net/events/deep-learner.jpeg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.2)"
                height="350px"
              >
              </v-img>
            </p>
            <br /><br />
            <h1>Career Progression and Opportunities</h1>
            <h3>
              by Michael Crichton, Senior Business Manager and Ellie Garfield,
              Senior Client Engagement Consultant at Hays
            </h3>
            <hr />
            <br />
            <p>
              Michael is an experienced sales and marketing professional with
              over 10-years of recruitment experience, recruiting at entry and
              executive levels in Europe, Japan, and New Zealand.
            </p>
            <p>
              Ellie specialises in IT Infrastructure and Support recruitment
              across Wellington with a focus on permanent employment.
            </p>
            <p>
              Michael and Ellie will talk about the current market and what
              opportunities and career progression is out there. Also, they will
              explain how they can support everyone looking for advice and
              guidance in their career; interview tips, CV advice, ways that
              others are succeeding etc.
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
      title:
        "New Zealand's own user-run, user-focused AWS community, Wellington Chapter.",
      src: "https://d25nsddk6i6506.cloudfront.net/logo-onblack-wide.png",
      srcWide: "https://d25nsddk6i6506.cloudfront.net/logo-onblack-xwide.png",
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
