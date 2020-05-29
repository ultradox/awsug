<template>
  <div>
    <v-img
      src="https://d25nsddk6i6506.cloudfront.net/meetup2.jpg"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.2)"
      height="250px"
    >
    </v-img>
    <h2 class="headline mt-3 accent--text">
      Past Events
    </h2>
    <p class="subtitle-1 grey--text text--lighten-2">
      Thanks to user group members for sharing their work! View all videos on
      <a href="https://www.youtube.com/channel/UCMCXyTTzLSRL2CMwffKdegw"
        >YouTube</a
      >. Presentations given from March 2020 or after can now also be
      downloaded, simply
      <router-link to="/presentations">follow this link</router-link>.
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
