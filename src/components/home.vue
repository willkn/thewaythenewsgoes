<template>
  <div>
    <p>HOME</p>
    <!-- id is passed as a prop to the charcard -->
    <!-- Use templates to loop the app-charcard and pass it an id -->
    <!-- <p>obj: {{ objJSON }}</p> -->
    <app-charcard id="2"></app-charcard>
    <app-charcard id="43"></app-charcard>
    <!-- <template v-for="character in allChars">
        {{ objJSON }}

    </template> -->
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
      randomNum: Number
    };
  },

//   mounted() {
//     this.APIcall();
//   },
  methods: {
    APIcall() {
      axios
        .get("https://rickandmortyapi.com/api/character")
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
    }
  }
};
</script>

<style>
</style>