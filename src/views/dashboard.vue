<template>
  <div>
    <Loader :loader="loader" />
    <Nav ref="sidebar" @selectedItem="scrollToItem($event)" />
    <div id="dashboard-content" class="dashboard-content dashboard">
      <Home id="home" :username="userData.firstName+' '+userData.lastName"/>
      <About id="about" />
      <projects id="projects" />
    </div>
  </div>
</template>
<script>
import { SocialUserService } from "../service/socialUserService.js";
import { UserDetails } from "../service/userdetail.js";
import Nav from "../components/navbar/navbar.vue";
import About from "./About.vue";
import Home from "./Home.vue";
import Projects from "./Projects.vue";
import "../js/dashboard.js";
import $ from "jquery";
import Loader from "../widget/Loader.vue";

const userDetails = new UserDetails();
const socialUserService = new SocialUserService();
export default {
  components: {
    About,
    Nav,
    Home,
    Projects,
    Loader
  },
  data() {
    return {
      info: null,
      loader:false,
      params: [],
      userData: []
    };
  },
  created() {
    // console.log(this.$route.query.id);
    const user_id = sessionStorage.getItem("user_id");
    if (user_id) {
      console.log("userid ");
      this.getUserDetails();
    } else if (this.$route.query.id) {
      console.log("query is");
      this.socialUser();
    } else {
      console.log("no token");
      this.$router.push({ name: "Authentication" });
    }
    console.log(this.$route.query.id);
  },
  methods: {
    scrollToItem(event) {
      var elmnt = document.getElementById(event);
      elmnt.scrollIntoView({
         behavior: 'smooth'
      });
    },
    socialUser() {
      this.loader = true
      this.params = this.$route.query.id;
      socialUserService.getSocialUserDetails(this.params).then(res => {
        this.loader = false
        if (res.statusText === "OK") {
          this.userData  = res.data[0];
          console.log(this.userData)
          sessionStorage.setItem("user_id", this.params);
        }
      }).catch(e=>{
        this.loader = false
        console.log(e)
      })
    },
    getUserDetails() {
      this.loader = true
      let userID = sessionStorage.getItem("user_id");
      userDetails.getUser(userID).then(res => {
        this.loader = false
        this.userData = res.data[0];
        console.log(res.data[0])
        if (this.userData.status.Status === 200) {
          this.userData = res.data[0].data;
          sessionStorage.setItem("username", res.data[0].data.First_name + " " + res.data[0].data.Last_name )
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.dashboard {
  background: #34495e;
  height: 100vh;
  overflow: scroll;
  overflow-x: hidden;
  overflow: -moz-scrollbars-none !important;
  -ms-overflow-style: none !important;
  #navbar {
    z-index: 5 !important;
  }
  .dashboard-content {
    text-align: center;
  }
}
.dashboard::-webkit-scrollbar {
  display: none !important;
  width: 0px !important;
  background: transparent;
}
.animation-element {
  color: red;
  font-size: 20px;
}
</style>
