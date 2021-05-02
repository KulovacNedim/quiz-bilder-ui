<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="doSomething">do</button>
  </div>
</template>

<script>
import { serverAPI } from "../axios-api";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    doSomething: () => {
      serverAPI
        .get("/api/random/")
        .then((res) => {
          console.log(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
