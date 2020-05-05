<template>
  <v-app>
    <NavBar />
    <v-content>
      <transition name="fade">
        <router-view />
      </transition>
    </v-content>
    <NavFooter :key="componentKey" />
  </v-app>
</template>

<script>
import { AmplifyEventBus } from "aws-amplify-vue";
import { Auth } from "aws-amplify";
import NavBar from "@/components/NavBar";
import NavFooter from "@/components/NavFooter";

export default {
  name: "App",
  components: {
    NavBar,
    NavFooter
  },
  data: () => ({
    err: "",
    componentKey: 0
  }),
  methods: {
    authUser() {
      Auth.currentAuthenticatedUser()
        .then(user => (this.userName = user.username))
        .catch(err => (this.err = err));
    }
  },
  created: function() {
    // this.getUser();
    this.authUser();
  },
  mounted() {
    AmplifyEventBus.$on("authState", info => {
      if (info === "signIn") {
        this.componentKey += 1;
      } else if (info === "signOut") {
        this.componentKey += 1;
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition-property: all;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateX(-25px);
}
</style>
