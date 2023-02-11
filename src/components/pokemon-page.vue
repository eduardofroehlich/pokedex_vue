<template>
  <div class="container">
    <h1>Pokedex</h1>
    <PokemonSearch :apiUrl="apiUrl" @setPokemonUrl="setPokemonUrl" />
    <PokemonList :imageUrl="imagesUrl" :apiUrl="apiUrl" @setPokemonUrl="setPokemonUrl" />
    <PokemonDetail v-if="showDetail" :pokemonUrl="pokemonUrl" :imageUrl="imagesUrl" @closeDetail="closeDetail" />
  </div>
</template>

<script lang="ts">
import PokemonList from "./pokemon-list.vue";
import PokemonDetail from "./pokemon-detail.vue";
import PokemonSearch from "./pokemon-search.vue";

export default {
  data: () => {
    return {
      imagesUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
      apiUrl: "https://pokeapi.co/api/v2/pokemon",
      pokemonUrl: '',
      showDetail: false
    };
  },
  components: {
    PokemonList,
    PokemonDetail,
    PokemonSearch,
  },
  methods: {
    setPokemonUrl(url: string) {
      this.pokemonUrl = url;
      this.showDetail = true;
    },
    closeDetail() {
      this.pokemonUrl = '';
      this.showDetail = false;
    }
  }
};
</script>

<style>
.container {
  @apply flex justify-center items-center flex-col;
  @apply p-2.5;
  @apply font-vt323;
  background: radial-gradient(#156f99, #0A2E50);

}
h1 {
  @apply text-white text-5xl;
}
</style>
