<template>
  <div>
    <div class="main_container">
      <h3>Add company</h3>
      <form @submit.prevent="addcompany">
        <label for="email">Company symbol:</label><br />
        <input id="email" type="text" v-model="symbol" />
        <br />

        <label for="password">Tags:</label><br />
        <input id="password" type="text" v-model="search" />
        <br />
        <button type="submit">Add</button><br />
      </form>
      <br />
      <h3>Companies</h3>
      <div id="companies-grid">
        <div v-for="todo in todos" :key="todo.id" id="company-saved">
          <div class="company-saved_header">
            <div class="company-saved_title">
              <h1 class="company-saved_title__text">
                <router-link
                  class="toCompany"
                  :to="{
                    name: 'NewsView',
                    params: { pSymbol: todo.text, pSearch: todo.search },
                  }"
                >
                  {{ todo.text }}
                </router-link>
              </h1>
              <span>view</span>
            </div>
            <button class="remove-button" @click="deleteCompany(todo.id)">
              X
            </button>
          </div>
          <p class="company-saved_about">
            <span class="tag" v-for="tag in getTags(todo.search)" :key="tag">{{
              tag
            }}</span>
          </p>
        </div>
      </div>
    </div>

    <footer>
      <p>© 2021 Stock & Hypes</p>
    </footer>
  </div>
</template>

<script>
import { addcompany, deleteCompany, getCompanies } from "@/user/index";

export default {
  data() {
    return {
      symbol: "",
      todos: "",
      search: "",
    };
  },
  methods: {
    addcompany,
    deleteCompany,
    getCompanies,
    getTags(str) {
      const processedString = str.toString().replace(/\s/g, "");
      return processedString.split(",");
    },
  },
  beforeMount() {
    if (localStorage.getItem("loginId") === "") {
      this.$router.replace({ path: "/" });
    }
  },
  async mounted() {
    this.getCompanies();
  },
};
</script>
<style scoped>
.toCompany {
  color: #000;
}
#company-saved {
  background-color: #fff;
  color: #000;
  border-radius: 10px;
  padding: 20px 40px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
  position: relative;
}
#company-saved .company-saved_title {
  display: flex;
  align-items: baseline;
}
#company-saved .company-saved_title__text {
  font-size: 24px;
  margin: 0;
  padding: 0;
  letter-spacing: 1px;
}
#company-saved .company-saved_about {
  letter-spacing: 0.5px;
  margin: 5px 0 15px 0;
  display: flex;
  flex-wrap: wrap;
}
#company-saved .company-saved_button {
  background-color: #000;
  text-decoration: none;
  color: #3f3f3f;
  padding: 5px 10px;
  border-radius: 5px;
}
#company-saved .company-saved_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#company-saved .company-saved_header span {
  margin: 0 0 0 10px;
  letter-spacing: 1px;
}
#company-saved .tag {
  background: #4d4d4d10;
  padding: 3px 5px;
  font-size: 14px;
  border-radius: 3px;
  margin: 0 5px 5px 0;
}
#company-saved-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 2rem;
}
#company-saved-info img {
  width: 50%;
}
#company-saved-info .company-saved-info__whois {
  width: 50%;
}
#company-saved-info h3 {
  margin-bottom: 1rem;
}
#company-saved-info p {
  text-align: justify;
}
#companies-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.remove-button {
  padding: 5px 10px;
  font-size: 14px;
  border-top-right-radius: 10px;
  position: absolute;
  right: 0;
  top: 0;
}
@media (max-width: 600px) {
  #companies-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }
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
  #company-saved-info img,
  #company-saved-info .company-saved-info__whois {
    width: 100%;
  }
}

@media (max-width: 600px) {
  #company-saved .company-saved_title__text {
    font-size: 2rem;
  }
  #company-saved {
    border-radius: 10px;
    padding: 40px 20px;
  }
}
</style>
