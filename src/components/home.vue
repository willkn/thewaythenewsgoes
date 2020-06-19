<template>
<div>
    <img id="rnm" src="@/assets/rnm.png">
  <div id="charContainer">
    <!-- <img id="logo" src="@/assets/rnmLogo.png"> -->
    <app-charcard :id="randomNumbers[0]"></app-charcard>
    <app-charcard :id="randomNumbers[1]"></app-charcard>
    <app-charcard :id="randomNumbers[2]"></app-charcard>
    <app-charcard :id="randomNumbers[3]"></app-charcard>
    <app-charcard :id="randomNumbers[4]"></app-charcard>
    <app-charcard :id="randomNumbers[5]"></app-charcard>
    <app-charcard :id="randomNumbers[6]"></app-charcard>
    <app-charcard :id="randomNumbers[7]"></app-charcard>
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
      randomNumbers: [null, null, null, null, null, null, null, null]
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
      this.randomNumbers[0] = Math.floor(Math.random() * 592 + 1);
      this.randomNumbers[1] = Math.floor(Math.random() * 592 + 1);
      this.randomNumbers[2] = Math.floor(Math.random() * 592 + 1);
      this.randomNumbers[3] = Math.floor(Math.random() * 592 + 1);
      this.randomNumbers[4] = Math.floor(Math.random() * 592 + 1);
      this.randomNumbers[5] = Math.floor(Math.random() * 592 + 1);
      this.randomNumbers[6] = Math.floor(Math.random() * 592 + 1);
      this.randomNumbers[7] = Math.floor(Math.random() * 592 + 1);

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
    }
  }
};
</script>

<style scoped>
/* .app-charcard {
  float: left;
} */
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
</style>