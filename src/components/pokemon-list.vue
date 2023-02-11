<template>
  <div class="list">
    <article v-for="(pokemon, index) in pokemons" :key="'poke' + index" @click="setPokemonUrl(pokemon.url)">
      <img :src="imageUrl + pokemon.id + '.png'" />
      <h3>{{ pokemon.name }}</h3>
    </article>
    <div class="bg-white" ref="infinitescrolltrigger">
        <img src="../assets/spinner.svg" width="50" height="50" alt="">
    </div>

  </div>
</template>

<script lang="ts">

export default {
    props: ["imageUrl", "apiUrl"],
    data: () => {
        return {
            pokemons: [],
            nextUrl: "",
            currentUrl: "",
        };
    },
    methods: {
      fetchData() {
        let req = new Request(this.currentUrl);
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
      scrollTrigger() {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.intersectionRatio > 0 && this.nextUrl) {
              this.next();
            }
          });
        });
        observer.observe(this.$refs.infinitescrolltrigger);
      },
      next() {
          this.currentUrl = this.nextUrl;
          this.fetchData();
      },
      setPokemonUrl(url: string) {
        this.$emit('setPokemonUrl', url);
      }
    },
    created() {
        this.currentUrl = this.apiUrl;
        this.fetchData();
    },
    mounted() {
        this.scrollTrigger();
    },
};

</script>

<style lang="scss" scoped>
.list {
  @apply grid gap-2.5 grid-cols-auto;
  @apply w-full max-w-[510px];
}
article {
  @apply grid justify-center h-40 bg-white text-center capitalize;
  @apply rounded-md cursor-pointer;
  @apply shadow-lg;
}

h3 {
  @apply m-0;
}
</style>
