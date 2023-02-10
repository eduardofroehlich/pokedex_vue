<template>
  <div class="container">
    <h1>Pokedex</h1>
    <PokemonList :imageUrl="imagesUrl" :apiUrl="apiUrl" />
  </div>
</template>

<script lang="ts">
import PokemonList from "./pokemon-list.vue";

export default {
  data: () => {
    return {
      imagesUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
      apiUrl: "https://pokeapi.co/api/v2/pokemon",
    };
  },
  components: {
    PokemonList,
  },
};
</script>

<style>
h1 {
  @apply text-white text-5xl;
}
</style>
