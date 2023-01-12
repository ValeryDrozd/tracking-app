<template>
  <article v-bind:class="{ 'article_left': right== 'false' }">
    <div class="article_content">
      <h3>{{ title }}</h3>
      <p>
        {{ about }}
      </p>
    </div>
    <img v-bind:src="require(`@/assets/${imgSrc}`)" />
  </article>
</template>
  
<script>
export default {
  name: "ArticleComponent",
  props: {
    title: String,
    about: String,
    imgSrc: String,
    right: String
  },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
article {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
}
.article_content {
  width: 50%;
  color: #3f3f3f;
}
article img {
  width: 30%;
  height: auto;
  margin: 0 auto;
}
.article_left {
  flex-direction: row-reverse;
}
@media (max-width: 600px) {
  article {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .article_content {
    width: 100%;
    color: #3f3f3f;
  }
  article img {
    width: 50%;
    height: auto;
    margin: 1rem auto 0 auto;
  }
  .article_left {
    flex-direction: column;
  }
}
</style>
  