<template>
  <v-container fluid>
    <v-card>
      <!-- AWSUG Aotearoa Fern Image - normal and wide view -->
      <v-card-title class="headline white--text">{{ card.title }}</v-card-title>
      <v-card-text>
        <h1 class="title grey--text text--lighten-2">
          Our official Sponsor for March and April 2020.
        </h1>
        <p>
          We'd like to thank The Instillery for sponsoring us in March and
          April. You can
          <a href="https://theinstillery.com/">visit their website</a> to find
          out more about this award-winning Kiwi company born in the cloud and
          automation era, servicing clients across the globe.
        </p>
      </v-card-text>
    </v-card>
    <div v-show="$vuetify.breakpoint.xsOnly">
      <v-img
        :src="card.srcMobile"
        gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.2)"
      >
      </v-img>
    </div>
    <div v-show="$vuetify.breakpoint.smAndUp">
      <v-img
        :src="card.src"
        gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.2)"
      >
      </v-img>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    card: {
      title: "Cheers The Instillery 🍻🍾",
      src:
        "https://d25nsddk6i6506.cloudfront.net/sponsors/the-instillery-2020.jpg",
      srcMobile:
        "https://d25nsddk6i6506.cloudfront.net/sponsors/the-instillery-2020-mobile.jpg",
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
