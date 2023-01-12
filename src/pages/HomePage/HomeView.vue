<template>
  <div>
    <div class="main_container">
      <h3>Welcome</h3>
      <div id="hero">
        <h1 class="hero_title">Welome to Stock&Hypes</h1>
        <p class="hero_about">
          #The best site for search an news about stocks.
        </p>
        <a href="#more" class="hero_button">Learn More</a>
      </div>
      <section>
        <article-component
          title="About site"
          about="Our site is a financial news monitoring service that tracks the
              performance of a company's shares by searching for specific
              keywords in financial news articles. By keeping track of news that
              may affect the company's performance, the site can help investors
              make informed decisions about whether to buy, sell, or hold the
              company's shares."
          imgSrc="Businessanalytics-amico.svg"
          right="false"
        ></article-component>
        <article-component
          title="Twitter API"
          about="The Twitter API (Application Programming Interface) is a set of
              tools and protocols that developers can use to build applications
              that interact with Twitter data. With the Twitter API, developers
              can access information such as tweets, user profiles, and trends,
              as well as post new tweets and interact with users."
          imgSrc="Socialmedia-amico.svg"
          right="true"
        ></article-component>
        <article-component
          title="Yahoo Finance API"
          about="The Yahoo Finance API is a set of tools and protocols that
              developers can use to build applications that interact with
              financial data from Yahoo Finance, a financial news and data
              website. The API allows developers to access real-time and
              historical stock market data, as well as information about
              individual stocks, mutual funds, and other financial instruments."
          imgSrc="Broadcast-rafiki.svg"
          right="false"
        ></article-component>
      </section>
    </div>

    <footer>
      <p>© 2021 Stock & Hypes</p>
    </footer>
  </div>
</template>


<script>
import ArticleComponent from "@/pages/HomePage/HomeComponents/ArticleComponent.vue";

export default {
  components: {
    ArticleComponent,
  },
  data() {
    return {
      name: "",

      email: "",
      password: "",
      error: "",
    };
  },
};
</script>
<style>
/* main */
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
  margin: 15px 0 30px 0;
}
#hero .hero_button {
  background-color: #fff;
  text-decoration: none;
  color: #3f3f3f;
  padding: 5px 10px;
  border-radius: 5px;
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
footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}
@media (max-width: 600px) {
  #hero .hero_title {
    font-size: 2rem;
  }
  #hero {
    border-radius: 10px;
    padding: 40px 20px;
  }
}
</style>