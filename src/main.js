import Vue from "vue";
import App from "./App.vue";
// import "@aws-amplify/ui-vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

// Amplify
import Amplify, * as AmplifyModules from "aws-amplify";
import { Auth, Logger } from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

Amplify.Logger.LOG_LEVEL = "NONE";

const logger = new Logger("main");

Auth.currentAuthenticatedUser()
  .then(user => logger.debug(user))
  .catch(err => logger.debug(err));

Vue.use(AmplifyPlugin, AmplifyModules, Auth);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  template: "<App/>",
  components: { App },
  render: h => h(App)
}).$mount("#app");
