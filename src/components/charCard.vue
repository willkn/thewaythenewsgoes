<template>
  <div class="cell">
    <img id="pfp" :src="this.characterInfo.image" />
    <h3>ID: {{ characterInfo.id }}</h3>
    <h3>Name: {{ characterInfo.name }}</h3>
    <h3>Status: {{ characterInfo.status }}</h3>
    <h3>Location: {{ characterInfo.location }}</h3>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ["id"],
  data() {
    return {
      info: null,
      objJSON: null,
      stringified: 1,
      characterInfo: {
        id: null,
        name: null,
        status: null,
        location: null,
        image: null
      }
    };
  },
  mounted() {
    this.APIcall();
  },

  methods: {
    APIcall() {
      axios
        .get("https://rickandmortyapi.com/api/character/" + this.$props.id)
        .then(response => (this.info = response));
    }
  },
  watch: {
    // When a response is recieved from the API, parse the response and log it in
    info: function() {
      // Stringifies the JSON then constructs an object
      var stringJSON = JSON.stringify(this.info);
      var stringJSON = JSON.parse(stringJSON);
      this.objJSON = stringJSON;
      // Easier than changing the boolean back to false.
      this.stringified += 1;
      console.log("info has changed")
    },
    // Data has been made into an object, now it needs to be saved to the vue instance
    stringified: function() {
      this.characterInfo.id = this.objJSON.data.id;
      this.characterInfo.name = this.objJSON.data.name;
      this.characterInfo.status = this.objJSON.data.status;
      this.characterInfo.location = this.objJSON.data.location.name;
      this.characterInfo.image = this.objJSON.data.image;
    }
  }
};
</script>

<style scoped>
.cell {
    border: solid #078691 10px;
    /* float: left; */
    display: inline-grid;
    width: 400px;
    text-align: center;
    padding: 20px;
    margin-top: 20px;
    background-color: #0d616f;
    height: 700px;
}
#pfp {
    height: 300px;
    width: 300px;
    margin: auto;
}
</style>