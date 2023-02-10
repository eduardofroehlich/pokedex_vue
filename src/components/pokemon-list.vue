<template>
  <div class="list">
    <article v-for="(pokemon, index) in pokemons" :key="'poke' + index">
      <img :src="imageUrl + pokemon.id + '.png'" width="96" height="96" />
      <h3>{{ pokemon.name }}</h3>
    </article>
  </div>
</template>

<script lang="ts">
export default {
  props: ["imageUrl", "apiUrl"],
  data: () => {
    return {
      pokemons: [],
      nextUrl: "",
    };
  },
  methods: {
    fetchData() {
      let req = new Request(this.apiUrl);
      fetch(req)
        .then((resp) => {
          if (resp.status === 200) return resp.json();
        })
        .then((data) => {
          this.nextUrl = data.next;
          data.results.forEach((pokemon: object) => {
            pokemon.id = pokemon.url
              .split("/")
              .filter(function (part: string) {
                return !!part;
              })
              .pop();
            this.pokemons.push(pokemon);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.fetchData();
  },
};

</script>

<style scoped>
.list {
  @apply grid gap-2.5;
  @apply w-full max-w-[510px];
}
article {
  @apply h-40 text-center capitalize;
  @apply rounded-md cursor-pointer;
  @apply shadow-md;
}

h3 {
  @apply m-0;
}
</style>
