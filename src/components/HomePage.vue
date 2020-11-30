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
              AWS Deep Racer
            </h1>
            <hr><br>
            <!-- <h2>
              Hear from AWS Heroes and leading community members
            </h2> -->
            <p>
              Date & time: Monday, December 14, 2020<br>
              10AM - 6:00PM<br>
              20 Customhouse Quay · Wellington<br>
              RSVP: <a href="https://www.meetup.com/Amazon-Web-Services-Wellington-User-Group/events/274664714/">Meetup.com</a>
            </p>
            <p>
              
            </p>
            <p>
              AWS DeepRacer gives you an interesting and fun way to get started with reinforcement learning (RL). RL is an advanced machine learning (ML) technique that takes a very different approach to training models than other machine learning methods. Its super power is that it learns very complex behaviors without requiring any labeled training data, and can make short term decisions while optimizing for a longer term goal.
            </p>
            <p>
              Deloitte will have a DeepRacer with track for you to try out and see how fast you can go.
            </p>
            <p>            
              <a href="https://aws.amazon.com/deepracer/">Find out more about DeepRacer</a>
            <v-img
                src="https://d25nsddk6i6506.cloudfront.net/events/deep-racer.jpeg"
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
    <v-row justify="center">
      <v-col cols="10" md="8">
        <v-card class="pa-2" outlined tile>
          <v-card-text class="grey--text text--lighten-2">
            <h1>
              re:Invent re:Cap
            </h1>
            <hr><br>
            <h2>
              With Scott Patterson and Chris Watson
            </h2>
            <p>
              Date & time: Monday, December 14, 2020<br>
              4:00OM - 8:00PM<br>
              20 Customhouse Quay · Wellington<br>
              RSVP: <a href="https://www.meetup.com/Amazon-Web-Services-Wellington-User-Group/events/274596919/">Meetup.com</a>
            </p>
            <p>
              At AWS the culture of Innovation drives much of what we do, much of the innovation is driven by customers themselves. There is no bigger event showcasing AWS Innovation than AWS re:Invent so for those who are unable to attend this event online, you can experience the key announcements explained by a team from AWS alongside the Wellington AWS User Group and AWS Premier global cloud partner Deloitte.
            </p>
            <p>
              re:CAP will be presented by a team made up of AWS Ambassadors, AWS Cloud leaders in the field, Deloitte’s Cloud team, providing information on key insights, supported by AWS Solution Architects and hot off the press announcements for AWS users in New Zealand. The session will run from 4-7pm and be followed by a chance to mingle with industry peers over some pizza and beer - and networking giving us an great opportunity to discuss the great new developments.
            </p>
            <p>
              In the words of Jeff Barr- "The Journey Begins with You. No matter what your role is in your company’s cloud efforts, you’ll walk away with the technical knowledge to help you and your company refine your cloud strategy, increase application performance, and so much more."
            </p>
            <p>            
              <a href="https://aws.amazon.com/deepracer/">Find out more about DeepRacer</a>
            <v-img
                src="https://d25nsddk6i6506.cloudfront.net/events/reinvent.jpg"
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
