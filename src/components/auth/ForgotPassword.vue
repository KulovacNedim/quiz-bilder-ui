<template>
  <p class="text-2xl mb-5 font-bold">Forgot password?</p>
  <form @submit.prevent="">
    <label for="email" class="text-gray-400 mt-7">E-mail</label>
    <input
      type="email"
      id="email"
      v-model.trim="email"
      class="border-gray-200 border-b-2 border-t-0 w-10/12 h-12 text-center font-medium outline-none"
    />
    <button>Submit</button>
  </form>
</template>