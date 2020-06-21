<template> 
  <div id="app">
    <app-home></app-home>
    <router-view/>
  </div>
</template>

<script>
import home from '@/components/home'
import cells from '@/components/cells'

export default {
  name: 'App',
  components: {
    'app-home': home,
    'app-cells': cells
  },
  updated() {
    window.scrollTo(0, 0);
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: auto;
  background-color: #194b5d;
  font-family: 'Indie Flower', cursive;
  font-size: 20px;
  color: white;
  scroll-behavior: smooth;
  
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
  border-radius: 10px;
  width: 10%;
}

img {
  border: 5px solid #078691;
}

</style>
