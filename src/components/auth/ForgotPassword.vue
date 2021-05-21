<template>
  <div class="flex flex-col md:flex-row">
    <div
      class="flex flex-col flex-1 justify-center items-center h-full p-0 md:p-11"
    >
      <p class="text-2xl mb-5 font-bold text-center">
        Cannot remember your password?
      </p>
      <p class="text-base mb-5">Don't worry. Ask for new one:</p>
      <form @submit.prevent="submitFom" class="w-full md:w-10/12">
        <div class="flex flex-col justify-center items-center">
          <label for="email" class="text-gray-400 mt-7">E-mail</label>
          <input
            type="email"
            id="email"
            v-model.trim="email"
            class="border-gray-200 border-b-2 border-t-0 w-10/12 h-12 text-center font-medium outline-none"
          />

          <!-- <p v-if="!formIsValid">
            Please enter a valid and password (must be at least
            {{ passwordLength }} characters long)
          </p> -->
          <base-button mode="btn-outline">Submit</base-button>
        </div>
      </form>
    </div>
    <transition name="login">
      <div class="w-full md:w-1/3 bg-red-500 p-8" v-if="animate">
        <div class="flex flex-col justify-start items-center h-full">
          <p class="text-white text-xl md:text-2xl mb-7 text-center">
            You do remember your password?
          </p>
          <p class="text-white text-base md:text-xl px-3">
            Go back to sign in!
          </p>
          <div class="mt-auto">
            <router-link :to="{ name: 'signin' }">
              <base-button mode="btn-flat">Sign in</base-button>
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      animate: false,
    };
  },
  mounted() {
    this.animate = true;
  },
};
</script>

<style scoped>
.login-enter-from {
  opacity: 0;
  transform: translateX(-400px);
}

.login-leave-to {
  opacity: 0;
  transform: translateX(-400px);
  position: absolute;
  right: 0;
  height: 470px;
  display: flex;
  flex-direction: column;
}

.login-enter-active {
  transition: all 0.3s ease-in-out;
}

.login-leave-active {
  transition: all 0.3s ease-in-out;
}

.login-enter-to,
.login-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>