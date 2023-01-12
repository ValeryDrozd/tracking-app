<template>
  <div>
    <div class="main_container">
      <h3>Company</h3>
      <div id="company">
        <div class="company_header">
          <h1 class="company_title">{{ symbol }}</h1>
          <span>{{ price }} USD</span>
        </div>
        <p class="company_about">
          <span class="tag" v-for="tag in searchArray" :key="tag">{{
            tag
          }}</span>
        </p>
      </div>
      <div id="company-info">
        <div class="company-info__whois">
          <h3>About</h3>
          <DetailedComponentVue
            v-bind:symbol="this.$route.params.pSymbol"
          ></DetailedComponentVue>
          <!-- <p>Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services. In addition, the company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, and HomePod. Further, it provides AppleCare support and cloud services store services; and operates various platforms, including the App Store that allow customers to discover and download applications and digital content, such as books, music, video, games, and podcasts. Additionally, the company offers various services, such as Apple Arcade, a game subscription service; Apple Fitness+, a personalized fitness service; Apple Music, which offers users a curated listening experience with on-demand radio stations; Apple News+, a subscription news and magazine service; Apple TV+, which offers exclusive original content; Apple Card, a co-branded credit card; and Apple Pay, a cashless payment service, as well as licenses its intellectual property. The company serves consumers, and small and mid-sized businesses; and the education, enterprise, and government markets. It distributes third-party applications for its products through the App Store. The company also sells its products through its retail and online stores, and direct sales force; and third-party cellular network carriers, wholesalers, retailers, and resellers. Apple Inc. was incorporated in 1977 and is headquartered in Cupertino, California.</p> -->
        </div>
        <ChartComponent
          v-bind:symbol="this.$route.params.pSymbol"
          class="chart"
        ></ChartComponent>
      </div>
      <div class="search-tabs">
        <span
          :class="{ active: selectedTab == 'yh' }"
          @click="selectedTab = 'yh'"
          >Yahoo Finance News</span
        >
        <span
          :class="{ twitterActive: selectedTab == 'tw' }"
          @click="selectedTab = 'tw'"
          >Twitter Seach</span
        >
        <span
          :class="{ gnActive: selectedTab == 'gn' }"
          @click="selectedTab = 'gn'"
          >Guardian News</span
        >
      </div>
      <YahooNews v-if="selectedTab == 'yh'" v-bind:search="this.$route.params.pSearch"></YahooNews>
      <TwitterNews v-if="selectedTab == 'tw'" v-bind:search="this.$route.params.pSearch"></TwitterNews>
      <GuardianNews v-if="selectedTab == 'gn'" v-bind:search="this.$route.params.pSearch"></GuardianNews>
    </div>

    <footer>
      <p>© 2021 Stock & Hypes</p>
    </footer>
  </div>
</template>
  
  <script>
import YahooNews from "@/pages/NewsPage/NewsComponents/YahooNews.vue";
import TwitterNews from "@/pages/NewsPage/NewsComponents/TwitterNews.vue";
import GuardianNews from "@/pages/NewsPage/NewsComponents/GuardianNews.vue";
import ChartComponent from "@/pages/NewsPage/NewsComponents/ChartComponent.vue";
import DetailedComponentVue from "@/pages/NewsPage/NewsComponents/DetailedComponent.vue";

import { ajax } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";

export default {
  components: {
    YahooNews,
    ChartComponent,
    TwitterNews,
    DetailedComponentVue,
    GuardianNews
  },
  data() {
    return {
      symbol: "",
      search: "",
      selectedTab: "yh",
      price: 0,
    };
  },
  computed: {
    searchArray() {
      return this.search.split(",");
    },
  },
  beforeMount() {
    if (localStorage.getItem("loginId") === "") {
      this.$router.replace({ path: "/" });
    }
  },
  async mounted() {
    this.loaded = false;
    this.symbol = this.$route.params.pSymbol;
    this.search = this.$route.params.pSearch;

    const url = `https://query1.finance.yahoo.com/v11/finance/quoteSummary/${encodeURIComponent(
      this.symbol
    )}?modules=financialData`;

    const stock$ = ajax(url).pipe(
      map((res) => res.response),
      catchError((error) => {
        console.error(error);
        // eslint-disable-next-line no-undef
        return of(error);
      })
    );

    stock$.subscribe((data) => {
      this.loaded = true;
      this.price = data.quoteSummary.result[0].financialData.currentPrice.raw;
    });
  },
  
};
</script>
<style>
.symbol {
  font-size: 34px;
  font-weight: 700;
  color: #3f3f3f;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin: 0;
}
.search_query {
  margin: 0;
}
span {
  cursor: pointer;
}

.search-tabs {
  margin: 1rem 0;
  display: flex;
  justify-content: center;
}
.search-tabs span {
  margin: 0 1rem;
  background: #3f3f3f06;
  padding: 10px 15px;
  border-radius: 8px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
span.active {
  color: #7c1fff94;
  background: #7c1fff13;
}
span.twitterActive {
  color: #1f88ff94;
  background: #1f88ff10;
}
span.gnActive {
  color: #3f3f3f;
  background: #00000010;
}
/* --------------------------------------------------------------------------- */
.main_container {
  padding: 1rem 16px 0 16px;
  max-width: 1200px;
  margin: 0 auto;
}
#company {
  background-color: #302f41;
  color: #fff;
  border-radius: 10px;
  padding: 40px 80px;
}
#company .company_title {
  font-size: 48px;
  margin: 0;
  padding: 0;
  letter-spacing: 1px;
  text-transform: uppercase;
}
#company .company_about {
  letter-spacing: 0.5px;
  display: flex;
  flex-wrap: wrap;
}
#company .company_button {
  background-color: #fff;
  text-decoration: none;
  color: #3f3f3f;
  padding: 5px 10px;
  border-radius: 5px;
}
#company .company_header {
  display: flex;
  align-items: baseline;
}
#company .company_header span {
  margin: 0 0 0 10px;
  letter-spacing: 1px;
}
#company .tag {
  background: #ffffff10;
  padding: 3px 5px;
  font-size: 14px;
  border-radius: 3px;
  margin: 0 5px 5px 0;
}
#company-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 2rem;
}
#company-info .chart {
  width: 45%;
  min-height: 100px;
}
#company-info .company-info__whois {
  width: 50%;
}
#company-info h3 {
  margin-bottom: 1rem;
}
#company-info p {
  text-align: justify;
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
@media (max-width: 600px) {
  #company-info .chart,
  #company-info .company-info__whois {
    width: 100%;
  }
}

@media (max-width: 600px) {
  #company .company_title {
    font-size: 2rem;
  }
  #company {
    border-radius: 10px;
    padding: 40px 20px;
  }
}
</style>
  