<template>
  <div id="container">
    <br />
    <button @click.prevent="sortById">Sort by ID</button>
    <br />
    <button id="reroll" v-if="notSearching" @click.prevent="numberGen">Reroll</button>
    <div id="charContainer">
      <app-charcard v-if="notSearching" :id="randomNumbers[0]"></app-charcard>
      <app-charcard v-if="notSearching" :id="randomNumbers[1]"></app-charcard>
      <app-charcard v-if="notSearching" :id="randomNumbers[2]"></app-charcard>
      <app-charcard v-if="notSearching" :id="randomNumbers[3]"></app-charcard>
      <app-charcard v-if="notSearching" :id="randomNumbers[4]"></app-charcard>
      <app-charcard v-if="notSearching" :id="randomNumbers[5]"></app-charcard>
      <app-charcard v-if="notSearching" :id="randomNumbers[6]"></app-charcard>
      <app-charcard v-if="notSearching" :id="randomNumbers[7]"></app-charcard>
      <app-charcard v-if="notSearching" :id="randomNumbers[8]"></app-charcard>
      <app-profile
        v-if="!notSearching"
        :notSearching="notSearching"
        :searchTerm="searchTerm"
        :submitted="this.submitted"
      ></app-profile>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import charCard from "@/components/charCard";
import profile from "@/components/profile";
import search from "@/components/search";

export default {
  components: {
    "app-charcard": charCard,
    "app-search": search,
    "app-profile": profile
  },
  data() {
    return {
      allChars: null,
      objJSON: null,
      info: null,
      randomNumbers: [null, null, null, null, null, null, null, null, null],
      searchTerm: null,
      notSearching: true,
      searched: false,
      submitted: 0
    };
  },
  created() {
    this.numberGen();
  },

  methods: {
    APIcall() {
      axios
        .get("https://rickandmortyapi.com/api/character")
        .then(response => (this.info = response));
    },
    numberGen() {
      this.randomNumbers = [];
      this.randomNumbers[0] = Math.floor(Math.random() * 591 + 1);
      this.randomNumbers[1] = Math.floor(Math.random() * 591 + 1);
      this.randomNumbers[2] = Math.floor(Math.random() * 591 + 1);
      this.randomNumbers[3] = Math.floor(Math.random() * 591 + 1);
      this.randomNumbers[4] = Math.floor(Math.random() * 591 + 1);
      this.randomNumbers[5] = Math.floor(Math.random() * 591 + 1);
      this.randomNumbers[6] = Math.floor(Math.random() * 591 + 1);
      this.randomNumbers[7] = Math.floor(Math.random() * 591 + 1);
      this.randomNumbers[8] = Math.floor(Math.random() * 591 + 1);
    },
    submit() {
      // if (this.notSearching == true) {
      //   this.notSearching = false;
      //   this.submitted += 1;
      // } else {
      //   this.submitted += 1;
      // }
      this.$router.replace("/search");
    },
    sortById() {
      this.randomNumbers.sort((a, b) => a - b);
    }
  },
  watch: {
    // When a response is recieved from the API, parse the response and log it in
    info: function() {
      // Stringifies the JSON then constructs an object
      console.log("got here");
      var stringJSON = JSON.stringify(this.info);
      var stringJSON = JSON.parse(stringJSON);
      this.objJSON = stringJSON;
      // Easier than changing the boolean back to false.
      this.stringified += 1;
    },
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
div {
  text-align: center;
}

#logo {
  height: 200px;
  width: 300px;
}

#charContainer {
  padding-top: 10px;
}

#container {
  display: table;
  width: 100%;
}
input {
  width: 500px;
  text-align: center;
  margin-top: 10px;
}

* {
  padding: 0;
  margin: 0;
}

html,
body {
  width: 100%;
  height: 100%;
}

button {
  background-color: #0d616f; /* Green */
  border: 5px solid #078691;
  color: white;
  padding: 15px 32px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>