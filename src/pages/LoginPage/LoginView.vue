<template>
  <div class="main_container">
    <h3>Login</h3>
    <div id="hero">
      <h1 class="hero_title">Sign in your account</h1>
      <p class="hero_about">or register new for start your company.</p>
      <!-- <a href="#more" class="hero_button">Learn More</a> -->
    </div>
    <form>
      <label for="email">Email:</label><br />
      <input id="email" type="email" v-model="email" />
      <br />

      <label for="password">Password</label><br />
      <input id="password" type="password" v-model="password" />
      <br />
      <button type="submit" @click.prevent="login">Login</button><br />
    </form>
    <p v-bind:textContent="error"></p>
  </div>

  <footer>
    <p>© 2021 Stock & Hypes</p>
  </footer>
</template>
  
  
  <script>
import { login } from '@/user/index'

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      status: "",
      error: "",
    };
  },
  methods: {
    login
  },
  beforeMount() {
    if (localStorage.getItem("loginId") !== "") {
      this.$router.replace({ path: "/" });
    }
  },
};
</script>
<style>
body {
  background-color: #fafafa;
}
.main_container {
  padding: 1rem 16px 0 16px;
  max-width: 1200px;
  margin: 0 auto;
}
#hero {
  background-color: #302f41;
  color: #fff;
  border-radius: 10px;
  padding: 40px 80px;
}
#hero .hero_title {
  font-size: 48px;
  margin: 0;
  padding: 0;
  letter-spacing: 1px;
}
#hero .hero_about {
  letter-spacing: 0.5px;
  margin: 15px 0 15px 0;
}

h3 {
  color: #3c6a79;
  font-size: 24px;
  margin: 0 0 40px 0;
}
p {
  margin: 0;
  font-size: 18px;
  font-weight: 300;
  line-height: 1.7rem;
}
label {
  color: #3c6a79;
  font-size: 24px;
}
input {
  border: none;
  padding: 10px 15px;
  width: 400px;
  margin-top: 10px;
  margin-bottom: 2rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 4px;
}
button {
  background-color: #302f41;
  color: #fff;
  border: none;
  padding: 10px 30px;
  font-size: 18px;
  letter-spacing: 1px;
  border-radius: 5px;
}
form {
  margin-top: 2rem;
}
@media (max-width: 600px) {
  #hero .hero_title {
    font-size: 2rem;
  }
  #hero {
    border-radius: 10px;
    padding: 40px 20px;
  }
  input {
    width: 90%
  }
}
</style>