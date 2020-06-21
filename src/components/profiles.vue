<template>
  <div class="main">
    <input v-model="nextPage" placeholder="Enter page number (1-591)" @keydown.enter="changePage" />
    <div class="characterContainer">
      <app-profile></app-profile>
      <img :src="this.characterInfo.image" />
      <h3>ID: {{ characterInfo.id }}</h3>
      <h3>Name: {{ characterInfo.name }}</h3>
      <h3>Status: {{ characterInfo.status }}</h3>
      <h3>Location: {{ characterInfo.location }}</h3>
      <h1 style="color: red;">{{ error }}</h1>
      <br />
      <p>{{ objJSON }}</p>
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
        status: null,
        location: null,
        image: null
      },
      info: null,
      stringified: null,
      objJSON: null,
      charNum: 1,
      nextPage: null,
      error: null
    };
  },
  mounted() {
    this.APIcall();
  },
  methods: {
    // Calls the API and passes the data to the vue instance.
    APIcall() {
      axios
        .get("https://rickandmortyapi.com/api/character/" + this.charNum)
        .then(response => (this.info = response));
    },
    first() {
      this.nextPage = 1;
    },
    last() {
      this.nextPage = 592;
    },
    changePage() {
      this.charNum = this.nextPage;
      nextPage = "";
    },
    spaceCalc() {
      // Get the length of
    }
    // validNumberCheck() {
    //   if (
    //     Number.isInteger(this.charNum) &&
    //     this.charNum < 592 &&
    //     this.charNum > 0
    //   ) {
    //     this.error = "";
    //   } else {
    //     this.error = "Please choose a valid number";
    //   }
    // }
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
    },
    // Data has been made into an object, now it needs to be saved to the vue instance
    stringified: function() {
      this.characterInfo.id = this.objJSON.data.id;
      this.characterInfo.name = this.objJSON.data.name;
      this.characterInfo.status = this.objJSON.data.status;
      this.characterInfo.location = this.objJSON.data.location.name;
      this.characterInfo.image = this.objJSON.data.image;
    },
    charNum: function() {
      this.charNum = this.nextPage;
      console.log("making a call");
      this.APIcall();
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



