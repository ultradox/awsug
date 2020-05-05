<template>
  <div>
    <div v-if="loading">
      <v-sheet
        :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
        class="px-3 pt-3 pb-3"
      >
        <v-skeleton-loader
          class="mx-auto"
          max-width="1200"
          type="card"
        ></v-skeleton-loader>
      </v-sheet>
    </div>
    <div v-else>
      <div>
        <v-flex mb-4 v-if="speakers.length >= 1">
          <h2 class="headline font-weight-bold mb-3">
            Speaker Expressions of Interest
          </h2>
          <SpeakerCard
            v-for="speaker in speakers"
            v-bind:key="speaker.id"
            :speaker="speaker"
          />
        </v-flex>
        <div v-else>
          <v-alert type="warning">
            Sadly there are no speaker requests at this point in time 💔
          </v-alert>
        </div>
      </div>
    </div>
    <div v-if="err">
      <v-alert type="error">
        {{ err }}
      </v-alert>
    </div>
  </div>
</template>

<script>
import API, { graphqlOperation } from "@aws-amplify/api";
import { speakerEoiByCreatedAt } from "../graphql/queries";
import awsmobile from "../aws-exports";

import SpeakerCard from "@/components/SpeakerCard";

API.configure(awsmobile);

export default {
  name: "SpeakerList",
  inject: ["theme"],
  components: {
    SpeakerCard
  },
  data: () => ({
    speakers: [],
    loading: true,
    err: ""
  }),
  methods: {
    async getSpeakers() {
      try {
        const result = await API.graphql(
          graphqlOperation(speakerEoiByCreatedAt, {
            sortHash: "Sorted",
            sortDirection: "DESC"
          })
        );
        this.speakers = result.data.speakerEoiByCreatedAt.items;
        this.loading = false;
      } catch (e) {
        this.err = e;
      }
    }
  },
  created: function() {
    this.getSpeakers();
  }
};
</script>
