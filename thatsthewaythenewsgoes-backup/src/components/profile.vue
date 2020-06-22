<template>
  <div class="container" @submitted.prevent="byName">
    <div class="cell" v-if="!notSearching">
      <img id="pfp" :src="this.characterInfo.image" />
      <h3>ID: {{ characterInfo.id }}</h3>
      <h3>Name: {{ characterInfo.name }}</h3>
      <h3>Status: {{ characterInfo.status }}</h3>
      <h3>Location: {{ characterInfo.location }}</h3>
    </div>
    <div id="searchForm">
      <h3>SEARCH</h3>
      <p>Name</p>
      <input placeholder="Ants in my eyes Johnson" id="name" type="text" v-model="urlElements.name" />
      <p>Species</p>
      <input placeholder="Human" id="species" type="text" v-model="urlElements.species" />
      <p>Gender</p>
      <input placeholder="Male" id="gender" type="text" v-model="urlElements.gender" />
      <p>Status</p>
      <input placeholder="Alive" id="status" type="text" v-model="urlElements.status" />
      <br />
      <button @click.prevent="urlBuilder">Search</button>
      <br />
      <!-- <input type="radio"> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EventBus from "@/eventbus/eventBus";

export default {
  props: ["notSearching", "submitted"],
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
      error: null,
      searchType: "name",
      searched: this.$props.notSearching,
      constructedURL: null,
      urlElements: {
        name: "",
        species: "",
        gender: "",
        status: "",
        count: 0
      }
    };
  },
  created() {
    EventBus.$on("submitted", payLoad => {
      this.byName(payLoad);
    });
  },
  methods: {
    // Calls the API and passes the data to the vue instance.
    changePage() {
      this.charNum = this.nextPage;
      nextPage = "";
    },
    byName(payLoad) {
      this.searched = true;
      axios
        .get("https://rickandmortyapi.com/api/character/?name=" + payLoad)
        .then(response => (this.info = response));
    },
    // urlBuilder() {
    //   var int = 0;
    //   var i = 0;
    //   var baseurl = "https://rickandmortyapi.com/api/character/?";
    //   // Check this object to see whether to add the element to the URL.
    //   var elements = {
    //     name: this.urlElements.name,
    //     species: this.urlElements.species,
    //     gender: this.urlElements.gender
    //   };
    //   // May need changing if expanded. Move the count from urlElements if expanding.
    //   // Could just check the amount of true values in the elements object
    //   // for (i=0;i>3;i++) {
    //   //   if (this.urlElements[i] != null) {
    //   //     this.urlElements.count += 1;
    //   //   } else {
    //   //   }
    //   // }
    //   // Make most of these loops into switches.
    //   if (this.urlElements.name != null) {
    //     this.urlElements.count += 1;
    //   } else if(this.urlElements.species != null) {
    //     this.urlElements.count += 1;
    //   } else if(this.urlElements.gender != null) {
    //     this.urlElements.count += 1;
    //   }
    //   console.log(this.urlElements.count);
    //   // Depending on the amount of elements in the element list, the array is built accordingly
    //   if (this.urlElements.count == 1) {
    //   } else if (this.urlElements == 2) {
    //     var array = ["&"];
    //   } else if (this.urlElements.count == 3) {
    //     var array = ["&", "&"];
    //   } else {
    //   }

    //   if (elements.name == true) {
    //     var baseurl = baseurl + "name" + this.urlElements.name + array[int];
    //     int++;
    //   } else if (elements.species == true) {
    //     var baseurl = baseurl + "species" + this.urlElements.species + array[int];
    //     int++
    //   } else if (elements.gender == true) {
    //     var baseurl = baseurl + this.urlElements.gender + array[int];
    //   }
    // }
    urlBuilder() {
      var baseurl = "https://rickandmortyapi.com/api/character/?";
      var paramString = new URLSearchParams({
        name: this.urlElements.name,
        species: this.urlElements.species,
        gender: this.urlElements.gender,
        status: this.urlElements.status
      });
      this.constructedURL = baseurl + paramString;
      axios.get(this.constructedURL).then(response => (this.info = response));
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
    // Data has been made into an object, now it needs to be saved to the vue instance
    stringified: function() {
      // If a request with a custom url is made, data is passed along with it, unlike a normal url.
      // This means that the process of parsing the JSON is different.
      this.characterInfo.id = this.objJSON.data.results[0].id;
      this.characterInfo.name = this.objJSON.data.results[0].id;
      this.characterInfo.status = this.objJSON.data.results[0].status;
      this.characterInfo.location = this.objJSON.data.results[0].location.name;
      this.characterInfo.image = this.objJSON.data.results[0].image;
    },
    // charNum: function() {
    //   this.charNum = this.nextPage;
    //   this.APIcall();
    // },
    submitted: function() {
      console.log("submitted");
    }
  }
};
</script>

<style scoped>
.cell {
  border: solid #078691 10px;
  margin: auto;
  width: 400px;
  padding: 20px;
  margin-top: 20px;
  background-color: #0d616f;
  height: 600px;
}

#pfp {
  height: 300px;
  width: 300px;
}

div {
  text-align: center;
}

#searchForm {
  padding: 5px;
}
#searchForm input {
  margin-top: 3px;
  width: 20%;
  text-align: center;
  padding: 7px;
  border: 3px solid #078691;
  border-radius: 5px;
}

label {
  float: left;
  margin-left: 800px;
}
</style>
