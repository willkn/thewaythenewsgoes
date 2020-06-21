<template>
<div id="container">
  <img id="rnm" src="@/assets/rnm.png"> 
  <br>
  <input type="search" placeholder="search" v-model="searchTerm" @keydown.enter="search">
  <p>{{ searchTerm }}</p>
  <div id="charContainer">
    <app-charcard v-if="notSearching":id="randomNumbers[0]"></app-charcard>
    <app-charcard v-if="notSearching":id="randomNumbers[1]"></app-charcard>
    <app-charcard v-if="notSearching":id="randomNumbers[2]"></app-charcard>
    <app-charcard v-if="notSearching":id="randomNumbers[3]"></app-charcard>
    <app-charcard v-if="notSearching":id="randomNumbers[4]"></app-charcard>
    <app-charcard v-if="notSearching":id="randomNumbers[5]"></app-charcard>
    <app-charcard v-if="notSearching":id="randomNumbers[6]"></app-charcard>
    <app-charcard v-if="notSearching":id="randomNumbers[7]"></app-charcard>
    <app-charcard v-if="notSearching":id="randomNumbers[8]"></app-charcard>
    <app-charcard v-if="!notSearching"></app-charcard>
  </div>
</div>
</template>

<script>
import charCard from "@/components/charCard";
import axios from "axios";

export default {
  components: {
    "app-charcard": charCard
  },
  data() {
    return {
      allChars: null,
      objJSON: null,
      info: null,
      randomNumbers: [null, null, null, null, null, null, null, null, null],
      searchTerm: null,
      notSearching: true
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
    search() {
      this.notSearching = false;
      axios
        .get('https://rickandmortyapi.com/api/character/?name=rick&status=alive')
        .then(response => (this.info = response))
        console.log(this.info);
    },
    // I realise this could be done with iteration, I'm just lazy
    numberGen() {
      this.randomNumbers[0] = Math.floor(Math.random() * 592 + 1);
      this.randomNumbers[1] = Math.floor(Math.random() * 592 + 1);
      this.randomNumbers[2] = Math.floor(Math.random() * 592 + 1);
      this.randomNumbers[3] = Math.floor(Math.random() * 592 + 1);
      this.randomNumbers[4] = Math.floor(Math.random() * 592 + 1);
      this.randomNumbers[5] = Math.floor(Math.random() * 592 + 1);
      this.randomNumbers[6] = Math.floor(Math.random() * 592 + 1);
      this.randomNumbers[7] = Math.floor(Math.random() * 592 + 1);
      this.randomNumbers[8] = Math.floor(Math.random() * 592 + 1);
    }
  },
  watch: {
    // When a response is recieved from the API, parse the response and log it in
    info: function() {
      // Stringifies the JSON then constructs an object
      console.log('got here')
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

#rnm {
    height: 200px;
    width: 500px;
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


fieldset {
    width: 50%;
}
</style>