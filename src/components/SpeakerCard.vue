<template>
  <div>
    <br />
    <v-card max-width="800">
      <v-card-text>
        <p class="title text--primary">
          {{ speaker.name }} {{ speaker.surname }}
          <br />
          <span class="body-2">
            Registered Expression of Interested on
            <span class="primary--text">{{
              customFormatter(speaker.createdAt)
            }}</span>
          </span>
        </p>
        <div class="title text--secondary">
          {{ speaker.description }}
          <hr />
          <p class="body-2">
            <v-icon small>mdi-email-check-outline</v-icon> {{ speaker.email }}
            <v-icon small>mdi-cellphone</v-icon> {{ speaker.mobile }}
          </p>
          <p class="body-2">
            Can speak on <v-icon>mdi-calendar</v-icon>
            <span class="primary--text">{{ speaker.dateOption1 }}</span> or
            <v-icon>mdi-calendar</v-icon>
            <span class="primary--text">{{ speaker.dateOption2 }}</span>
          </p>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    speaker: Object
  },
  methods: {
    customFormatter(date) {
      return moment(date).format("dddd DD MMM YYYY, h:mm a");
    }
  }
};
</script>

<style lang="scss">
a {
  text-decoration: none;
}
</style>
