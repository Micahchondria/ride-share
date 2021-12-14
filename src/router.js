import Vue from "vue";
import Router from "vue-router";

import Home from "./pages/Home.vue";
import SignIn from "./pages/SignIn.vue";
import SignUp from "./pages/SignUp.vue";
import About from "./pages/About.vue";
import System from "./pages/System.vue";
import Users from "./pages/Users.vue";
import Passengers from "./pages/Passengers.vue";
import ResetPassword from "./pages/ResetPassword.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { name: "home-page", path: "/", component: Home },
    { name: "sign-up", path: "/sign-up", component: SignUp },
    { name: "sign-in", path: "/sign-in", component: SignIn },
    { name: "about-us", path: "/about-us", component: About },
    { name: "system", path: "/system", component: System},
    { name: "users", path: "/users", component: Users },
    { name: "passengers", path: "/passengers", component: Passengers },
    { name: "reset-password", path: "/reset-password", component: ResetPassword}
  ]
});
