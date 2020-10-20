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
              GameDay, Event Engine and Scaling Challenges
            </h1>
            <hr><br>
            <h2>
              Presented by Richard Busby (Buzzy)
            </h2>
            <p>
              Date & time: Tuesday, November 3, 2020<br>
              4:30 PM to 6:30 PM<br>
              Location: 96 The Terrace, BNZ Building Ground Floor
            </p>
            <p>
              
            </p>
            <p>
              At every AWS re:Invent since 2013, AWS has run a Gameday: a simulation exercise 
              that gathers customers into teams of four, gives them a sort-of-working system, 
              and challenges them to keep it running and stable in the face of unplanned changes 
              and threats, both internal and external. 
            </p>
            <!-- <p>
              Level: Beginner to Intermediate.
            </p> -->
            <p>
              Creating a Gameday is an adventure in itself: dreaming up a scenario and the chaotic 
              & unpredictable events to throw at the teams, all while balancing “challenging vs fun” 
              for the attendees. 
            </p>
            <p>            
              It turns out making something that’s super-reliable at causing unreliable things to 
              happen is not trivial. Running events like this at scale also requires a stable, 
              reliable engine to handle the AWS accounts and infrastructure, interactions, scoring, 
              and other aspects. This talk will cover aspects of AWS Gameday, and also the underlying 
              AWS Event Engine, the account and infrastructure-provisioning system that powers tens 
              of thousands of hands-on events that AWS runs each year.
            <v-img
                src="https://d25nsddk6i6506.cloudfront.net/events/deep-learner.jpeg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.2)"
                height="250px"
              >
              </v-img>
            </p>
            <p>
              Buzzy is a Principal Engagement Architect at AWS. His team builds mechanisms and tools 
              to help AWS Solutions Architects engage with customers. If you’ve had a Solutions Architect 
              or TAM run an Immersion Day or a GameDay, his team have been behind the systems that run, 
              track, and measure these. Prior to this role, he worked as a Solutions Architect at AWS, 
              working directly with many customers in NZ and overseas. He lives in Wellington, New Zealand, 
              with his family and several chickens.
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
              Common Pitfalls in AWS Implementations
            </h1>
            <hr><br>
            <h2>
              Presented by Blaise St-Laurent
            </h2>
            <p>
              Date & time: Tuesday, November 3, 2020<br>
              4:30 PM to 6:30 PM<br>
              Location: 96 The Terrace, BNZ Building Ground Floor
            </p>
            <p>
              
            </p>
            <p>
              Over the last two years ZX Security has been asked to review the AWS 
              Security implementations of customers large and small, this talk will 
              be a quick recap of the most common, most serious and most out there 
              issues we've found.
            </p>
            <p>
              Blaise is an Architect and Cloud Lead at ZX Security.
            <v-img
                src="https://d25nsddk6i6506.cloudfront.net/events/pitfalls.jpg"
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
