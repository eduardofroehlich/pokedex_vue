<template>
    <div class="detail">
        <div v-if="show" class="detail-view">
            <div v-if="pokemon" class="image">
                <img :src="imageUrl + '/' + pokemon.id + '.png'" width="500" height="500">
            </div>
            <div v-if="pokemon" class="data">
                <h2>{{ pokemon.name }}</h2>
                <div class="property">
                    <div class="left">Base Experience</div>
                    <div class="right">{{  pokemon.base_experience }}</div>
                </div>
                <div class="property">
                    <div class="left">Height</div>
                    <div class="right">{{  pokemon.height / 10 }}</div>
                </div>
                <div class="property">
                    <div class="left">Weight</div>
                    <div class="right">{{  pokemon.weight / 10}}</div>
                </div>
                <h3>Pokemon Types</h3>
                <div class="types">
                     <div class="type" v-for="(value, index) in pokemon.types" :hey="'value' + index">
                        {{ value.type.name }}
                    </div>
                </div>
                <h3>Abilities</h3>
                <div class="abilities">
                     <div class="ability" v-for="(value, index) in pokemon.abilities" :hey="'value' + index">
                        {{ value.ability.name }}
                    </div>
                </div>
                <h3>Stats</h3>
                <div class="stats">
                    <div v-for="(value, index) in pokemon.stats" :hey="'value' + index">
                        <div class="stat">
                            {{ value.stat.name + ':'}}
                            <div class="base_stat">
                                {{ value.base_stat}}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <h2 v-else>The pokemons was not found</h2>
            <button class="close" @click="closeDetail">close</button>
        </div>
    </div>
</template>

<script lang="ts">
  export default {
    props: [
      'pokemonUrl',
      'imageUrl'
    ],
    data: () => {
      return {
        show: false,
        pokemon: {}
      }
    },
    methods: {
      fetchData() {
        let req = new Request(this.pokemonUrl);
        fetch(req)
          .then((resp) => {
            if(resp.status === 200)
              return resp.json();
          })
          .then((data) => {
            this.pokemon = data;
            this.show = true;
          })
          .catch((error) => {
            console.log(error);
          })
      },
      closeDetail() {
        this.$emit('closeDetail');
      }
    },
    created() {
      this.fetchData();
    }
  }
</script>

<style lang="scss" scoped>
    .detail {
        @apply flex justify-center items-start;
        @apply fixed top-0 left-0 pt-20 pb-2.5 px-2.5;
        @apply w-full h-full bg-black/70;
        .detail-view {
            @apply flex justify-center items-center flex-col;
            @apply relative w-full max-w-[512px] pt-12 bg-white rounded-2xl shadow-lg;
            .image {
                @apply flex justify-center items-center;
                @apply absolute -top-[75px] w-32 h-32 bg-zinc-600 rounded-full;
                @apply overflow-hidden shadow-lg;
            }

            h2 {
                @apply text-2xl font-bold capitalize;
            }

            .data {
                @apply flex justify-start items-center flex-col;
                @apply w-full mb-2.5;

                .property {
                    @apply w-11/12 max-w-[400px] border-b border-b-slate-300 mb-2.5;

                    .left { @apply float-left }
                    .right { @apply float-right }
                }

                h3 {
                    @apply w-11/12 max-w-[400px] text-lg font-bold mt-2.5;
                    @apply border-b border-b-slate-300;
                }

                .types, .abilities, .stats {
                    @apply flex justify-start flex-wrap;
                    @apply w-11/12 max-w-[400px];

                    .type, .ability, .stat {
                        @apply flex mx-2.5 my-2.5 px-2.5 text-white rounded-2xl;
                        @apply  text-base capitalize break-keep;
                    }
                    .type { @apply bg-teal-700; }
                    .ability { @apply bg-red-500; }
                    .stat { @apply bg-emerald-500; }

                    .base_stat {
                        @apply ml-1;
                    }
                }
            }
            .close {
                @apply rounded-md bg-zinc-600 text-white;
                @apply px-4 py-1.5 mb-1.5;
            }
        }
    }

</style>