<template>
  <div id="container">
    <button @click.prevent="redirectHome">Home</button>
    <button @click.prevent="redirectSearch">Search</button>
    <a @click.prevent="redirectHome">
      <img id="rnm" src="@/assets/rnm.png" />
    </a>
    <a>
      <div class="search">
        <div>
          <input placeholder=" search..." type="text" v-model="searchTerm" @keydown.enter="submit" />
        </div>
      </div>
    </a>
    <div id="text" v-if="this.$route.name != 'Search'">
      <p>Find stats about your favourite Rick and Morty characters!</p>
      <p>The homepage has random characters but feel free to search for your favourites by</p>
      <p>name by using the search bar in the top right. Go to the search page via the</p>
      <p>button below to perform a more in depth search where you can specify the species, status and</p>
      <p>gender when searching.</p>
      <br />
      <p>Click reroll at the bottom to generate nine new characters!</p>
    </div>
  </div>
</template>

<script>
import cells from "@/components/cells";
import profile from "@/components/profile";
import EventBus from "@/eventbus/eventBus";

export default {
  components: {
    "app-cells": cells,
    "app-profile": profile
  },
  data() {
    return {
      searchTerm: null,
      stringified: 0,
      randomNumbers: []
    };
  },
  methods: {
    APIcall() {
      axios
        .get("https://rickandmortyapi.com/api/character")
        .then(response => (this.info = response));
    },

    submit() {
      var payLoad = this.searchTerm;
      if (this.$route.name != "Search") {
        this.$router.replace("/search");
      } else {
      }
      EventBus.$emit("submitted", payLoad);
      this.searchTerm = "";
      setTimeout(function() {
        EventBus.$emit("submitted", payLoad);
      }, 100);
    },
    redirectHome() {
      this.$router.replace("/");
    },
    redirectSearch() {
      this.$router.replace("/search");
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
    },
    stringified: function() {
      console.log("stringified has changed");
      this.characterInfo.id = this.objJSON.data.info.id;
      this.characterInfo.name = this.objJSON.data.info.name;
      this.characterInfo.status = this.objJSON.data.info.status;
      this.characterInfo.location = this.objJSON.data.info.location.name;
      this.characterInfo.image = this.objJSON.data.info.image;
    }
  }
};
</script>

<style scoped>
.search {
  float: right;
  margin-right: 20px;
  margin-top: 25px;
}

.search > h3 {
  font-weight: normal;
}

.search > h1,
.search > h3 {
  color: white;
  margin-bottom: 15px;
  text-shadow: 0 1px #0091c2;
}

.search > div {
  display: inline-block;
  position: relative;
}

.search > div:after {
  content: "";
  background: white;
  width: 4px;
  height: 20px;
  position: absolute;
  top: 40px;
  right: 2px;
  transform: rotate(135deg);
  box-shadow: 1px 0 #0091c2;
}

.search > div > input {
  color: white;
  font-size: 16px;
  background: transparent;
  width: 25px;
  height: 25px;
  padding: 10px;
  border: solid 3px white;
  outline: none;
  border-radius: 35px;
  box-shadow: 0 1px #0091c2;
  transition: width 0.5s;
}

.search > div > input::placeholder {
  color: #efefef;
  opacity: 1;
}

.search > div > input::-ms-placeholder {
  color: #efefef;
}

.search > div > input::-ms-input-placeholder {
  color: #efefef;
}

.search > div > input:focus,
.search > div > input:valid {
  width: 250px;
}

#rnm {
  height: 200px;
  width: 500px;
  margin-left: 300px;
  border: none;
}

#container {
  display: table;
  width: 100%;
}

#text {
  text-align: center;
}

button {
  float: left;
  margin-left: 20px;
}
</style>