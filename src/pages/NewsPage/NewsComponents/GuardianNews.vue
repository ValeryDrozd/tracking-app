<template>
  <div class="list" v-if="loaded">
    <div v-for="result in results" :key="result" class="mini-news-block">
      <!-- <div
        v-if="typeof tweet.img !== 'undefined'"
        class="mini-news-block__image"
        v-bind:style="{
          backgroundImage: 'url(' + tweet.img + ')',
        }"
      ></div> -->
      <a class="news_link" :href="result.webUrl">
        <h2 class="mini-news-block__title">{{ result.webTitle  }}</h2>
      </a>
        
      
    </div>
  </div>
</template>

<script>
import { ajax } from 'rxjs/ajax';

export default {
  name: "GuardianNews",
  props: {
    search: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      hashtag: '',
      search_array: "a",
      loaded: false,
      results: []
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
      ajax({
        url: `https://content.guardianapis.com/search?q=${element}&api-key=${process.env.VUE_APP_GUARDIAN_API_KEY}`,
        method: 'GET',
      })
      .subscribe(res => {
          this.results = this.results.concat(res.response.response.results);
          this.loaded = true;
      });
    });
  }
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
  color: #3f3f3f;
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
  border-left: 3px solid #3f3f3f;
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