import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/blog",
    name: "listblogs",
    component: () => import("../views/Blog")
  },
  {
    path: "/blog-admin",
    name: "blog-admin",
    component: () => import("../views/BlogAdmin"),
    meta: { requiresAuth: true }
  },
  {
    path: "/new-blog",
    name: "new-blog",
    component: () => import("../views/BlogNew"),
    meta: { requiresAuth: true }
  },
  // {
  //   path: "/author",
  //   name: "getAuthor",
  //   component: () => import("../views/ViewAuthor"),
  //   props: true,
  //   meta: { requiresAuth: true }
  // },
  {
    path: "/author/:anchor",
    name: "authorViewBlog",
    component: () => import("../views/BlogPreview"),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/blog/:anchor",
    name: "viewBlog",
    component: () => import("../views/BlogPreview"),
    props: true
  },
  {
    path: "/author/edit/:anchor",
    name: "authorEditBlog",
    component: () => import("../views/BlogEdit"),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/account",
    name: "account",
    component: () => import("../components/SignIn")
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../components/SignUp")
  },
  {
    path: "/members",
    name: "members",
    component: () => import("../views/MembersOnly"),
    meta: { requiresAuth: true }
  },
  {
    path: "/palette",
    name: "palette",
    component: () => import("../components/Palette"),
    meta: { requiresAuth: true }
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/Profile"),
    meta: { requiresAuth: true }
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/Admin"),
    meta: { requiresAuth: true }
  },
  {
    path: "/speaker",
    name: "speaker",
    component: () => import("../views/SpeakerRegistration")
  },
  {
    path: "/speakers",
    name: "speakers",
    component: () => import("../views/SpeakerList"),
    meta: { requiresAuth: true }
  },
  {
    path: "/constitution",
    name: "constitution",
    component: () => import("../views/SocietyRules")
  },
  {
    path: "/presentations",
    name: "presentations",
    component: () => import("../views/PastPresentations")
  },
  { path: "*", component: () => import("../components/NotFoundComponent") }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

let status = true;

router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    Vue.prototype.$Amplify.Auth.currentAuthenticatedUser()
      .then(data => {
        if (data && data.signInUserSession) {
          if (status) status = data;
        }
        next();
        // eslint-disable-next-line prettier/prettier
      }).catch((e) => {
        next({
          path: "/account"
        });
        status = e;
      });
  }
  next();
});

export default router;
