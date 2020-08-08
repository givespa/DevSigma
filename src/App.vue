<template>
<b-container>
  <div id="app">
    <img src="https://sigma-studios.s3-us-west-2.amazonaws.com/test/sigma-logo.png">
    <router-view/>
  </div>
</b-container>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@font-face {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  src: url('https://fonts.google.com/specimen/Roboto');
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  margin-top: 40px;
}
</style>
