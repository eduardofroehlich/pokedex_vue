<template>
    <div class="searchbar">
        <form @submit.prevent="setPokemonUrl">
            <input type="text" v-model="searchValue">
        </form>
        <img src="../assets/search.svg" @click="setPokemonUrl">
    </div>
</template>

<script lang="ts">

export default{
    props: [
        'apiUrl'
    ],
    data: () => {
        return {
            searchValue: '',
        }
    },
    methods: {
        setPokemonUrl() {
            if (this.searchValue !== '') this.$emit('setPokemonUrl', this.apiUrl + '/' + this.searchValue)
        }
    }
}
</script>

<style lang="scss" scoped>
    .searchbar {
        @apply relative w-full max-w-[510px];
        @apply pb-5;

        input {
            @apply border-none outline-none rounded-md w-full;
            @apply py-2 pr-10 pl-2.5;
            @apply text-base shadow-lg;
        }
        img {
            @apply absolute top-2 right-2.5 w-6 h-6 cursor-pointer;
        }
    }
</style>