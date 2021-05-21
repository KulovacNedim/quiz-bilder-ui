<template>
  <div class="bg-gray-100 py-2 flex justify-between items-center">
    <base-button link to="/">BILD-IT logo</base-button>
    <div class="flex">
      <base-button
        mode="btn-outline"
        v-if="!isLoggedIn"
        link
        :to="{ name: 'signin' }"
        >AUTHENTICATE</base-button
      >
      <base-button v-else mode="btn-outline" @click="logout"
        >SIGNOUT</base-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: null,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isAuthenticated"];
    },
  },
};
</script>