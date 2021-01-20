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
              February 2021 Meetup Event
            </h1>
            <p>
              Date & time: Tuesday, February 2, 2021<br>
              4:30 PM to 6:30 PM GMT+13<br>
              BNZ on The Terrace<br>
              RSVP: <a href="https://www.meetup.com/Amazon-Web-Services-Wellington-User-Group/events/275819512/">Meetup.com</a>
            </p>
            <hr><br>
            <h2>
              Cost Optimisation of Public Cloud, by Carlos Reyneke
            </h2>

            <p>
              Carlos is an AWS Cloud Engineer at Deloitte with nearly 20 years hands-on experience in managing and delivering robust ICT solutions. He is currently assisting clients across multiple industries adopt best practices and to get the most out of AWS.
            </p>
            <p>
              Cost optimization of public cloud resources is one of the five pillars of the AWS Well Architected Framework, yet many organizations haven’t taken the step to invest in a FinOps capability to ensure business outcomes are achieved at the lowest price point. FinOps is about combining financial accountability with autonomous team delivery. This is an exciting area of focus that organizations shouldn’t ignore.
            </p>  
            <p>
              <v-img
                src="https://d25nsddk6i6506.cloudfront.net/events/aws-cost-optimisation.jpg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.2)"
                height="250px"
              >
              </v-img>
            </p>          
            <hr><br>
            <h2>AWS Network Firewall, by Chris Watson</h2>
            <p>
              Chris is an experienced AWS Architect, at Datacom with many years experience working on AWS including data centre migrations, security uplifts, cost optimization etc.
            </p>
            <p>
              The new AWS Network Firewall is a great new service which now means that in AWS you can natively do URL filtering, packet inspection etc. at scale.
            </p>
            <p>
              Learn how to set-up within an AWS Network, its functionality, its costs etc. including seeing it in action in demo environment.
            </p>
            <p>
              <v-img
                src="https://d25nsddk6i6506.cloudfront.net/events/security.jpg"
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
