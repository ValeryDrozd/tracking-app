<template>
  <div class="topnav">
    <div class="main-container">
      <div class="active-link">
        <router-link to="/" class="logo a-link">Stock&Hypes</router-link>
        <div class="nav-links">
          <router-link v-if="loginId !== ''" to="/companies" class="a-link"
            >Companies</router-link
          >
        </div>
      </div>

      <div id="myLinks">
        <router-link v-if="isLogin" to="/companies" class="a-link">Companies</router-link>
        <router-link v-if="!isLogin" to="/login" class="a-link"
          >Login</router-link
        >
        <router-link v-if="!isLogin" to="/signup" class="a-link"
          >Sign Up</router-link
        >
        <a v-if="isLogin" class="a-link" @click="exit">Exit</a>
      </div>
      <div class="account_buttons">
        <router-link v-if="!isLogin" to="/login" class="a-link"
          >Login</router-link
        >
        <router-link v-if="!isLogin" to="/signup" class="a-link"
          >Sign Up</router-link
        >
        <a v-if="isLogin" class="a-link" @click="exit">Exit</a>
      </div>
      <a class="a-link icon" @click="dropMenu">
        <i class="fa fa-bars"></i>
      </a>
    </div>
  </div>
  <router-view />
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.loginId !== "";
    },
  },
  data() {
    return {
      loginId: localStorage.getItem("loginId"),
    };
  },
  watch: {
    '$localStorage.loginId': {
      handler(newValue) {
        this.loginId = newValue;
      },
      deep: true,
    },
  },
  beforeMount() {
    this.loginId = localStorage.getItem("loginId");
  },
  methods: {
    dropMenu() {
      var x = document.getElementById("myLinks");
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
    },
    exit() {
      localStorage.setItem("loginId", '');
      this.$router.replace({ path: '/' });
      location.reload();
    }
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
button{
  cursor: pointer;
}
button:hover {
  background-color: #ddd;
  color: black;
}

.topnav {
  overflow: hidden;
  background-color: #fff;
  position: relative;
}

.topnav #myLinks {
  display: none;
}

.topnav .logo {
  font-weight: 500;
  font-size: 18px;
  border-left: 3px solid #302f41;
}

.topnav .a-link {
  /*   color: white; */
  color: #3f3f3f;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  display: block;
  cursor: pointer;
}

.topnav .icon {
  background: #302f41;
  display: block;
  color: #fff;
  position: absolute;
  right: 0;
  top: 0;
}

.topnav .account_buttons {
  display: flex;
}

.topnav .account_buttons .a-link {
  background: #302f41;
  display: flex;
  color: #fff;
}

.topnav .a-link:hover {
  background-color: #ddd;
  color: black;
}

.active-link {
  /*   background-color: #04AA6D; */
  background-color: #fff;
  /*   color: white; */
  color: #000;
  display: flex;
}

.nav-links {
  display: flex;
}

footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

@media (max-width: 600px) {
  .nav-links {
    display: none;
  }

  .topnav .a-link.icon {
    display: block;
  }
  .topnav .account_buttons {
    display: none;
  }
}

@media (min-width: 600px) {
  .topnav .main-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  .topnav .a-link.icon {
    display: none;
  }

  .topnav #myLinks .a-link {
    display: none;
  }

  .nav-links {
    display: flex;
  }
}
</style>
