<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1 class="display-1 font-weight-bold mb-3">
            Past Presentations
          </h1>

          <div v-for="item in items" :key="item.id">
            <v-card max-width="500" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">{{ item.presenter }}</div>
                  <v-list-item-title class="headline mb-1">{{
                    item.title
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    item.subtitle
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-card-actions>
                <a :href="item.src">Download Presentations</a>
              </v-card-actions>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "PastPresentations",

  data: () => ({
    items: [
      {
        id: "1",
        date: "March-2020",
        title: "AWS Hubs and Spokes",
        presenter: "Paul Dunlop",
        subtitle: "And how they influence the multi-account strategy",
        src:
          "https://awsug-presentations.s3-ap-southeast-2.amazonaws.com/AWSUG+2020-03+Hubs+and+spokes.pptx"
      }
    ]
  }),
  mounted() {
    this.$vuetify.theme.dark = true;
  }
};
</script>

<style lang="scss" scoped></style>
