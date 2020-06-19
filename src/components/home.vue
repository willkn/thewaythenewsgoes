<template>
  <div class="main">
    <h1>C-137</h1>
    <div class="characterContainer">
      <h3>ID: {{ characterInfo.id }}</h3>
      <h3>Name: {{ characterInfo.name }}</h3>
      <h3>Age: {{ characterInfo.age }}</h3>
      <h3>Status: {{ characterInfo.status }}</h3>
      <h3>Location: {{ characterInfo.location }}</h3>
      <h1>Info: {{ info }}</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      characterInfo: {
        id: null,
        name: null,
        age: null,
        status: null,
        location: null
      },
      info: null
    };
  },
  methods: {},
  mounted() {
    // Base URL, append this url for any future calls.
    let baseurl = "https://rickandmortyapi.com/api/";
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then(response => (this.info = response));
  },
  watch: {
    // When a response is recieved from the API, parse the response and log it in  
    info: function() {
      // Stringifys the json then constructs an object
      var stringJSON = JSON.stringify(this.info);
      JSON.parse(stringJSON);
      console.log(stringJSON);
      
    }
  }
};
</script>

<style scoped>
.main {
  margin: auto;
  width: 200px;
}

.characterContainer {
  text-align: left;
  margin-top: 100px;
}
</style>



