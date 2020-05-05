import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#FF5722",
        secondary: "#212121",
        accent: "#FFFFFF",
        info: "#FBC02D",
        success: "#78909C",
        error: "#EF5350",
        warning: "#651FFF"
      }
    }
  }
});
