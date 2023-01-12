<template>
  <div class="list" v-if="loaded">
    <div v-for="tweet in tweets" :key="tweet.id" class="mini-news-block">
      <!-- <div
        v-if="typeof tweet.img !== 'undefined'"
        class="mini-news-block__image"
        v-bind:style="{
          backgroundImage: 'url(' + tweet.img + ')',
        }"
      ></div> -->
      
        <h2 class="mini-news-block__title">{{ tweet.text }}</h2>
      
    </div>
  </div>
</template>

<script>
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

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
      hashtag: '',
      search_array: "a",
      loaded: false,
      tweets: []
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
      const apiUrl = 'https://api.twitter.com/1.1/search/tweets.json';
      const apiToken = process.env.VUE_APP_TWITTER_API_KEY;
      ajax({
        url: `${apiUrl}?q=%23${element}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiToken}`
        }
      })
        .pipe(
          map(response => response.response),
        )
        .subscribe(data => {
          this.tweets = this.tweets.concat(data.statuses);
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
  color: #1fa2ff;
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
  overflow: hidden;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  border-left: 3px solid #1fa2ff;
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