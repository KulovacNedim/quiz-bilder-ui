<template>
  <div
    class="bg-white overflow-hidden rounded-lg max-w-6xl my-10 mx-auto flex shadow-md relative"
  >
    <transition name="signup">
      <div v-if="mode === 'signup'" class="w-1/3 bg-red-500 p-8">
        <div class="flex flex-col justify-start items-center h-full">
          <p class="text-white text-xl mb-7">One of us?</p>
          <p class="text-white">
            If you already have an account, just sign in. We've missed you!
          </p>
          <button type="button" @click="switchAuthMode" class="mt-auto mb-5">
            {{ switchModeButtonCaption }}
          </button>
        </div>
      </div>
    </transition>
    <div class="flex flex-col flex-1 justify-center items-center h-full p-8">
      <p class="text-2xl mb-5 font-bold">{{ formHeadCaption }}</p>
      <form @submit.prevent="submitFom" class="w-10/12">
        <div class="flex flex-col justify-center items-center">
          <span
            v-if="mode === 'signup'"
            class="w-full flex flex-col justify-center items-center"
          >
            <label for="name" class="text-gray-400 mt-7">Name</label>
            <input
              type="text"
              id="name"
              v-model.trim="name"
              class="border-gray-200 border-b-2 border-t-0 w-10/12 h-12 text-center font-medium outline-none"
            />
          </span>
          <label for="email" class="text-gray-400 mt-7">E-mail</label>
          <input
            type="email"
            id="email"
            v-model.trim="email"
            class="border-gray-200 border-b-2 border-t-0 w-10/12 h-12 text-center font-medium outline-none"
          />
          <label for="password" class="text-gray-400 mt-7 text-center"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model.trim="password"
            class="border-gray-200 border-b-2 border-t-0 w-10/12 h-12 text-center font-medium outline-none"
          />

          <p class="text-gray-400 mt-10 text-center">Forgot password?</p>
          <!-- <p v-if="!formIsValid">
            Please enter a valid and password (must be at least
            {{ passwordLength }} characters long)
          </p> -->
          <button
            class="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded-full m-6 w-10/12 focus:outline-none"
          >
            {{ submitButtonCaption }}
          </button>
        </div>
      </form>
    </div>
    <transition name="login">
      <div class="w-1/3 bg-red-500 p-8" v-if="mode === 'login'">
        <div class="flex flex-col justify-start items-center h-full">
          <p class="text-white text-xl mb-7">New here?</p>
          <p class="text-white">
            Sign up and start practicing or take an quiz!
          </p>
          <button
            type="button"
            @click="switchAuthMode"
            class="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded-full m-6 w-10/12 focus:outline-none mt-auto mb-5"
          >
            {{ switchModeButtonCaption }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordLength: 8,
      formIsValid: true,
      mode: "login",
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "SIGN IN";
      } else {
        return "SIGN UP";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "SIGN UP INSTEAD";
      } else {
        return "SIGN IN INSTEAD";
      }
    },
    formHeadCaption() {
      return this.mode === "login" ? "Welcome back" : "Time to feel like home";
    },
  },
  methods: {
    submitFom() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < this.passwordLength
      ) {
        this.formIsValid = false;
        return;
      }

      // send http req
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
  },
};
</script>


<style scoped>
.signup-enter-from {
  opacity: 0;
  transform: translateX(400px);
}

.signup-leave-to {
  opacity: 0;
  transform: translateX(400px);
  position: absolute;
  height: 470px;
  display: flex;
  flex-direction: column;
}

.signup-enter-active {
  transition: all 0.3s ease-in-out;
}

.signup-leave-active {
  transition: all 0.3s ease-in-out;
}

.signup-enter-to,
.signup-leave-from {
  opacity: 1;
  transform: translateX(0);
}

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