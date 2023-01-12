<template>
  <!-- <p v-bind:textContent="stock.currentPrice"></p> -->
  <div class="list" v-if="loaded">
    <div v-for="news in yNews" :key="news.uuid" class="mini-news-block">
      <div
        v-if="typeof news.thumbnail !== 'undefined'"
        class="mini-news-block__image"
        v-bind:style="{
          backgroundImage: 'url(' + news.thumbnail.resolutions[1].url + ')',
        }"
      ></div>
      <a class="news_link" :href="news.link">
        <h2 class="mini-news-block__title">{{ news.title }}</h2>
      </a>
    </div>
  </div>
</template>
    
    <script>
import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";

export default {
  name: "YahooNews",
  props: {
    search: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loaded: false,
      yNews: [],
      search_array: "a",
    };
  },
  watch: {
    search(newValue) {
      this.search_array = newValue;
    },
  },
  async mounted() {
    this.loaded = false;
    this.search_array = this.search;
    const processedString = this.search_array.toString().replace(/\s/g, '');
    const sArray = processedString.split(',');

    sArray.forEach(element => {
      ajax(
      `https://query1.finance.yahoo.com/v1/finance/search?q=${element}`
    )
      .pipe(map((response) => response.response))
      .subscribe((data) => {
        this.yNews = this.yNews.concat(data.news);
        this.loaded = true;
      });
    });
    
  },
};
</script>
  <style>
* {
  transition: all 0.1s ease-out;
}
.news_link {
  text-decoration: none;
  flex: 4;
  color: #000;
}
.news_link:hover {
  color: #7e1fff;
}
.list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.mini-news-block {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  overflow: hidden;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  border-left: 3px solid #7e1fff;
  border-radius: 3px;
  padding: 0 10px;
  width: -webkit-fill-available;
  max-width: 600px;
  margin: 5px;
}

.mini-news-block__image {
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 5px 10px;
}

.mini-news-block__title {
  font-size: 16px;
  font-weight: 500;
  text-align: start;
  word-wrap: break-word;
}

@media (min-width: 480px) {
  .mini-news-block {
    flex-direction: row;
    margin: 0.5rem 0;
  }
  .mini-news-block__image {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }
  .mini-news-block__title {
    font-size: 16px;
    padding: 10px;
  }
}
</style>